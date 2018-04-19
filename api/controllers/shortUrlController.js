'use strict';
var mongoose = require('mongoose'),
    ShortUrl = mongoose.model('ShortUrl');

exports.createShortUrl = function(req, res) {
    var authHeader = req.get('authorization');
    if (authHeader !== undefined && authHeader === process.env.AUTH_TOKEN) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 6; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        var expireDate = new Date();
        req.body._id = text;
        //req.body.shortUrl = 'http://localhost:3000/' + text;
        req.body.shortUrl = process.env.SHORT_URL + text;
        req.body.expirationDate = expireDate.setDate(expireDate.getDate() + 30);
        var new_url = new ShortUrl(req.body);
        new_url.save(function(err, data) {
            if (err)
                res.send(err);
            res.send(data.shortUrl);
        });
    }

};

exports.redirectShortUrl = function(req, res) {
    ShortUrl.findById(req.params.shortUrlId, function(err, data) {
        if (err)
            res.send(err);
        res.redirect(301, data.longUrl);
    });
};
