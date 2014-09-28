var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  res.render('api');
});

router.get('/hello', function(req, res) {
  res.status(200).send({"hello":"world"});
});

module.exports = router;
