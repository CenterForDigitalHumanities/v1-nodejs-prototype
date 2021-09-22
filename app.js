#!/usr/bin/env node
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var logger = require('morgan');
let mongoose = require('mongoose');

console.log("initializer trying to connect to mongo...")
var db = mongoConnection()
.then(conn => {
  console.log("... initializer connection can be seen below")
  console.log(conn)
  return conn
})

console.log("on line passed setting db")

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api-routes.js');
//var staticQueryRouter = require('./routes/static-query-route-module');
//var dynamicQueryRouter = require('./routes/dynamic-query-route-module');
var app = express();

/*
// Added check for DB connection
if(!db){
    console.log("Error connecting db in app initializer")
}
else{
    console.log("Db connected successfully in app initializer, see some info below")
    console.log(db)
    console.log(db.databaseName)
    //console.log(db.listCollections())
}
*/
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/static-query', staticQueryRouter);
//app.use('/dynamic-query', dynamicQueryRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

async function mongoConnection(){
  console.log("Awaiting mongo connection...")
  try {
      await mongoose.connect('mongodb+srv://rerumBot:f%40kePassword@cluster0.qytdr.mongodb.net/annotationStore?retryWrites=true&w=majority', { useNewUrlParser: true});
      //await mongoose.connect('mongodb://rerum-dev:69Trombones@f-vl-cdh-img-01:27017/annotationStoreDev?w=majority&authMechanism=SCRAM-SHA-256', { useNewUrlParser: true});
      console.log("...returning mongoose connection");
      return mongoose.connection;

      /*
      const { MongoClient } = require('mongodb');
      const uri = "mongodb+srv://rerumBot:<password>@cluster0.qytdr.mongodb.net/annotationStore?retryWrites=true&w=majority";
      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      client.connect(err => {
        const collection = client.db("test").collection("devices");
        // perform actions on the collection object
        client.close();
      });
      */
  } 
  catch (err) {
    console.log('mongoose.connect error in app initializer: ');
    return err;
  } 
}

module.exports = app;
