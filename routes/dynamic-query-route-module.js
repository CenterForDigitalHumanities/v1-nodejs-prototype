var express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
var router = express.Router();

const doGet = async () => {
    const queryObj = {"hello": "node"};
    const ask = await fetch('http://tinydev.rerum.io/app/query', {
      method: 'post',
      body: JSON.stringify(queryObj),
      headers: {'Content-Type': 'application/json;charset=utf8'}
    }).then(resp=>resp.json());
    return ask;
}

router.get('/', function(req, res, next) {
  res.send("Go to /send to do a test query");
});

router.get('/send', async function(req, res, next) {
  try {
        const rerumResponse = await doGet();
        res.render("dynamicQuery", {"data":JSON.stringify(rerumResponse)});
        //res.json(rerumResponse)
    } catch (err) {
        res.render("dynamicQuery", {"data":"Could not perform fetch"});
    }
});

module.exports = router;