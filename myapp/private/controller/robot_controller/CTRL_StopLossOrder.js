const API_AddOrder = require('../../api/kraken/API_AddOrder');
const API_CancelOrder = require('../../api/kraken/API_CancelOrder');
const API_OpenOrders = require('../../api/kraken/API_OpenOrders');

const DB_OpenOrders = require('../../persistence/robot/stop_loss_order/DB_OpenOrders');
const DB_Keltner = require('../../persistence/robot/stop_loss_order/DB_Keltner');
const DB_Balance = require('../../persistence/robot/stop_loss_order/DB_Balance');
const DB_Trigger = require('../../persistence/robot/stop_loss_order/DB_Triggers');
const DB_Pair = require('../../persistence/robot/stop_loss_order/DB_Pairs');
const DB_Ticker = require('../../persistence/robot/stop_loss_order/DB_Tickers');

const ALGO_AddOrder = require('../../algorithm/AddOrder_Algorithm');

const async = require('async');
const moment = require('moment');


module.exports = {
   generateStopLossOrders: function() {

        async.waterfall([
            STEP_DB_getAutonomousTrigger,
            STEP_CHECK_AutonomousMode,
            STEP_DB_getOpenOrders,
            STEP_DB_getLastBalanceTimestamp,
            STEP_DB_getLastBalance,
            STEP_DB_getKeltnerTrigger,
            STEP_DB_getEurPairs,
            STEP_DB_getLastKeltner,
            STEP_DB_getLastTickerTimestamp,
            STEP_DB_getLastTicker,
            STEP_ALGO_PrepareOrder,
            STEP_API_cancelOldStopLossOrder,
            STEP_API_addNewStopLossOrder,
            STEP_DB_dropOpenOrders,
            STEP_API_getOpenOrders,
            STEP_DB_insertOpenOrders,
            STEP_finish
        ], function finish(err, result) {
            // Nothing to do here
        });

       function STEP_DB_getAutonomousTrigger() {
           DB_Trigger.getTriggerAutonomous(STEP_CHECK_AutonomousMode);
       }

       function STEP_CHECK_AutonomousMode(err, trigger) {
           if(!err){
               if(trigger[0].active === true){
                   STEP_DB_getOpenOrders();
               }else{
                   STEP_finish(null, true);
               }
           }else{
               STEP_finish(err);
           }
       }

       function STEP_DB_getOpenOrders() {
           DB_OpenOrders.getOpenOrders(STEP_DB_getLastBalanceTimestamp);
       }

       function STEP_DB_getLastBalanceTimestamp(err, OpenOrders) {
           if(!err){
               DB_Balance.getMaxInsertTimestamp(STEP_DB_getLastBalance, OpenOrders);
           }else{
               STEP_finish(err);
           }
       }

       function STEP_DB_getLastBalance(err, LastBalanceTimestamp, OpenOrders) {
           if(!err){
               DB_Balance.getLastBalance(STEP_DB_getKeltnerTrigger, LastBalanceTimestamp, OpenOrders);
           }else{
               STEP_finish(err);
           }
       }

       function STEP_DB_getKeltnerTrigger(err, LastBalance, OpenOrders) {
           if(!err){
               DB_Trigger.getActiveTriggersKeltner(STEP_DB_getEurPairs, LastBalance, OpenOrders);
           }else{
               STEP_finish(err);
           }
       }

       function STEP_DB_getEurPairs(err, ActiveTriggersKeltner,  LastBalance, OpenOrders) {
           if(!err){
               let currencyList = [];
               for(elem in LastBalance){
                   if(LastBalance.hasOwnProperty(elem)){
                       currencyList.push(LastBalance[elem].currency)
                   }
               }
               DB_Pair.getEurPairs(STEP_DB_getLastKeltner, currencyList, ActiveTriggersKeltner,  LastBalance, OpenOrders)
           }else{
               STEP_finish(err);
           }
       }

       function STEP_DB_getLastKeltner(err, eurPairs, currencyList, ActiveTriggersKeltner,  LastBalance, OpenOrders) {
           if(!err){
               let pairList = [];
               for(elem in eurPairs){
                   if(eurPairs.hasOwnProperty(elem)){
                       pairList.push(eurPairs[elem].kraken_pair_name);
                   }
               }
               DB_Keltner.getLastKeltner(STEP_DB_getLastTickerTimestamp, pairList, currencyList, ActiveTriggersKeltner,  LastBalance, OpenOrders);
           }else{
               STEP_finish(err);
           }
       }

       function STEP_DB_getLastTickerTimestamp(err, LastKeltners, pairList, currencyList, ActiveTriggersKeltner, LastBalance, OpenOrders) {
           if(!err){
               DB_Ticker.getMaxInsertTimestamp(STEP_DB_getLastTicker, pairList, LastKeltners, currencyList, ActiveTriggersKeltner,  LastBalance, OpenOrders);
           }else{
               STEP_finish(err);
           }
       }

       function STEP_DB_getLastTicker(err, lastTickerTimestamp, pairList, LastKeltners, currencyList, ActiveTriggersKeltner, LastBalance, OpenOrders) {
           if(!err){
               DB_Ticker.getLastTicker(STEP_ALGO_PrepareOrder, lastTickerTimestamp[0].insert_timestamp, pairList, LastKeltners, currencyList, ActiveTriggersKeltner,  LastBalance, OpenOrders);
           }else{
               STEP_finish(err);
           }
       }

        function STEP_ALGO_PrepareOrder(err, LastTicker, pairList, LastKeltners, currencyList, ActiveTriggersKeltner, LastBalance, OpenOrders) {
           if(!err){
               console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - > --- ROBOT STOP LOSS --- PREPARE ORDER');
                ALGO_AddOrder.prepareStopLossOrders(STEP_API_cancelOldStopLossOrder, LastTicker, LastKeltners, pairList, currencyList, ActiveTriggersKeltner, LastBalance, OpenOrders);
            }else{
                STEP_finish(err);
            }
        }

        // CANCEL OLD STOP LOSS
        function STEP_API_cancelOldStopLossOrder(err, preparedOrders) {
           if(!err){
               if(preparedOrders.ordersToCancel.length>0){
                   console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - > --- ROBOT STOP LOSS --- CALL THE CANCEL ORDER API');
                   API_CancelOrder.kraken_CancelOrder(STEP_API_addNewStopLossOrder, preparedOrders.ordersToCancel, preparedOrders);
               }else{
                   console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - > --- ROBOT STOP LOSS --- NO ORDERS TO CANCEL');
                   STEP_API_addNewStopLossOrder(err, null, preparedOrders);
               }
           }else{
               STEP_finish(err);
           }
       }

       // POSITION NEW STOP LOSS
       function STEP_API_addNewStopLossOrder(err, data, preparedOrders) {
           if(!err){
               if(preparedOrders.orders.length>0){
                   console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - > --- ROBOT STOP LOSS --- CALL THE ADD ORDER API');
                   API_AddOrder.kraken_AddOrder(STEP_DB_dropOpenOrders, preparedOrders.orders);
               }else{
                   console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - > --- ROBOT STOP LOSS --- NO NEW ORDERS');
                   STEP_DB_dropOpenOrders();
               }
           }else{
               STEP_finish(err);
           }
       }

       function STEP_DB_dropOpenOrders(err, data) {
           if(err){
              console.log(err);
           }
           console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - > --- ROBOT STOP LOSS --- DROP OPEN ORDERS');
           DB_OpenOrders.dropOpenOrders(STEP_API_getOpenOrders);
       }

       function STEP_API_getOpenOrders(err, data) {
            console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - > --- ROBOT STOP LOSS --- CALL OPEN ORDERS API');
            API_OpenOrders.kraken_OpenOrders(STEP_DB_insertOpenOrders);
       }

       function STEP_DB_insertOpenOrders(err, data) {
           if(!err){
               if(Object.keys(data).length > 0){
                   console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - > --- ROBOT STOP LOSS --- OPEN ORDERS ARE IN POSITION');
                   DB_OpenOrders.upsertOpenOrders(STEP_finish, data);
               }else{
                   console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - > --- ROBOT STOP LOSS --- NO OPEN ORDERS');
                   STEP_finish(false);
               }
           }else{
               STEP_finish(false);
           }
       }

        function STEP_finish(err, data) {
            if(err){
                var error = ''+err;
                console.log(error);
                console.log('\x1b[31m', moment().format('L') + ' - ' + moment().format('LTS') + ' - CONTROLER - > ROBOT STOP LOSS FAILED', '\x1b[0m');
            }
            console.log('\x1b[36m', moment().format('L') + ' - ' + moment().format('LTS') + ' - > --- ROBOT STOP LOSS --- END --- STOP LOSS ORDER', '\x1b[0m');
        }
    }
};
