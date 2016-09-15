var express = require('express');
var router = express.Router();
var Client = require('node-rest-client').Client;
var client = new Client();

router.get('/', function(req, res) {
    client.get('http://api.skukit-st.com/v1/categories/', function (categories) {
        client.get('http://api.skukit-st.com/v1/vendors/', function (vendors) {
            var vendorArray = [];
            for (var i = 0; i < vendors.items.length; i++) {
                var picName = vendors.items[i].logotype;
                vendorArray[i] = {
                    name: vendors.items[i].name,
                    id: vendors.items[i]._id
                };
                if (picName !== undefined) {
                    var src = 'http://im.skukit-st.com/' + picName[0] + '/' + picName[1] + '/' + picName[2] + '/' + picName;
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

router.get('/catalog/', function(req, res) {
    client.get('http://api.skukit-st.com/v1/categories/', function (categories) {
        var categoryArray = [];
        for (var i = 0; i < categories.items.length; i++) {
            var picName = categories.items[i].ico;
            categoryArray[i] = {
                name: categories.items[i].name,
                id: categories.items[i]._id
            };
            if (picName !== undefined) {
                var src = 'http://im.skukit-st.com/' + picName[0] + '/' + picName[1] + '/' + picName[2] + '/' + picName;
                categoryArray[i].src = src;
            }
        }
        res.render('catalog', {
            title: 'catalog',
            categories: categoryArray
        });
    });
});




module.exports = router;
