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
var marketRouter = require('./routes/market');
var analysesRouter = require('./routes/analyse');
var settingsRouter = require('./routes/settings');

app.use('/', indexRouter);
app.use('/market', marketRouter);
app.use('/analyse', analysesRouter);
app.use('/settings', settingsRouter);

// CALL API REST ROUTES
var tradeBalanceRouter = require('./routes/rest_api/TradeBalance');
var balanceRouter = require('./routes/rest_api/Balance');
var openOrdersRouter = require('./routes/rest_api/OpenOrders');
var last5ClosedOrdersRouter = require('./routes/rest_api/Last5ClosedOrders');
var cronTasksRouter = require('./routes/rest_api/CronTasks');
var changeCronTaskStatusRouter = require('./routes/rest_api/ChangeCronTaskStatus');
var triggersMMEvolRouter = require('./routes/rest_api/TriggersMMEvol');
var changeMMEvolTriggerStatusRouter = require('./routes/rest_api/ChangeMMEvolTriggerStatus');
var triggersKeltnerRouter = require('./routes/rest_api/TriggersKeltner');
var changeKeltnerTriggerStatusRouter = require('./routes/rest_api/ChangeKeltnerTriggerStatus');
var triggerAutonomousModeRouter = require('./routes/rest_api/TriggerAutonomousMode');
var changeAutonomousModeTriggerStatusRouter = require('./routes/rest_api/ChangeAutonomousModeTriggerStatus');
var marketInfoRouter = require('./routes/rest_api/MarketInfo');
var tickerDataRouter = require('./routes/rest_api/TickerData');
var marketTradesDataRouter = require('./routes/rest_api/MarketTradesData');
var pairsListRouter = require('./routes/rest_api/PairsList');
var MMPairDataRouter = require('./routes/rest_api/MMPairData');
var MMEvolPairDataRouter = require('./routes/rest_api/MMEvolPairData');

app.use('/tradeBalance', tradeBalanceRouter);
app.use('/balance', balanceRouter);
app.use('/openOrders', openOrdersRouter);
app.use('/last5ClosedOrders', last5ClosedOrdersRouter);
app.use('/cronTasks', cronTasksRouter);
app.use('/changeCronTaskStatus', changeCronTaskStatusRouter);
app.use('/mmEvolTriggers', triggersMMEvolRouter);
app.use('/changeMMEvolTriggerStatus', changeMMEvolTriggerStatusRouter);
app.use('/keltnerTriggers', triggersKeltnerRouter);
app.use('/changeKeltnerTriggersStatus', changeKeltnerTriggerStatusRouter);
app.use('/autonomousModeTrigger', triggerAutonomousModeRouter);
app.use('/changeAutonomousModeTriggerStatus', changeAutonomousModeTriggerStatusRouter);
app.use('/marketInfo', marketInfoRouter);
app.use('/tickerData', tickerDataRouter);
app.use('/marketTradesData', marketTradesDataRouter);
app.use('/pairsList', pairsListRouter);
app.use('/MMPairData', MMPairDataRouter);
app.use('/MMEvolPairData', MMEvolPairDataRouter);

// INIT APP
module.exports = app;
