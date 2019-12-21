var express = require('express');
var router = express.Router();
var path = require('path');

/* index of my site */
router.get('/', function(req, res, next) {
  res.sendFile(path.resolve('views/test.html'));
});

module.exports = router;
