var express = require('express');
var router = express.Router();
var os = require('os');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    locals: {
      title: 'Express',
      host: os.hostname()
    }
  });
});

module.exports = router;
