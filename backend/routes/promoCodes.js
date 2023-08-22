const express = require("express");
const router = express.Router();

const PromoCode = require("../models/PromoCode");

router.get("/", (req, res) => {
    res.status(200).json([{"id":1,"code":"ana10","status":"nevazeci"},
                          {"id":2,"code":"ana20","status":"vazeci"}]);
    
});



module.exports = router;