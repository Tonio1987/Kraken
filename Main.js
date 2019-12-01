// SET ENV VARIABLES
require('dotenv').config();

// NODE MODULE CALL
const schedule = require('node-schedule');
const moment = require('moment');

// API KRAKEN CALL
const API_AssetPairs = require('./api/kraken/API_AssetPairs');
const API_Balance = require('./api/kraken/API_Balance');
const API_Depth = require('./api/kraken/API_Depth');
const API_OHLC = require('./api/kraken/API_OHLC');
const API_Ticker = require('./api/kraken/API_Ticker');
const API_Time = require('./api/kraken/API_Time');
const API_TradeBalance = require('./api/kraken/API_TradeBalance');
const API_ClosedOrders = require('./api/kraken/API_ClosedOrders');
const API_OpenOrders = require('./api/kraken/API_OpenOrders');
const API_OpenPositions = require('./api/kraken/API_OpenPositions');
const API_TradesHistory = require('./api/kraken/API_TradesHistory');

// CONTROLLER CALL
const CTRL_LoadTicker = require('./controller/CTRL_Ticker');
const CTRL_TradeBalance = require('./controller/CTRL_TradeBalance');
const CTRL_Balance = require('./controller/CTRL_Balance');
const CTRL_Time = require('./controller/CTRL_Time');
const CTRL_TradessHistory = require('./controller/CTRL_TradesHistory');
const CTRL_ClosedOrders = require('./controller/CTRL_ClosedOrders');
const CTRL_OpenOrders = require('./controller/CTRL_OpenOrders');

console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - ### PROGRAM STARTED ###');

/*
#############################
         TEST ZONE
#############################
*/

/*
CTRL_Time.LoadTime();
CTRL_Balance.LoadBalance();
CTRL_LoadTicker.LoadTicker();
CTRL_TradeBalance.LoadTradeBalance();
CTRL_OpenOrders.LoadOpenOrders();
CTRL_ClosedOrders.LoadClosedOrders();
CTRL_TradessHistory.LoadTradesHistory();
*/


/*
#############################
        END TEST ZONE
#############################
*/

// NODE SERVER IS ALIVE - EVERY 15 SECONDS
let sch1 = schedule.scheduleJob('*/15 * * * * *', function(){
    console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - ### NODE SERVER IS ALIVE ###');
});

// KRAKEN SERVER IS ALIVE - EVERY 1 MINUTE
let sch2 = schedule.scheduleJob('*/1 * * * *', function(){
    console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - ### SCHEDULER ### - > Check Kraken Server Time');
//    CTRL_Time.LoadTime();
});

// CALL UPDATE TRADE BALANCE FROM KRAKEN API  - EVERY 5 MINUTES
let sch3 = schedule.scheduleJob('*/5 * * * *', function(){
    console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - ### SCHEDULER ### - > Load Trade Balance');
//    CTRL_TradeBalance.LoadTradeBalance();
});

// CALL UPDATE BALANCE FROM KRAKEN API - EVERY 1 HOUR
let sch4 = schedule.scheduleJob('* */1 * * *', function(){
    console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - ### SCHEDULER ### - > Load Balance');
//    CTRL_Balance.LoadBalance();
});

// CALL UPDATE TRADES HISTORY FROM KRAKEN API - EVERY 1 HOUR
let sch5 = schedule.scheduleJob('* */1 * * *', function(){
    console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - ### SCHEDULER ### - > Load Trades History');
//    CTRL_TradessHistory.LoadTradesHistory();
});

// CALL UPDATE CLOSED ORDERS FROM KRAKEN API - EVERY 1 HOUR
let sch6 = schedule.scheduleJob('* */1 * * *', function(){
    console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - ### SCHEDULER ### - > Load Closed Orders');
//    CTRL_ClosedOrders.LoadClosedOrders();
});

// CALL UPDATE OPEN ORDERS FROM KRAKEN API - EVERY 1 MINUTES
let sch7 = schedule.scheduleJob('*/1 * * * *', function(){
    console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - ### SCHEDULER ### - > Load Open Orders');
//    CTRL_OpenOrders.LoadOpenOrders();
});

// CALL UPDATE TICKER FROM KRAKEN API - EVERY 2 MINUTES
let sch8 = schedule.scheduleJob('*/2 * * * *', function(){
    console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - ### SCHEDULER ### - > Load new Ticker');
//    CTRL_LoadTicker.LoadTicker();
});

