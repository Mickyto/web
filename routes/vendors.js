var express = require('express');
var router = express.Router();
var Client = require('node-rest-client').Client;

var client = new Client();

// route middleware to validate :id
router.param('id', function (req, res, next, id) {
    client.get('http://api.skukit-st.com/v1/vendors/' + id, function (data, response) {
        req.id = id;
        next();
    });
});


router.get('/:id', function (req, res) {

    client.get('http://api.skukit-st.com/v1/vendors/' + req.id, function (vendor, response) {
        res.render('vendor', {
            title: vendor.name,
            vendor: vendor
        });
    });
});

module.exports = router;


