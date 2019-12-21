// CALL TRADING ROBOT
var robot = require('./private/TraderRobot');

// CALL MODULES
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// CALL ROUTES
var indexRouter = require('./routes/index');

// CALL API REST ROUTES


// INIT APP
var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

module.exports = app;
