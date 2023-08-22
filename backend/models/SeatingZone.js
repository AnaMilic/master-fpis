const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SeatingZoneSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    seatNumber: {
        type: Number,
        required: true,
    },
    price: {
        type: String,
        required: false,
    } 
});

module.exports = SeatingZone = mongoose.model("seatingZones", SeatingZoneSchema);