const express = require("express");
const router = express.Router();

const PromoCode = require("../models/PromoCode");

router.get("/", (req, res) => {
  PromoCode.find({})
    .then((promoCode) => res.status(200).json(promoCode))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
