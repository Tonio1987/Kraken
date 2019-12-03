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
const CTRL_AddOrder = require('./controller/CTRL_AddOrder');

console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - ### PROGRAM STARTED ###');

/*
#############################
         TEST ZONE
#############################
*/
CTRL_AddOrder.addOrder();
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


