const mongoose = require('mongoose');
const shortId = require('shortid');

//Award schema
const shortUrlSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true,
    },
    short: {
        type: String,
        required: true,
        default: shortId.generate
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }

});

//Award model
const Url = mongoose.model("Url", shortUrlSchema);

module.exports = Url;
