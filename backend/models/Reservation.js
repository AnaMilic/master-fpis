const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Customer = require("./Customer");
const SeatingZone = require("./SeatingZone");
const PromoCode = require("./PromoCode");

const ReservationSchema = new Schema({
  customerId: {
    type: Schema.Types.ObjectId,
    ref: Customer,
    required: true,
  },
  seatingZoneId: {
    type: Schema.Types.ObjectId,
    ref: SeatingZone,
  },
  numberTickets: {
    type: Number,
  },
  date: {
    type: Date,
  },
  amount: {
    type: Number,
    //seatingZone.price * numberTickets
  },
  promoCodeId: {
    type: Schema.Types.ObjectId,
    ref: PromoCode,
    required: false,
    default: null,
  },
});

module.exports = Reservation = mongoose.model(
  "reservations",
  ReservationSchema
);
