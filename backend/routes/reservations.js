const express = require("express");
const router = express.Router();

const Reservation = require("../models/Reservation");
const Customer = require("../models/Customer");
const Token = require("../models/Token");
const PromoCode = require("../models/PromoCode");
const SeatingZone = require("../models/SeatingZone");

router.get("/", (req, res) => {
  Reservation.find({})
    .then((reservation) => res.status(200).json(reservation))
    .catch((err) => res.status(400).json(err));
});

router.get("/getByEmailAndToken", async (req, res) => {
  const email = req.query.email;
  const token = req.query.token;

  if (!email || !token) {
    return res.status(400).json({ error: "Email & token are mandatory" });
  }
  const customer = await Customer.findOne({ email });

  if (!customer) {
    return res
      .status(400)
      .json({ error: "Customer with that email does not exists" });
  }

  const dbToken = await Token.findOne({ token });

  if (!dbToken) {
    return res.status(400).json({ error: "Token does not exist" });
  }

  Reservation.find({
    _id: dbToken.reservationId,
    customerId: customer._id,
  })
    .populate("seatingZoneId")
    .populate("customerId")
    .exec()
    .then((reservation) => {
      if (!reservation) {
        return res.status(400).json("That reservation does not exist");
      }
      res.status(200).json(reservation);
    })
    .catch((err) => res.status(400).json(err));
});

router.post("/", async (req, res) => {
  const eventBody = req.body;
  try {
    // dohvatamo sve rezervacije da bi smo videli da li ima slobodnih mesta
    const oldResetvations = await Reservation.find({
      date: eventBody.reservation.date,
      seatingZoneId: eventBody.reservation.seatingZone,
    });

    const seatingZone = await SeatingZone.findOne({
      _id: eventBody.reservation.seatingZone,
    });

    let numberOfOldTickets = 0;

    oldResetvations.forEach((reservation) => {
      numberOfOldTickets += reservation.numberTickets;
    });

    if (
      numberOfOldTickets + parseInt(eventBody.reservation.numberTickets, 10) >=
      seatingZone.seatNumber
    ) {
      return res
        .status(400)
        .json("There are not enough seats left for that date and seating zone");
    }

    let customer = await Customer.findOne({ email: eventBody.customer.email });
    let oldPromoCode = null;

    if (eventBody.reservation.code != "") {
      oldPromoCode = await PromoCode.findOne({
        code: eventBody.reservation.code,
      });
      if (oldPromoCode == null) {
        return res.status(400).json("That promo code does not exist.");
      }
      const promoCodeReservation = await Reservation.findOne({
        _id: oldPromoCode.reservationId,
      });

      if (oldPromoCode.status !== "unused") {
        return res.status(400).json("That promo code is no longer valid");
      }

      if (
        customer &&
        String(promoCodeReservation.customerId) === String(customer._id)
      ) {
        return res
          .status(400)
          .json(
            "You can not use your promo code for yourself. Please use another one"
          );
      }
    }

    // Ne postoji koristnik, pravi se novi, prvi put rezervise
    if (customer == null) {
      const newCustomer = new Customer(eventBody.customer);
      customer = await newCustomer.save();
    }

    const newReservation = new Reservation(eventBody.reservation);
    newReservation.customerId = customer._id;
    newReservation.seatingZoneId = eventBody.reservation.seatingZone;
    if (oldPromoCode) {
      newReservation.promoCodeId = oldPromoCode._id;
    }
    console.log(new Date());

    let totalPrice = 0;
    for (let i = 1; i <= eventBody.reservation.numberTickets; i++) {
      if (i % 5 == 0) {
        totalPrice += seatingZone.price * 0.5;
      } else {
        totalPrice += seatingZone.price;
      }
    }

    if (new Date() < new Date("2023.09.30.")) {
      totalPrice = totalPrice * 0.9;
    }

    if (eventBody.reservation.code != "") {
      totalPrice = totalPrice * 0.95;
    }

    newReservation.amount = totalPrice;

    const reservation = await newReservation.save();

    await PromoCode.findOneAndUpdate(
      {
        code: eventBody.reservation.code,
      },
      {
        status: "used",
      }
    );

    const tokenValue = new Date().getTime().toString();

    const newToken = new Token({
      token: tokenValue,
      reservationId: reservation._id,
    });
    const token = await newToken.save();

    const newPromoCode = new PromoCode({
      code: parseInt(tokenValue, 10).toString(16),
      reservationId: reservation._id,
    });
    const code = await newPromoCode.save();
    console.log(code);

    return res.status(200).json({
      customer,
      reservation,
      token,
      code,
    });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/", async (req, res) => {
  const { email, token } = req.query;

  if (!email || !token) {
    return res.status(400).json({ error: "Email & token are mandatory" });
  }
  let customer = await Customer.findOne({ email });

  if (customer == null) {
    return res.status(400).send("No reservation with that email");
  }

  const dbToken = await Token.findOne({ token });

  if (dbToken == null || dbToken.status == "inactive") {
    return res.status(400).send("Token does not exist");
  }

  const reservation = await Reservation.findOne({
    _id: dbToken.reservationId,
    customerId: customer._id,
  });

  if (!reservation) {
    return res.status(400).json("That reservation does not exist");
  }

  const promoCode = await PromoCode.findOne({
    reservationId: String(dbToken.reservationId),
  });

  const reservationThatUsedPromoCode = await Reservation.findOne({
    promoCodeId: promoCode._id,
  });

  if (reservationThatUsedPromoCode) {
    await Reservation.findOneAndUpdate(
      {
        _id: reservationThatUsedPromoCode._id,
      },
      {
        amount: (reservationThatUsedPromoCode.amount * 100) / 95,
      }
    );
  }

  await Reservation.findOneAndRemove({
    _id: dbToken.reservationId,
  });

  await PromoCode.findOneAndUpdate(
    {
      reservationId: dbToken.reservationId,
    },
    {
      status: "deleted",
    }
  );

  dbToken.status = "inactive";
  await dbToken.save();

  res.status(200).send(reservation);
});

router.patch("/", async (req, res) => {
  console.log(req.body.reservation);
  try {
    const oldResetvations = await Reservation.find({
      date: req.body.reservation.date,
      seatingZoneId: req.body.reservation.seatingZoneId._id,
    });

    const seatingZone = await SeatingZone.findOne({
      _id: req.body.reservation.seatingZoneId._id,
    });

    let numberOfOldTickets = 0;

    oldResetvations.forEach((reservation) => {
      numberOfOldTickets += reservation.numberTickets;
    });

    if (
      numberOfOldTickets + parseInt(req.body.reservation.numberTickets, 10) >=
      seatingZone.seatNumber
    ) {
      return res
        .status(400)
        .json("There are not enough seats left for that date and seating zone");
    }
    Reservation.findOneAndUpdate(
      {
        _id: req.body.reservation,
      },
      {
        $set: req.body.reservation,
      },
      {
        new: true,
      }
    )
      .populate("seatingZoneId")
      .exec()
      .then((reservation) => {
        res.status(200).send(reservation);
      })
      .catch((error) => res.status(500).send(error));
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
