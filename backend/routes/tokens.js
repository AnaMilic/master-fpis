const express = require("express");
const router = express.Router();

const Token = require("../models/Token");

router.get("/", (req, res) => {
  Token.find({})
    .then((token) => res.status(200).json(token))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
