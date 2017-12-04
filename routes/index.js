var express = require('express');
var router = express.Router();
var os = require('os');

/* GET home page. */
router.get('/', function(req, res, next) {
  var hostname = os.hostname();
  res.render('index', {
    locals: {
      title: "Sample web site",
      host: hostname
    }
  });
});

module.exports = router;
