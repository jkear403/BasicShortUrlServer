'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShortUrlSchema = new Schema({
    _id: {
        type: String
    },
    shortUrl: {
        type: String
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    longUrl: {
        type: String
    },
    expirationDate: {
        type: Date
    }
});

module.exports = mongoose.model('ShortUrl', ShortUrlSchema);