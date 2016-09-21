var express = require('express');
var router = express.Router();
var Client = require('node-rest-client').Client;
var client = new Client();

router.get('/', function(req, res) {

    client.get(req.getFullUrl('categories/'), function (categories) {
        client.get(req.getFullUrl('vendors/'), function (vendors) {

            var vendorArray = [];
            for (var i = 0; i < vendors.items.length; i++) {
                var picName = vendors.items[i].logotype;

                vendorArray[i] = {
                    name: vendors.items[i].name,
                    id: vendors.items[i]._id
                };
                if (picName !== undefined) {
                    var src = req.env.imUrl + picName[0] + '/' + picName[1] + '/' + picName[2] + '/' + picName;
                    vendorArray[i].src = src;
                }
            }

            res.render('index', {
                title: 'skukit HOME',
                categories: categories.items,
                vendors: vendorArray
            });
        });
    });
});

router.get('/locale', function (req, res) {
    req.session.lang = req.query.lang;
    res.redirect('back');
});


module.exports = router;
