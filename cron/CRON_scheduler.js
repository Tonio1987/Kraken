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

// INIT TASKS ATTRIBUTES
let task_ServerOk = null;
let task_KrakenServerOnline = null;
let task_LoadTicker = null;
let task_MMCalculation = null;
let task_LoadTradeBalance = null;
let task_LoadBalance = null;
let task_LoadTradeHistory = null;
let task_LoadClosedOrders = null;
let task_LoadOpenOrders = null;

// NODE SERVER IS ALIVE - EVERY 15 SECONDS
function init_task_ServerOk(cron_expression){
    task_ServerOk = cron.schedule(cron_expression, () =>  {
        console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - ### NODE SERVER IS ALIVE ###');
    }, {
        scheduled: false
    });
}

// KRAKEN SERVER IS ALIVE - EVERY 30 SECONDS
function init_task_KrakenServerOnline(cron_expression){
    task_KrakenServerOnline = cron.schedule(cron_expression, () =>  {
        console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - ### SCHEDULER ### - > Check Kraken Server Time');
        CTRL_Time.LoadTime();
    }, {
        scheduled: false
    });
}

// LOAD TICKER - EVERY 1 MINUTES
function init_task_LoadTicker(cron_expression){
    task_LoadTicker = cron.schedule(cron_expression, () =>  {
        console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - ### SCHEDULER ### - > Load new Ticker');
        CTRL_LoadTicker.LoadTicker();
    }, {
        scheduled: false
    });
}

// CALCULATE MOVING AVERAGES - EVERY 1 MINUTES
function init_task_MMCalculation(cron_expression){
    task_MMCalculation = cron.schedule(cron_expression, () =>  {
        console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - ### SCHEDULER ### - > Load new Ticker');
        CTRL_MMCalculation.CalculateMM();
    }, {
        scheduled: false
    });
}

// LOAD TRADE BALANCE - EVERY 5 MINUTES
function init_task_LoadTradeBalance(cron_expression){
    task_LoadTradeBalance = cron.schedule(cron_expression, () =>  {
        console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - ### SCHEDULER ### - > Load Trade Balance');
        CTRL_TradeBalance.LoadTradeBalance();
    }, {
        scheduled: false
    });
}

// LOAD BALANCE - EVERY 1 HOURS
function init_task_LoadBalance(cron_expression){
    task_LoadBalance = cron.schedule(cron_expression, () =>  {
        console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - ### SCHEDULER ### - > Load Balance');
        CTRL_Balance.LoadBalance();
    }, {
        scheduled: false
    });
}

// LOAD TRADE HISTORY - EVERY 1 HOURS
function init_task_LoadTradeHistory(cron_expression){
    task_LoadTradeHistory = cron.schedule(cron_expression, () =>  {
        console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - ### SCHEDULER ### - > Load Trades History');
        CTRL_TradesHistory.LoadTradesHistory();
    }, {
        scheduled: false
    });
}


// LOAD CLOSED ORDERS - EVERY 1 HOURS
function init_task_LoadClosedOrders(cron_expression){
    task_LoadClosedOrders = cron.schedule(cron_expression, () =>  {
        console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - ### SCHEDULER ### - > Load Closed Orders');
        CTRL_ClosedOrders.LoadClosedOrders();
    }, {
        scheduled: false
    });
}

// LOAD OPEN ORDERS - EVERY 1 MINUTES
function init_task_LoadOpenOrders(cron_expression){
    task_LoadOpenOrders = cron.schedule(cron_expression, () =>  {
        console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - ### SCHEDULER ### - > Load Open Orders');
        CTRL_OpenOrders.LoadOpenOrders();
    }, {
        scheduled: false
    });
}

function start_task_ServerOk(active){
    task_ServerOk.start();
}
function stop_task_ServerOk(active){
    task_ServerOk.stop();
}

module.exports = {
   initTasksScheduler: function (tasks, callback) {
       for(let i in tasks) {
            if (tasks.hasOwnProperty(i)) {
                console.log(tasks[i].name);
                let cron_expression = tasks[i].cron_expression;
                let active = tasks[i].active;
                console.log(active);
                let fctName = 'init_'+tasks[i].name.toString().trim();

                // INIT DU SCHEDULER
                if(fctName in this && typeof this[fctName] === "function"){
                    global[fctName](cron_expression);
                }else{
                    console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - ### CRON ### function '+ fctName + ' was not find');
                }

                if(active === 'true'){
                    fctName = 'start_'+tasks[i].name.toString().trim();
                    if(typeof fctName === "function"){
                        this[fctName](cron_expression);
                    }else{
                        console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - ### CRON ### function '+ fctName + ' was not find');
                    }
                }
            }
        }

        callback(null, true);
    },
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

