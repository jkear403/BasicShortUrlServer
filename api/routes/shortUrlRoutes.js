'use strict';
module.exports = function(app) {
    var shortUrls = require('../controllers/shortUrlController');

    app.route('/shorturl')
        .post(shortUrls.createShortUrl);

    app.route('/:shortUrlId')
        .get(shortUrls.redirectShortUrl);
};