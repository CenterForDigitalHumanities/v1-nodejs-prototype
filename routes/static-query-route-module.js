/* a/url/path that services a static HTML file */

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  console.log(__dirname);
  res.sendFile("query1.html", {"root":"../public"});
});

module.exports = router;