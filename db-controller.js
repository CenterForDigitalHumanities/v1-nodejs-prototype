#!/usr/bin/env node

// Import contact model
Model = require('./db-object-model.js');


// Handle index actions
exports.index = function (req, res) {
    console.log("index controller")
    res.json({
        status: "connected",
        message: "Not sure what to do"
    });
};


// Handle view contact info
exports.findByProp = function (req, res) {
    //let prop = req.readPropFromBody()
    let prop = {"@id":"http://devstore.rerum.io/v1/id/11111"}
    console.log("view controller")
    Model.findOne(prop, function (err, obj) {
        if (err){
            console.log("Model.findOne did not work as expected")
            console.error(err)
            res.send(err);
        }
        else{
            console.log("View found object");
            console.log(obj)
            res.json(obj);
        }
    });
};

// Handle view contact info
exports.findById = function (req, res) {
    let id = "5b2c0d5de4b0fc5d4aeb709f" //bot!
    Model.findById(id, function (err, obj) {
        if (err){
            console.error("")
            res.send(err);
        }
        else{
            console.log("View found object");
            console.log(obj)
            res.json(obj);
        }
    });
};

/*
// Handle create contact actions
exports.new = function (req, res) {
    var contact = new Contact();
    contact.name = req.body.name ? req.body.name : contact.name;
    contact.gender = req.body.gender;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
// save the contact and check for errors
    contact.save(function (err) {
        // if (err)
        //     res.json(err);
res.json({
            message: 'New contact created!',
            data: contact
        });
    });
};
*/

/*
// Handle update contact info
exports.update = function (req, res) {
Contact.findById(req.params.contact_id, function (err, contact) {
        if (err)
            res.send(err);
contact.name = req.body.name ? req.body.name : contact.name;
        contact.gender = req.body.gender;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
// save the contact and check for errors
        contact.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Contact Info updated',
                data: contact
            });
        });
    });
};
*/
/*
// Handle delete contact
exports.delete = function (req, res) {
    Contact.remove({
        _id: req.params.contact_id
    }, function (err, contact) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'Contact deleted'
        });
    });
};
*/