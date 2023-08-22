const express = require("express");
const router = express.Router();

const Token = require("../models/Token");

router.get("/", (req, res) => {
    res.status(200).json([{"id":1,"code":"f4qw8g6wgq6","status":"aktivan"},
                          {"id":2,"code":"wg4646wg46g","status":"pasivan"}]);
});

module.exports = router;