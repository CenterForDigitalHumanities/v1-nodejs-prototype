var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  console.log(__dirname);
  res.sendFile("query1.html", {"root":"."});
});

module.exports = router;