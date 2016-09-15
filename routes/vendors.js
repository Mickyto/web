var express = require('express');
var router = express.Router();
var Client = require('node-rest-client').Client;
var client = new Client();

// route middleware to validate :id
router.param('id', function (req, res, next, id) {
    client.get(req.env.url + 'vendors/' + id, function () {
        req.id = id;
        next();
    });
});


router.get('/:id', function (req, res) {

    client.get(req.env.url + 'vendors/' + req.id, function (vendor) {
        res.render('vendor', {
            title: vendor.name,
            vendor: vendor
        });
    });
});

module.exports = router;


