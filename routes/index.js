var express = require('express');
var os = require('os');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var hostname = os.hostname();
  res.render('index', {
    title: "Sample web site",
    host: hostname
  });
});

module.exports = router;
