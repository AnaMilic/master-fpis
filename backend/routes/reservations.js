const express = require("express");
const router = express.Router();

const Reservation = require("../models/Reservation");
const Customer = require("../models/Customer");
const Token = require("../models/Token");
const PromoCode = require("../models/PromoCode");

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
    let customer = await Customer.findOne({ email: eventBody.customer.email });

    if (customer == null) {
      const newCustomer = new Customer(eventBody.customer);
      customer = await newCustomer.save();
    }

    const newReservation = new Reservation(eventBody.reservation);
    newReservation.customerId = customer._id;
    newReservation.seatingZoneId = eventBody.reservation.seatingZone;
    const reservation = await newReservation.save();

    const newToken = new Token({
      token: new Date().getTime().toString(),
      reservationId: reservation._id,
    });
    const token = await newToken.save();

    const newPromoCode = new PromoCode({
      code: reservation.customerId.toString(16),
      customerId: reservation.customerId,
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
  console.log(customer);
  if (customer == null) {
    return res.status(400).send("No reservation with that email");
  }
  let dbToken = await Token.findOne({ token });

  const reservation = await Reservation.findOneAndRemove({
    _id: dbToken.reservationId,
    customerId: customer._id,
  });
  if (!reservation) {
    return res.status(400).json("That reservation does not exist");
  }
  dbToken.status = "inactive";
  await dbToken.save();
  res.status(200).send(reservation);
});

router.patch("/", (req, res) => {
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
});

module.exports = router;
