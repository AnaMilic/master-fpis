const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Customer = require("./Customer");
const SeatingZone = require("./SeatingZone");

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
});

module.exports = Reservation = mongoose.model(
  "reservations",
  ReservationSchema
);
