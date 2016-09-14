var express = require('express');
var router = express.Router();
var Client = require('node-rest-client').Client;

var client = new Client();

// route middleware to validate :id
router.param('id', function (req, res, next, id) {
    client.get('http://api.skukit-st.com/v1/categories/' + id, function (data, response) {
        req.id = id;
        next();
    });
});


router.get('/:id', function (req, res) {

    client.get('http://api.skukit-st.com/v1/categories/' + req.id, function (category, response) {
        client.get('http://api.skukit-st.com/v1/products/?category_id=' + category._id, function (products, response) {


            var productArray = [];
            for (var i = 0; i < products.items.length; i++) {
                var picName = products.items[i].front_image.src;

                console.log(picName);
                productArray[i] = {
                    name: products.items[i].vendor + ' ' + products.items[i].model,
                    id: products.items[i]._id
                };


                if (picName !== undefined) {
                    var src = 'http://im.skukit-st.com/' + picName[0] + '/' + picName[1] + '/' + picName[2] + '/' + picName;
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