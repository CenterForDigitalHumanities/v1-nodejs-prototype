#!/usr/bin/env node
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config()

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
//var staticQueryRouter = require('./routes/static-query-route-module'); //Serve /public/query1.html
//var dynamicQueryRouter = require('./routes/dynamic-query-route-module'); //Perform /query in router and serve data to a view
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Middleware to use
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

//Publicly available scripts, CSS, and HTML pages.
app.use(express.static(path.join(__dirname, 'public')));

//Assign routes to the app.  This is processing URL patterns and pointing them to servlet logic
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

//Connect to a mongodb.
async function mongoConnection(){
  console.log("Awaiting mongo connection...")
  try {
      await mongoose.connect(process.env.ATLAS_CONNECTION_STRING, { useNewUrlParser: true});
      console.log("...returning mongoose connection");
      return mongoose.connection;
  } 
  catch (err) {
    console.log('mongoose.connect error in app initializer: ');
    return err;
  } 
}

module.exports = app;
