const express = require("express");
const router = express.Router();

const Customer = require("../models/Customer");

router.get("/", (req, res) => {
  Customer.find({})
    .then((customer) => res.status(200).json(customer))
    .catch((err) => res.status(400).json(err));
});

router.post("/", (req, res) => {
  const customer = req.body;
  const { email } = customer;

  Customer.findOne({ email }).then((dbCustomer) => {
    if (dbCustomer) {
      return res
        .status(400)
        .json({ error: "Customer with that email already exists" });
    }
    const newCustomer = new Customer({ ...customer });
    newCustomer
      .save()
      .then((cust) => res.status(200).send(cust))
      .catch((error) => res.status(500).send(error));
  });
});

router.delete("/", (req, res) => {
  const { customer } = req.body;

  Customer.findOneAndRemove({
    _id: customer._id,
  })
    .then((customer) => {
      res.status(200).send(customer);
    })
    .catch((error) => res.status(500).send(error));
});

module.exports = router;
