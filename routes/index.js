var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  res.render('index', { title: 'Hey', message: 'Hello there!' });
});

module.exports = router;
