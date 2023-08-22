const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
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

module.exports = Token = mongoose.model("tokens", TokenSchema);