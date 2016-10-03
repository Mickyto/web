var express = require('express');
var router = express.Router();
var Client = require('node-rest-client').Client;
var client = new Client();

// route middleware to validate :id
router.param('id', function (req, res, next, id) {

    client.get(req.getFullUrl('categories/' + id), function (data, response) {

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

    client.get(req.getFullUrl('categories/' + req.id), function (category) {
        client.get(req.getFullUrl('products/', { category_id: category._id }), function (products) {

            var productArray = [];
            for (var i = 0; i < products.items.length; i++) {
                var picName = products.items[i].front_image.src;
                productArray[i] = {
                    name: products.items[i].vendor + ' ' + products.items[i].model,
                    id: products.items[i]._id
                };
                if (picName !== undefined) {
                    var src = req.env.imUrl + picName[0] + '/' + picName[1] + '/' + picName[2] + '/' + picName;
                    productArray[i].src = src;
                }
            }

            res.render('category', {
                title: category.name,
                category: category,
                products: productArray
            });
        });
    });
});

module.exports = router;