const cron = require('node-cron');
const moment = require('moment');
var colors = require('colors');

// CONTROLLER CALL

// KRAKEN API
const CTRL_AssetPairs = require('../controller/kraken_controller/CTRL_AssetPairs');
const CTRL_LoadTicker = require('../controller/kraken_controller/CTRL_Ticker');
const CTRL_TradeBalance = require('../controller/kraken_controller/CTRL_TradeBalance');
const CTRL_Balance = require('../controller/kraken_controller/CTRL_Balance');
const CTRL_Time = require('../controller/kraken_controller/CTRL_Time');
const CTRL_TradesHistory = require('../controller/kraken_controller/CTRL_TradesHistory');
const CTRL_ClosedOrders = require('../controller/kraken_controller/CTRL_ClosedOrders');
const CTRL_OpenOrders = require('../controller/kraken_controller/CTRL_OpenOrders');
const CTRL_Trades = require('../controller/kraken_controller/CTRL_Trades');
const CTRL_OHLC = require('../controller/kraken_controller/CTRL_OHLC');
const CTRL_ATR = require('../controller/kraken_controller/CTRL_ATR');

// ALGORITHM
const CTRL_MM = require('../controller/algotirhm_controller/CTRL_MM_Main');
const CTRL_KeltnerCalculation = require('../controller/algotirhm_controller/CTRL_KeltnerCalculation');

// ROBOT
const CTRL_StopLossOrders = require('../controller/robot_controller/CTRL_StopLossOrder');

// PURGE DATA
const CTRL_PurgeBalance = require('../controller/purge_controller/CTRL_PurgeBalance');
const CTRL_PurgeTradeBalance = require('../controller/purge_controller/CTRL_PurgeTradeBalance');
const CTRL_PurgeTicker = require('../controller/purge_controller/CTRL_PurgeTicker');
const CTRL_PurgeMobileM = require('../controller/purge_controller/CTRL_PurgeMobileM');
const CTRL_PurgeMobileMEvolution = require('../controller/purge_controller/CTRL_PurgeMobileMEvolution');
const CTRL_PurgeMobileMCompare = require('../controller/purge_controller/CTRL_PurgeMobileMCompare');
const CTRL_PurgeMobileMIndicator = require('../controller/purge_controller/CTRL_PurgeMobileMIndicator');
const CTRL_PurgeKeltner = require('../controller/purge_controller/CTRL_PurgeKeltner');
const CTRL_PurgeOHLC = require('../controller/purge_controller/CTRL_PurgeOHLC');
const CTRL_PurgeATR = require('../controller/purge_controller/CTRL_PurgeATR');

// HISTORY
const CTRL_History_TradeBalance = require('../controller/history_controller/CTRL_HistoryBalance');

let server_start_time = moment();

// INIT TASKS ATTRIBUTES
// SERVER CHECK TASKS
let task_ServerOk = null;
let task_KrakenServerOnline = null;

// LOAD DATA TASKS
let task_LoadAssetPairs = null;
let task_LoadTradeBalance = null;
let task_LoadBalance = null;
let task_LoadTradeHistory = null;
let task_LoadClosedOrders = null;
let task_LoadOpenOrders = null;
let task_LoadMarketTrades = null;
let task_LoadTicker = null;
let task_LoadOHLC1h = null;
let task_LoadOHLC1d = null;
let task_LoadATR1h = null;
let task_LoadATR1d = null;

// ALGORITHM TASKS
let task_MMCalculation = null;
let task_KeltnerCalculation_1H = null;
let task_KeltnerCalculation_1D = null;

// ROBOT TASK
let task_Robot_StopLossOrder = null;

// PURGE TASKS
let task_PurgeData = null;

// HISTORY
let task_History_TradeBalance = null;

// HANDLER DYNAMIC FUNCTION
let Handler={};

// NODE SERVER IS ALIVE
Handler.init_task_ServerOk = function (cron_expression){
    task_ServerOk = cron.schedule(cron_expression, () =>  {
        console.log(moment().format('L').yellow + ' - '+ moment().format('LTS').yellow + ' *** CRON SCHEDULER ***'.brightBlue +' -> Node server up since '+ moment(server_start_time).locale('en').fromNow());
    }, {
        scheduled: false
    });
};

// KRAKEN SERVER IS ALIVE
Handler.init_task_KrakenServerOnline = function (cron_expression){
    task_KrakenServerOnline = cron.schedule(cron_expression, () =>  {
        console.log(moment().format('L').yellow + ' - '.yellow + moment().format('LTS').yellow + ' *** CRON SCHEDULER ***'.brightBlue +' -> Check Kraken Server Time ... '+'[ RUNNING ]'.brightYellow);
        CTRL_Time.LoadTime();
    }, {
        scheduled: false
    });
};

// LOAD ASSET PAIRS
Handler.init_task_LoadAssetPairs = function(cron_expression){
    task_LoadAssetPairs = cron.schedule(cron_expression, () =>  {
        console.log(moment().format('L').yellow + ' - '+ moment().format('LTS').yellow + ' *** CRON SCHEDULER ***'.brightBlue + ' -> Load Asset Pairs ... '+'[ RUNNING ]'.brightYellow);
        CTRL_AssetPairs.LoadAssetPairs();
    }, {
        scheduled: false
    });
};

// LOAD TICKER
Handler.init_task_LoadTicker = function(cron_expression){
    task_LoadTicker = cron.schedule(cron_expression, () =>  {
        console.log(moment().format('L').yellow + ' - '+ moment().format('LTS').yellow + ' *** CRON SCHEDULER ***'.brightBlue + ' -> Load new Ticker ... '+'[ RUNNING ]'.brightYellow);
        CTRL_LoadTicker.LoadTicker();
    }, {
        scheduled: false
    });
};

// LOAD TRADE BALANCE
Handler.init_task_LoadTradeBalance = function(cron_expression){
    task_LoadTradeBalance = cron.schedule(cron_expression, () =>  {
        console.log(moment().format('L').yellow + ' - '+ moment().format('LTS').yellow + ' *** CRON SCHEDULER ***'.brightBlue + ' -> Load Trade Balance ... '+'[ RUNNING ]'.brightYellow);
        CTRL_TradeBalance.LoadTradeBalance();
    }, {
        scheduled: false
    });
};

// LOAD BALANCE
Handler.init_task_LoadBalance = function(cron_expression){
    task_LoadBalance = cron.schedule(cron_expression, () =>  {
        console.log(moment().format('L').yellow + ' - '+ moment().format('LTS').yellow + ' *** CRON SCHEDULER ***'.brightBlue + ' -> Load Balance ... '+'[ RUNNING ]'.brightYellow);
        CTRL_Balance.LoadBalance();
    }, {
        scheduled: false
    });
};

// LOAD MARKET TRADES
Handler.init_task_LoadMarketTrades = function(cron_expression){
    task_LoadMarketTrades = cron.schedule(cron_expression, () =>  {
        console.log(moment().format('L').yellow + ' - '+ moment().format('LTS').yellow + ' *** CRON SCHEDULER ***'.brightBlue + ' -> Load Market trades ... '+'[ RUNNING ]'.brightYellow);
        CTRL_Trades.LoadTrades();
    }, {
        scheduled: false
    });
};

// LOAD TRADE HISTORY
Handler.init_task_LoadTradeHistory = function(cron_expression){
    task_LoadTradeHistory = cron.schedule(cron_expression, () =>  {
        console.log(moment().format('L').yellow + ' - '+ moment().format('LTS').yellow + ' *** CRON SCHEDULER ***'.brightBlue + ' -> Load Trades History ... '+'[ RUNNING ]'.brightYellow);
        CTRL_TradesHistory.LoadTradesHistory();
    }, {
        scheduled: false
    });
};


// LOAD CLOSED ORDERS
Handler.init_task_LoadClosedOrders = function(cron_expression){
    task_LoadClosedOrders = cron.schedule(cron_expression, () =>  {
        console.log(moment().format('L').yellow + ' - '+ moment().format('LTS').yellow + ' *** CRON SCHEDULER ***'.brightBlue + ' -> Load Closed Orders ... '+'[ RUNNING ]'.brightYellow);
        CTRL_ClosedOrders.LoadClosedOrders();
    }, {
        scheduled: false
    });
};

// LOAD OPEN ORDERS
Handler.init_task_LoadOpenOrders = function(cron_expression){
    task_LoadOpenOrders = cron.schedule(cron_expression, () =>  {
        console.log(moment().format('L').yellow + ' - '+ moment().format('LTS').yellow + ' *** CRON SCHEDULER ***'.brightBlue + ' -> Load Open Orders ... '+'[ RUNNING ]'.brightYellow);
        CTRL_OpenOrders.LoadOpenOrders();
    }, {
        scheduled: false
    });
};

// LOAD OHLC 1H
Handler.init_task_LoadOHLC1H = function(cron_expression){
    task_LoadOHLC1h = cron.schedule(cron_expression, () =>  {
        console.log(moment().format('L').yellow + ' - '+ moment().format('LTS').yellow + ' *** CRON SCHEDULER ***'.brightBlue + ' -> Load OHLC 1 HOUR ... '+'[ RUNNING ]'.brightYellow);
        CTRL_OHLC.LoadOHLC_1h();
    }, {
        scheduled: false
    });
};

// LOAD OHLC 1D
Handler.init_task_LoadOHLC1D = function(cron_expression){
    task_LoadOHLC1d = cron.schedule(cron_expression, () =>  {
        console.log(moment().format('L').yellow + ' - '+ moment().format('LTS').yellow + ' *** CRON SCHEDULER ***'.brightBlue + ' -> Load OHLC 1 DAY ... '+'[ RUNNING ]'.brightYellow);
        CTRL_OHLC.LoadOHLC_1d();
    }, {
        scheduled: false
    });
};

// LOAD ATR 1H
Handler.init_task_LoadATR1H = function(cron_expression){
    task_LoadATR1h = cron.schedule(cron_expression, () =>  {
        console.log(moment().format('L').yellow + ' - '+ moment().format('LTS').yellow + ' *** CRON SCHEDULER ***'.brightBlue + ' -> Load ATR 1 HOUR ... '+'[ RUNNING ]'.brightYellow);
        CTRL_ATR.LoadATR_1h();
    }, {
        scheduled: false
    });
};

// LOAD ATR 1D
Handler.init_task_LoadATR1D = function(cron_expression){
    task_LoadATR1d = cron.schedule(cron_expression, () =>  {
        console.log(moment().format('L').yellow + ' - '+ moment().format('LTS').yellow + ' *** CRON SCHEDULER ***'.brightBlue + ' -> Load ATR 1 DAY ... '+'[ RUNNING ]'.brightYellow);
        CTRL_ATR.LoadATR_1d();
    }, {
        scheduled: false
    });
};

// CALCULATE MOVING AVERAGES
Handler.init_task_MMCalculation = function(cron_expression){
    task_MMCalculation = cron.schedule(cron_expression, () =>  {
        console.log(moment().format('L').yellow + ' - '+ moment().format('LTS').yellow + ' *** CRON SCHEDULER ***'.brightBlue + ' -> Launch MM ALGORITHMS ... '+'[ RUNNING ]'.brightYellow);
        CTRL_MM.Launch_MM_Algorithms();
    }, {
        scheduled: false
    });
};

// CALCULATE KELTNER 1H
Handler.init_task_KeltnerCalculation1H = function(cron_expression){
    task_KeltnerCalculation_1H = cron.schedule(cron_expression, () =>  {
        console.log(moment().format('L').yellow + ' - '+ moment().format('LTS').yellow + ' *** CRON SCHEDULER ***'.brightBlue + ' -> Calculate Keltner bands 1 HOUR ... '+'[ RUNNING ]'.brightYellow);
        CTRL_KeltnerCalculation.CalculateKeltner_1h();
    }, {
        scheduled: false
    });
};

// CALCULATE KELTNER 1D
Handler.init_task_KeltnerCalculation1D = function(cron_expression){
    task_KeltnerCalculation_1D = cron.schedule(cron_expression, () =>  {
        console.log(moment().format('L').yellow + ' - '+ moment().format('LTS').yellow + ' *** CRON SCHEDULER ***'.brightBlue + ' -> Calculate Keltner bands 1 DAY ... '+'[ RUNNING ]'.brightYellow);
        CTRL_KeltnerCalculation.CalculateKeltner_1d();
    }, {
        scheduled: false
    });
};

// ROBOT - STOP LOSS ORDER
Handler.init_task_Robot_StopLossOrder = function(cron_expression){
    task_Robot_StopLossOrder = cron.schedule(cron_expression, () =>  {
        console.log(moment().format('L').yellow + ' - '+ moment().format('LTS').yellow + ' *** CRON SCHEDULER *** -> --- ROBOT --- STOP LOSS ORDER ... '.brightBlue+'[ RUNNING ]'.brightYellow);
        CTRL_StopLossOrders.generateStopLossOrders();
    }, {
        scheduled: false
    });
};

// PURGE DATA
Handler.init_task_PurgeData = function(cron_expression){
    task_PurgeData = cron.schedule(cron_expression, () =>  {
        console.log(moment().format('L').yellow + ' - '+ moment().format('LTS').yellow + ' *** CRON SCHEDULER ***'.brightBlue + ' -> Purge Data ... '+'[ RUNNING ]'.brightYellow);
        CTRL_PurgeBalance.purgeBalanceData();
        CTRL_PurgeTradeBalance.purgeTradeBalanceData();
        CTRL_PurgeMobileM.purgeMobileMData();
        CTRL_PurgeMobileMEvolution.purgeMobileMEvolutionData();
        CTRL_PurgeMobileMCompare.purgeMobileMCompareData();
        CTRL_PurgeMobileMIndicator.purgeMobileMIndicatorsData();
        CTRL_PurgeTicker.purgeTickerData();
        CTRL_PurgeKeltner.purgeKeltnerData();
        CTRL_PurgeOHLC.purgeOHLCData1h();
        CTRL_PurgeOHLC.purgeOHLCData1d();
        CTRL_PurgeATR.purgeATRData1h();
        CTRL_PurgeATR.purgeATRData1d();
    }, {
        scheduled: false
    });
};

// HISTORY TRADE BALANCE
Handler.init_task_History_TradeBalance = function (cron_expression){
    task_History_TradeBalance = cron.schedule(cron_expression, () =>  {
        console.log(moment().format('L').yellow + ' - '+ moment().format('LTS').yellow + ' *** CRON SCHEDULER ***'.cyan + ' -> Load History Trade Balance ... '+'[ RUNNING ]'.brightYellow);
        CTRL_History_TradeBalance.loadHistory_TradeBalance();
    }, {
        scheduled: false
    });
};

// KRAKEN
Handler.start_task_ServerOk = function(){task_ServerOk.start();};
Handler.stop_task_ServerOk = function(){task_ServerOk.stop();};

Handler.start_task_KrakenServerOnline = function(){task_KrakenServerOnline.start();};
Handler.stop_task_KrakenServerOnline = function(){task_KrakenServerOnline.stop();};

Handler.start_task_LoadAssetPairs = function(){task_LoadAssetPairs.start();};
Handler.stop_task_LoadAssetPairs = function(){task_LoadAssetPairs.stop();};

Handler.start_task_LoadTicker = function(){task_LoadTicker.start();};
Handler.stop_task_LoadTicker = function(){task_LoadTicker.stop();};

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

Handler.start_task_LoadMarketTrades = function(){task_LoadMarketTrades.start();};
Handler.stop_task_LoadMarketTrades = function(){task_LoadMarketTrades.stop();};

// ALGORITHM
Handler.start_task_LoadOHLC1H = function(){task_LoadOHLC1h.start();};
Handler.stop_task_LoadOHLC1H = function(){task_LoadOHLC1h.stop();};

Handler.start_task_LoadOHLC1D = function(){task_LoadOHLC1d.start();};
Handler.stop_task_LoadOHLC1D = function(){task_LoadOHLC1d.stop();};

Handler.start_task_LoadATR1H = function(){task_LoadATR1h.start();};
Handler.stop_task_LoadATR1H = function(){task_LoadATR1h.stop();};

Handler.start_task_LoadATR1D = function(){task_LoadATR1d.start();};
Handler.stop_task_LoadATR1D = function(){task_LoadATR1d.stop();};

Handler.start_task_MMCalculation = function(){task_MMCalculation.start();};
Handler.stop_task_MMCalculation = function(){task_MMCalculation.stop();};

Handler.start_task_KeltnerCalculation1H = function(){task_KeltnerCalculation_1H.start();};
Handler.stop_task_KeltnerCalculation1H = function(){task_KeltnerCalculation_1H.stop();};

Handler.start_task_KeltnerCalculation1D = function(){task_KeltnerCalculation_1D.start();};
Handler.stop_task_KeltnerCalculation1D = function(){task_KeltnerCalculation_1D.stop();};

// ROBOT
Handler.start_task_Robot_StopLossOrder = function(){task_Robot_StopLossOrder.start();};
Handler.stop_task_Robot_StopLossOrder = function(){task_Robot_StopLossOrder.stop();};

// PURGE DATA
Handler.start_task_PurgeData = function(){task_PurgeData.start();};
Handler.stop_task_PurgeData = function(){task_PurgeData.stop();};

// HISTORY
Handler.start_task_History_TradeBalance = function(){task_History_TradeBalance.start();};
Handler.stop_task_History_TradeBalance = function(){task_History_TradeBalance.stop();};


module.exports = {
   initTasksScheduler: function (callback, tasks) {
       for(let i in tasks) {
            if (tasks.hasOwnProperty(i)) {
                let cron_expression = tasks[i].cron_expression;
                let active = tasks[i].active;
                let fctName = 'init_'+tasks[i].name.toString().trim();

                // INIT DU SCHEDULER
                Handler[fctName](cron_expression);

                if(active === true){
                    fctName = 'start_'+tasks[i].name.toString().trim();
                    Handler[fctName](cron_expression);
                }

                if(active === false){
                    fctName = 'stop_'+tasks[i].name.toString().trim();
                    Handler[fctName]();
                }
            }
        }
        callback(null, tasks);
    },
    reloadTasksScheduler: function (callback, tasks) {
        for(let i in tasks) {
            if (tasks.hasOwnProperty(i)) {
                let cron_expression = tasks[i].cron_expression;
                let active = tasks[i].active;
                let fctName = '';
                if(active === true){
                    fctName = 'start_'+tasks[i].name.toString().trim();
                    Handler[fctName](cron_expression);
                }

                if(active === false){
                    fctName = 'stop_'+tasks[i].name.toString().trim();
                    Handler[fctName]();
                }
            }
        }
        callback(null, tasks);
    }
};

