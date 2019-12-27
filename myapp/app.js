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
var settingsRouter = require('./routes/settings');

app.use('/', indexRouter);
app.use('/settings', settingsRouter);

// CALL API REST ROUTES
var tradeBalanceRouter = require('./routes/rest_api/tradeBalance');
var balanceRouter = require('./routes/rest_api/Balance');
var openOrdersRouter = require('./routes/rest_api/OpenOrders');
var last5ClosedOrdersRouter = require('./routes/rest_api/Last5ClosedOrders');
var cronTasksRouter = require('./routes/rest_api/CronTasks');
var changeCronTaskStatusRouter = require('./routes/rest_api/ChangeCronTaskStatus');
var triggersMMEvolRouter = require('./routes/rest_api/TriggersMMEvol');
var changeTriggerStatusRouter = require('./routes/rest_api/ChangeTriggerStatus');

app.use('/tradeBalance', tradeBalanceRouter);
app.use('/balance', balanceRouter);
app.use('/openOrders', openOrdersRouter);
app.use('/last5ClosedOrders', last5ClosedOrdersRouter);
app.use('/cronTasks', cronTasksRouter);
app.use('/changeCronTaskStatus', changeCronTaskStatusRouter);
app.use('/triggers', triggersMMEvolRouter);
app.use('/changeTriggerStatus', changeTriggerStatusRouter);

// INIT APP
module.exports = app;
