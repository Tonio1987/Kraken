const cron = require('node-cron');
const moment = require('moment/moment');

// CONTROLLER CALL
const CTRL_LoadTicker = require('../controller/kraken_controller/CTRL_Ticker');
const CTRL_TradeBalance = require('../controller/kraken_controller/CTRL_TradeBalance');
const CTRL_Balance = require('../controller/kraken_controller/CTRL_Balance');
const CTRL_Time = require('../controller/kraken_controller/CTRL_Time');
const CTRL_TradesHistory = require('../controller/kraken_controller/CTRL_TradesHistory');
const CTRL_ClosedOrders = require('../controller/kraken_controller/CTRL_ClosedOrders');
const CTRL_OpenOrders = require('../controller/kraken_controller/CTRL_OpenOrders');
const CTRL_MMCalculation = require('../controller/algotirhm_controller/CTRL_MMCalculation');
const CTRL_MMEvolCalculation = require('../controller/algotirhm_controller/CTRL_MMEvolCalculation');
const CTRL_KeltnerCalculation = require('../controller/algotirhm_controller/CTRL_KeltnerCalculation');
const CTRL_PurgeBalance = require('../controller/db_controller/CTRL_PurgeBalance');
const CTRL_PurgeTradeBalance = require('../controller/db_controller/CTRL_PurgeTradeBalance');
const CTRL_PurgeTicker = require('../controller/db_controller/CTRL_PurgeTicker');
const CTRL_PurgeMobileM = require('../controller/db_controller/CTRL_PurgeMobileM');
const CTRL_PurgeMobileMEvolution = require('../controller/db_controller/CTRL_PurgeMobileMEvolution');
const CTRL_PurgeKeltner = require('../controller/db_controller/CTRL_PurgeKeltner');

// INIT TASKS ATTRIBUTES
let server_start_time = moment();
let task_ServerOk = null;
let task_KrakenServerOnline = null;
let task_LoadTicker = null;
let task_MMCalculation = null;
let task_MMEvolCalculation = null;
let task_KeltnerCalculation = null;
let task_LoadTradeBalance = null;
let task_LoadBalance = null;
let task_LoadTradeHistory = null;
let task_LoadClosedOrders = null;
let task_LoadOpenOrders = null;
let task_PurgeData = null;

// HANDLER DYNAMIC FUNCTION
let Handler={};

// NODE SERVER IS ALIVE - EVERY 15 SECONDS
Handler.init_task_ServerOk = function (cron_expression){
    task_ServerOk = cron.schedule(cron_expression, () =>  {
        console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - CRON -> Node server up since '+ moment(server_start_time).locale('en').fromNow());
    }, {
        scheduled: false
    });
};

// KRAKEN SERVER IS ALIVE - EVERY 30 SECONDS
Handler.init_task_KrakenServerOnline = function (cron_expression){
    task_KrakenServerOnline = cron.schedule(cron_expression, () =>  {
        console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - CRON - > Check Kraken Server Time');
        CTRL_Time.LoadTime();
    }, {
        scheduled: false
    });
};

// LOAD TICKER - EVERY 1 MINUTES
Handler.init_task_LoadTicker = function(cron_expression){
    task_LoadTicker = cron.schedule(cron_expression, () =>  {
        console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - CRON - > Load new Ticker');
        CTRL_LoadTicker.LoadTicker();
    }, {
        scheduled: false
    });
};

// CALCULATE MOVING AVERAGES - EVERY 1 MINUTES
Handler.init_task_MMCalculation = function(cron_expression){
    task_MMCalculation = cron.schedule(cron_expression, () =>  {
        console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - CRON - > Load MMCalculation');
        CTRL_MMCalculation.CalculateMM();
    }, {
        scheduled: false
    });
};

// CALCULATE MOVING AVERAGES EVOLUTION - EVERY 1 MINUTES AT 30 S
Handler.init_task_MMEvolCalculation = function(cron_expression){
    task_MMEvolCalculation = cron.schedule(cron_expression, () =>  {
        console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - CRON - > Load MMEvolCalculation');
        CTRL_MMEvolCalculation.CalculateMMEvol();
    }, {
        scheduled: false
    });
};

// CALCULATE KELTNER - EVERY 1 MINUTES AT 40 S
Handler.init_task_KeltnerCalculation = function(cron_expression){
    task_KeltnerCalculation = cron.schedule(cron_expression, () =>  {
        console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - CRON - > Load Keltner');
        CTRL_KeltnerCalculation.CalculateKeltner();
    }, {
        scheduled: false
    });
};

// LOAD TRADE BALANCE - EVERY 5 MINUTES
Handler.init_task_LoadTradeBalance = function(cron_expression){
    task_LoadTradeBalance = cron.schedule(cron_expression, () =>  {
        console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - CRON - > Load Trade Balance');
        CTRL_TradeBalance.LoadTradeBalance();
    }, {
        scheduled: false
    });
};

// LOAD BALANCE - EVERY 1 HOURS
Handler.init_task_LoadBalance = function(cron_expression){
    task_LoadBalance = cron.schedule(cron_expression, () =>  {
        console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - CRON  - > Load Balance');
        CTRL_Balance.LoadBalance();
    }, {
        scheduled: false
    });
};

// LOAD TRADE HISTORY - EVERY 1 HOURS
Handler.init_task_LoadTradeHistory = function(cron_expression){
    task_LoadTradeHistory = cron.schedule(cron_expression, () =>  {
        console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - CRON - > Load Trades History');
        CTRL_TradesHistory.LoadTradesHistory();
    }, {
        scheduled: false
    });
};


// LOAD CLOSED ORDERS - EVERY 1 HOURS
Handler.init_task_LoadClosedOrders = function(cron_expression){
    task_LoadClosedOrders = cron.schedule(cron_expression, () =>  {
        console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - CRON - > Load Closed Orders');
        CTRL_ClosedOrders.LoadClosedOrders();
    }, {
        scheduled: false
    });
};

// LOAD OPEN ORDERS - EVERY 1 MINUTES
Handler.init_task_LoadOpenOrders = function(cron_expression){
    task_LoadOpenOrders = cron.schedule(cron_expression, () =>  {
        console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - CRON - > Load Open Orders');
        CTRL_OpenOrders.LoadOpenOrders();
    }, {
        scheduled: false
    });
};

// PURGE DATA - EVERY 1 DAY
Handler.init_task_PurgeData = function(cron_expression){
    task_PurgeData = cron.schedule(cron_expression, () =>  {
        console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - CRON - > Purge Data');
        CTRL_PurgeBalance.purgeBalanceData();
        CTRL_PurgeTradeBalance.purgeTradeBalanceData();
        CTRL_PurgeMobileM.purgeMobileMData();
        CTRL_PurgeMobileMEvolution.purgeMobileMEvolutionData();
        CTRL_PurgeTicker.purgeTickerData();
        CTRL_PurgeKeltner.purgeKeltnerData();
    }, {
        scheduled: false
    });
};

Handler.start_task_ServerOk = function(){task_ServerOk.start();};
Handler.stop_task_ServerOk = function(){task_ServerOk.stop();};

Handler.start_task_KrakenServerOnline = function(){task_KrakenServerOnline.start();};
Handler.stop_task_KrakenServerOnline = function(){task_KrakenServerOnline.stop();};

Handler.start_task_LoadTicker = function(){task_LoadTicker.start();};
Handler.stop_task_LoadTicker = function(){task_LoadTicker.stop();};

Handler.start_task_MMCalculation = function(){task_MMCalculation.start();};
Handler.stop_task_MMCalculation = function(){task_MMCalculation.stop();};

Handler.start_task_MMEvolCalculation = function(){task_MMEvolCalculation.start();};
Handler.stop_task_MMEvolCalculation = function(){task_MMEvolCalculation.stop();};

Handler.start_task_KeltnerCalculation = function(){task_KeltnerCalculation.start();};
Handler.stop_task_KeltnerCalculation = function(){task_KeltnerCalculation.stop();};

Handler.start_task_LoadTradeBalance = function(){task_LoadTradeBalance.start();};
Handler.stop_task_LoadTradeBalance = function(){task_LoadTradeBalance.stop();};

Handler.start_task_LoadBalance = function(){task_LoadBalance.start();};
Handler.stop_task_LoadBalance = function(){task_LoadBalance.stop();};

Handler.start_task_LoadTradeHistory = function(){task_LoadTradeHistory.start();};
Handler.stop_task_LoadTradeHistory = function(){task_LoadTradeHistory.stop();};

Handler.start_task_LoadClosedOrders = function(){task_LoadClosedOrders.start();};
Handler.stop_task_LoadClosedOrders = function(){task_LoadClosedOrders.stop();};

Handler.start_task_LoadOpenOrders = function(){task_LoadOpenOrders.start();};
Handler.stop_task_LoadOpenOrders = function(){task_LoadOpenOrders.stop();};

Handler.start_task_PurgeData = function(){task_PurgeData.start();};
Handler.stop_task_PurgeData = function(){task_PurgeData.stop();};


module.exports = {
   initTasksScheduler: function (tasks, callback) {
       for(let i in tasks) {
            if (tasks.hasOwnProperty(i)) {
                let cron_expression = tasks[i].cron_expression;
                let active = tasks[i].active;
                let fctName = 'init_'+tasks[i].name.toString().trim();

                // INIT DU SCHEDULER
                Handler[fctName](cron_expression);

                if(active === 'true'){
                    fctName = 'start_'+tasks[i].name.toString().trim();
                    Handler[fctName](cron_expression);
                }

                if(active === 'false'){
                    fctName = 'stop_'+tasks[i].name.toString().trim();
                    Handler[fctName]();
                }
            }
        }
        callback(null, tasks);
    },
    reloadTasksScheduler: function (tasks, callback) {
        for(let i in tasks) {
            if (tasks.hasOwnProperty(i)) {
                let cron_expression = tasks[i].cron_expression;
                let active = tasks[i].active;
                let fctName = '';
                if(active === 'true'){
                    fctName = 'start_'+tasks[i].name.toString().trim();
                    Handler[fctName](cron_expression);
                }

                if(active === 'false'){
                    fctName = 'stop_'+tasks[i].name.toString().trim();
                    Handler[fctName]();
                }
            }
        }
        callback(null, tasks);
    }
};

