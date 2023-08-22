const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: false,
    },
    address1: {
        type: String,
        required: true,
    },
    address2: {
        type: String,
        required: false,
    },
    postNumber: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    emailConfirm: {
        type: String,
        required: true,
    }

});

module.exports = Customer = mongoose.model("customers", CustomerSchema);