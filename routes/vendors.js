var express = require('express');
var router = express.Router();
var Client = require('node-rest-client').Client;

var client = new Client();

// route middleware to validate :id
router.param('id', function (req, res, next, id) {

    client.get(req.getFullUrl('vendors/' + id), function (data) {
        if (data.error) {
            return next(data.error);
        }
        else {
            req.id = id;
            next();
        }

    });
});


router.get('/:id', function (req, res) {

    client.get(req.getFullUrl('vendors/' + req.id), function (vendor) {

        res.render('vendor', {
            title: vendor.name,
            vendor: vendor
        });
    });
});

module.exports = router;
