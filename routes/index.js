var express = require('express');
var router = express.Router();
var Client = require('node-rest-client').Client;

var client = new Client();

router.get('/', function(req, res) {

    client.get('http://api.skukit-st.com/v1/categories/', function (data, response) {
        res.render('index', {
            title: 'skukit HOME',
            categories: data.items
        });
    });
});

module.exports = router;
