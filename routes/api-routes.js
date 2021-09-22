#!/usr/bin/env node
let router = require('express').Router();
// Import Body parser !! Replaced by express
//let bodyParser = require('body-parser');

// Connect to Mongoose and set connection variable
// Deprecated: mongoose.connect('mongodb://localhost/resthub');

var controller = require('../db-controller.js');

// Set default API response
router.get('/', function (req, res) {
    res.json({
        message: 'Welcome to v1 in nodeJS!'
    });
});

/*
router.get('/get1', async function (req, res) {
    const id = "http://devstore.rerum.io/v1/id/11111"
    const found = await coll.findOne({"@id":id}).then(res => res.json())
    res.send(found);
});


router.get('/get2', async function (req, res) {
    const id = "http://devstore.rerum.io/v1/id/11111"
    coll.findOne({"@id":id}, function(err, result) {
        if (err) throw err;
        res.send(found);
    });
});
*/

// API routes

// api/simple to just return some JSON, no DB interactions
router.route('/simple')
    .get(controller.index)

// api/simple/id to fire a request for http://devstore.rerum.io/v1/id/11111 from annotationStoreDev on img-01
router.route('/simple/:id')
    .get(controller.findById)

// api/simple/query to fire a request for http://devstore.rerum.io/v1/id/11111 from annotationStoreDev on img-01
router.route('/simple/:qry')
    .get(controller.findByProp)

// api/simple/create to make a simple object.  Doesn't pass anything in body right now.
router.route("/simple/:create")
    .get(controller.create)
    .post(controller.save)
    
// Export API routes
module.exports = router;
