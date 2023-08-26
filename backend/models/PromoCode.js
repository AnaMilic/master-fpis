const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Customer = require("./Customer");

const PromoCodeSchema = new Schema({
  customerId: {
    type: Schema.Types.ObjectId,
    ref: Customer,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "unused",
  },
});

module.exports = PromoCode = mongoose.model("promoCodes", PromoCodeSchema);
