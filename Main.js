// SET ENV VARIABLES
require('dotenv').config();

// NODE MODULE CALL
var schedule = require('node-schedule');
var moment = require('moment');

// API KRAKEN CALL
var API_AssetPairs = require('./api/kraken/API_AssetPairs');
var API_Balance = require('./api/kraken/API_Balance');
var API_Depth = require('./api/kraken/API_Depth');
var API_OHLC = require('./api/kraken/API_OHLC');
var API_Ticker = require('./api/kraken/API_Ticker');
var API_Time = require('./api/kraken/API_Time');
var API_TradeBalance = require('./api/kraken/API_TradeBalance');
var API_ClosedOrders = require('./api/kraken/API_ClosedOrders');
var API_OpenOrders = require('./api/kraken/API_OpenOrders');
var API_OpenPositions = require('./api/kraken/API_OpenPositions');

// CONTROLLER CALL
var CTRL_LoadTicker = require('./controller/CTRL_LoadTicker');
var CTRL_TradeBalance = require('./controller/CTRL_TradeBalance');
var CTRL_Balance = require('./controller/CTRL_Balance');
var CTRL_Time = require('./controller/CTRL_Time');

/*
#############################
         TEST ZONE
#############################
*/

API_OpenOrders.kraken_OpenOrders();
/*
CTRL_Time.LoadTime();
CTRL_Balance.LoadBalance();
CTRL_LoadTicker.LoadTicker();
CTRL_TradeBalance.LoadTradeBalance();

*/

//API_Ticker.kraken_Ticker('XXBTZEUR.d');
/*
#############################
        END TEST ZONE
#############################
*/

console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - ### PROGRAM STARTED ###');

// NODE SERVER IS ALIVE - EVERY 15 SECONDS
var sch1 = schedule.scheduleJob('*/15 * * * * *', function(){
    console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - ### NODE SERVER IS ALIVE ###');
});

// KRAKEN SERVER IS ALIVE - EVERY 1 MINUTE
var sch2 = schedule.scheduleJob('*/1 * * * *', function(){
    console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - ### SCHEDULER ### - > Check Kraken Server Time');
//    CTRL_Time.LoadTime();
});

// CALL UPDATE TRADE BALANCE FROM KRAKEN API  - EVERY 5 MINUTES
var sch3 = schedule.scheduleJob('*/5 * * * *', function(){
    console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - ### SCHEDULER ### - > Load Trade Balance');
//    CTRL_TradeBalance.LoadTradeBalance();
});

// CALL UPDATE BALANCE FROM KRAKEN API - EVERY 1 HOUR
var sch4 = schedule.scheduleJob('* */1 * * *', function(){
    console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - ### SCHEDULER ### - > Load new Ticker');
//    CTRL_Balance.LoadBalance();
});

// CALL UPDATE TICKER FROM KRAKEN API - EVERY 2 MINUTES
var sch5 = schedule.scheduleJob('*/2 * * * *', function(){
    console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - ### SCHEDULER ### - > Load new Ticker');
//    CTRL_LoadTicker.LoadTicker();
});

