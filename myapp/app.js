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
// HOME
var tradeBalanceRouter = require('./routes/rest_api/home/TradeBalance');
var balanceRouter = require('./routes/rest_api/home/Balance');
var openOrdersRouter = require('./routes/rest_api/home/OpenOrders');
var last5ClosedOrdersRouter = require('./routes/rest_api/home/Last5ClosedOrders');

app.use('/home_tradeBalance', tradeBalanceRouter);
app.use('/home_balance', balanceRouter);
app.use('/home_openOrders', openOrdersRouter);
app.use('/home_last5ClosedOrders', last5ClosedOrdersRouter);

// MARKET
var marketInfoRouter = require('./routes/rest_api/market/MarketInfo');

app.use('/market_marketInfo', marketInfoRouter);

// ANALYSE
var pairsListRouter = require('./routes/rest_api/analyse/PairsList');
var MMPairDataRouter = require('./routes/rest_api/analyse/MMPairData');
var MMEvolPairDataRouter = require('./routes/rest_api/analyse/MMEvolPairData');
var MMComparePairDataRouter = require('./routes/rest_api/analyse/MMComparePairData');
var MMIndicatorsPairDataRouter = require('./routes/rest_api/analyse/MMIndicatorsPairData');

app.use('/analyse_pairsList', pairsListRouter);
app.use('/analyse_MMPairData', MMPairDataRouter);
app.use('/analyse_MMEvolPairData', MMEvolPairDataRouter);
app.use('/analyse_MMComparePairData', MMComparePairDataRouter);
app.use('/analyse_MMIndicatorsPairData', MMIndicatorsPairDataRouter);


// SETTINGS
var cronTasksRouter = require('./routes/rest_api/settings/CronTasks');
var changeCronTaskStatusRouter = require('./routes/rest_api/settings/ChangeCronTaskStatus');
var triggersMMEvolRouter = require('./routes/rest_api/settings/TriggersMMEvol');
var changeMMEvolTriggerStatusRouter = require('./routes/rest_api/settings/ChangeMMEvolTriggerStatus');
var triggersKeltnerRouter = require('./routes/rest_api/settings/TriggersKeltner');
var changeKeltnerTriggerStatusRouter = require('./routes/rest_api/settings/ChangeKeltnerTriggerStatus');
var triggerAutonomousModeRouter = require('./routes/rest_api/settings/TriggerAutonomousMode');
var changeAutonomousModeTriggerStatusRouter = require('./routes/rest_api/settings/ChangeAutonomousModeTriggerStatus');

app.use('/settings_cronTasks', cronTasksRouter);
app.use('/settings_changeCronTaskStatus', changeCronTaskStatusRouter);
app.use('/settings_mmEvolTriggers', triggersMMEvolRouter);
app.use('/settings_changeMMEvolTriggerStatus', changeMMEvolTriggerStatusRouter);
app.use('/settings_keltnerTriggers', triggersKeltnerRouter);
app.use('/settings_changeKeltnerTriggersStatus', changeKeltnerTriggerStatusRouter);
app.use('/settings_autonomousModeTrigger', triggerAutonomousModeRouter);
app.use('/settings_changeAutonomousModeTriggerStatus', changeAutonomousModeTriggerStatusRouter);

// INIT APP
module.exports = app;
