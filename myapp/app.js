// CONFIGURE ENV
require('dotenv').config();

// CALL TRADING ROBOT
var robot = require('./private/TraderRobot');

// CALL MODULES
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// INIT EXPRESS APP
var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

// CALL ROUTES
var indexRouter = require('./routes/index');
app.use('/', indexRouter);

// CALL API REST ROUTES
var tradeBalanceRouter = require('./routes/rest_api/tradeBalance');
var balanceRouter = require('./routes/rest_api/Balance');
var openOrdersRouter = require('./routes/rest_api/OpenOrders');

app.use('/tradeBalance', tradeBalanceRouter);
app.use('/balance', balanceRouter);
app.use('/openOrders', openOrdersRouter);

// INIT APP
module.exports = app;
