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
app.use('/tradeBalance', tradeBalanceRouter);
var balanceRouter = require('./routes/rest_api/Balance');
app.use('/balance', balanceRouter);
var tradeBalancesRouter = require('./routes/rest_api/tradeBalances');
app.use('/tradeBalances', tradeBalancesRouter);

// INIT APP
module.exports = app;
