const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConcertSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: false,
    },
    date: [{
        type: String
    }],
    info: {
        type: String,
        required: false,
    }
});

module.exports = Concert = mongoose.model("concerts", ConcertSchema);