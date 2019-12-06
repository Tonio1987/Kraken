const cron = require('node-cron');
const moment = require('moment');

// CONTROLLER CALL
const CTRL_LoadTicker = require('../controller/kraken_controller/CTRL_Ticker');
const CTRL_TradeBalance = require('../controller/kraken_controller/CTRL_TradeBalance');
const CTRL_Balance = require('../controller/kraken_controller/CTRL_Balance');
const CTRL_Time = require('../controller/kraken_controller/CTRL_Time');
const CTRL_TradesHistory = require('../controller/kraken_controller/CTRL_TradesHistory');
const CTRL_ClosedOrders = require('../controller/kraken_controller/CTRL_ClosedOrders');
const CTRL_OpenOrders = require('../controller/kraken_controller/CTRL_OpenOrders');
const CTRL_MMCalculation = require('../controller/algotirhm_controller/CTRL_MMCalculation');

// NODE SERVER IS ALIVE - EVERY 15 SECONDS
let task_ServerOk = cron.schedule('*/15 * * * * *', () =>  {
    console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - ### NODE SERVER IS ALIVE ###');
}, {
    scheduled: false
});

// KRAKEN SERVER IS ALIVE - EVERY 30 SECONDS
let task_KrakenServerOnline = cron.schedule('*/30 * * * * *', () =>  {
    console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - ### SCHEDULER ### - > Check Kraken Server Time');
    CTRL_Time.LoadTime();
}, {
    scheduled: false
});

// LOAD TICKER - EVERY 1 MINUTES
let task_LoadTicker = cron.schedule('0 */1 * * * *', () =>  {
    console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - ### SCHEDULER ### - > Load new Ticker');
    CTRL_LoadTicker.LoadTicker();
}, {
    scheduled: false
});

// CALCULATE MOVING AVERAGES - EVERY 1 MINUTES
let task_MMCalculation = cron.schedule('0 */1 * * * *', () =>  {
    console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - ### SCHEDULER ### - > Load new Ticker');
    CTRL_MMCalculation.CalculateMM();
}, {
    scheduled: false
});

// LOAD TRADE BALANCE - EVERY 5 MINUTES
let task_LoadTradeBalance = cron.schedule('0 */5 * * * *', () =>  {
    console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - ### SCHEDULER ### - > Load Trade Balance');
    CTRL_TradeBalance.LoadTradeBalance();
}, {
    scheduled: false
});

// LOAD BALANCE - EVERY 1 HOURS
let task_LoadBalance = cron.schedule('0 0 */1 * *', () =>  {
    console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - ### SCHEDULER ### - > Load Balance');
    CTRL_Balance.LoadBalance();
}, {
    scheduled: false
});


// LOAD TRADE HISTORY - EVERY 1 HOURS
let task_LoadTradeHistory = cron.schedule('0 0 */1 * * *', () =>  {
    console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - ### SCHEDULER ### - > Load Trades History');
    CTRL_TradesHistory.LoadTradesHistory();
}, {
    scheduled: false
});


// LOAD CLOSED ORDERS - EVERY 1 HOURS
let task_LoadClosedOrders = cron.schedule('0 0 */1 * * *', () =>  {
    console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - ### SCHEDULER ### - > Load Closed Orders');
    CTRL_ClosedOrders.LoadClosedOrders();
}, {
    scheduled: false
});


// LOAD OPEN ORDERS - EVERY 1 MINUTES
let task_LoadOpenOrders = cron.schedule('0 */1 * * * *', () =>  {
    console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - ### SCHEDULER ### - > Load Open Orders');
    CTRL_OpenOrders.LoadOpenOrders();
}, {
    scheduled: false
});


module.exports = {
    startSchedule: function () {
        /*
        task_ServerOk.start();
        task_KrakenServerOnline.start();
        task_LoadTicker.start();
        task_MMCalculation.start();
        task_LoadTradeBalance.start();
        task_LoadBalance.start();
        task_LoadTradeHistory.start();
        task_LoadClosedOrders.start();
        task_LoadOpenOrders.start();
        */
    }
};

