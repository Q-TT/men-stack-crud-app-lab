////////////////////////
// Setup - Import deps
////////////////////////
const mongoose = require("mongoose");

const ShirtSchema = new mongoose.Schema({
    type: String,
    color: String,
    brand: String,
    price: Number,
    website: String,
    wantedToBuy: Boolean,
    reason: String,
})


///////////////////////
// Exports
///////////////////////
const Shirt = mongoose.model('Shirt', ShirtSchema)
module.exports = Shirt