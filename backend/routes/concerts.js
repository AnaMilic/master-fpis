const express = require("express");
const router = express.Router();

const Concert = require("../models/Concert");

router.get("/", (req, res) => {
    // res.status(200).json([1,'world tour','beograd','arena','','wfqgqw']);
    Concert.find({})
    .then((concert) => res.status(200).json(concert))
    .catch((err) => res.status(400).json(err));
});

router.post("/", (req, res) => {
    const concert=req.body.concert;
    const newConcert = new Concert(concert);
    newConcert.save().then(() => res.status(200).send(newConcert))
                     .catch((error) => res.status(400).send(error))
});

module.exports = router;