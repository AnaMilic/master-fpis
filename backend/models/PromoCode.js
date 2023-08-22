const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PromoCodeSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    }
});

module.exports = PromoCode = mongoose.model("promoCodes", PromoCodeSchema);