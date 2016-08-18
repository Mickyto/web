var express = require('express');
var router = express.Router();
var http = require('http');

router.get('/', function(req, res, next) {

  http.get('http://api.skukit-dev.com/v1/categories/', function (response) {
    var buffer = "";

    response.on("data", function (chunk) {
      buffer += chunk;
    });
    console.log(response);

    response.on("end", function (err) {
      var data = JSON.parse(buffer);
      res.render('index', {
        title: 'Express',
        categories: data.items
      });
     });
  });
});

module.exports = router;
