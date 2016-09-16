var express = require('express');
var router = express.Router();
var Client = require('node-rest-client').Client;
var client = new Client();

router.get('/', function(req, res) {

    client.get(req.getFullUrl('categories/'), function (categories) {

        var categoryArray = [];
        for (var i = 0; i < categories.items.length; i++) {
            var picName = categories.items[i].ico;
            categoryArray[i] = {
                name: categories.items[i].name,
                id: categories.items[i]._id
            };
            if (picName !== undefined) {
                var src = req.env.imUrl + picName[0] + '/' + picName[1] + '/' + picName[2] + '/' + picName;
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

