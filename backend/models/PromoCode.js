const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PromoCodeSchema = new Schema({
  code: {
    type: String,
    required: true,
  },
  status: {
    type: String, // used, unused, deleted
    required: true,
    default: "unused",
  },
  reservationId: {
    type: String,
    required: true,
  },
});

module.exports = PromoCode = mongoose.model("promoCodes", PromoCodeSchema);
