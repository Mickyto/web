var express = require('express');
var router = express.Router();
var Client = require('node-rest-client').Client;

var client = new Client();

// route middleware to validate :id
router.param('id', function (req, res, next, id) {
    client.get('http://api.skukit-st.com/v1/products/' + id, function (data, response) {
        req.id = id;
        next();
    });
});

router.get('/:id', function (req, res) {

    client.get('http://api.skukit-st.com/v1/products/' + req.id, function (product, response) {
        client.get('http://api.skukit-st.com/v1/categories/' + product.category_id, function (category, response) {

            var imageArray = [];
            for (var i = 0; i < product.images.length; i++) {
                var picName = product.images[i].src;
                if (picName !== undefined) {
                    imageArray[i] = {
                        src: 'http://im.skukit-st.com/' + picName[0] + '/' + picName[1] + '/' + picName[2] + '/' + picName
                    }
                }
            }

            res.render('product', {
                title: product.vendor + ' ' + product.model,
                product: product,
                images: imageArray,
                category: category.name
            });
        });
    });
});


module.exports = router;



