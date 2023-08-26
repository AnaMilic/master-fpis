const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Reservation = require("./Reservation");

const TokenSchema = new Schema({
  reservationId: {
    type: Schema.Types.ObjectId,
    ref: Reservation,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "active",
  },
});

module.exports = Token = mongoose.model("tokens", TokenSchema);
