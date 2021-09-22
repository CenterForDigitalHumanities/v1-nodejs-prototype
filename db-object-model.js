#!/usr/bin/env node
var mongoose = require('mongoose');
// Setup schema
const schema = new mongoose.Schema({ "_id": mongoose.ObjectId, "@id":String }, {"collection":"alpha"});
const Model = module.exports = mongoose.model('simple', schema);

module.exports.get = function (callback, limit) {
    console.log("get : db-object-model.js");
    Model.find(callback).limit(limit);
}