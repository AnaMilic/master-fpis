const express = require("express");
const router = express.Router();

const SeatingZone = require("../models/SeatingZone");

router.get("/", (req, res) => {
  SeatingZone.find({})
    .then((seatingZone) => res.status(200).json(seatingZone))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
