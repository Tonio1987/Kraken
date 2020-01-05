const API_AddOrder = require('../../api/kraken/API_AddOrder');
const API_CancelOrder = require('../../api/kraken/API_CancelOrder');
const API_OpenOrders = require('../../api/kraken/API_OpenOrders');

const DB_OpenOrders = require('../../persistence/robot/stop_loss_order/DB_OpenOrders');
const DB_Keltner = require('../../persistence/robot/stop_loss_order/DB_Keltner');
const DB_Balance = require('../../persistence/robot/stop_loss_order/DB_Balance');
const DB_Trigger = require('../../persistence/robot/stop_loss_order/DB_Triggers');
const DB_Pair = require('../../persistence/robot/stop_loss_order/DB_Pairs');

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
               DB_Keltner.getLastKeltner(STEP_ALGO_PrepareOrder, pairList, currencyList, ActiveTriggersKeltner,  LastBalance, OpenOrders);
           }else{
               STEP_finish(err);
           }
       }

        function STEP_ALGO_PrepareOrder(err, LastKeltners, pairList, currencyList, ActiveTriggersKeltner, LastBalance, OpenOrders) {
           if(!err){
               console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - > --- ROBOT --- PREPARE ORDER');
                ALGO_AddOrder.prepareStopLossOrders(STEP_API_cancelOldStopLossOrder, LastKeltners, pairList, currencyList, ActiveTriggersKeltner, LastBalance, OpenOrders);
            }else{
                STEP_finish(err);
            }
        }

        // CANCEL OLD STOP LOSS
        function STEP_API_cancelOldStopLossOrder(err, ordersToCancel, orders) {
           if(!err){
               console.log("here");
               if(ordersToCancel.length>0){
                   console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - > --- ROBOT --- CALL THE CANCEL ORDER API');
                   API_CancelOrder.kraken_CancelOrder(STEP_API_addNewStopLossOrder, ordersToCancel, orders);
               }else{
                   console.log("here2");
                   STEP_API_addNewStopLossOrder(err, null, ordersToCancel, orders);
               }
           }else{
               STEP_finish(err);
           }
       }

       // POSITION NEW STOP LOSS
       function STEP_API_addNewStopLossOrder(err, data, ordersToCancel, orders) {
           if(!err){
               console.log("here3");
               console.log(orders);
               if(orders.length>0){
                   console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - > --- ROBOT --- CALL THE ADD ORDER API');
                   API_AddOrder.kraken_AddOrder(STEP_DB_dropOpenOrders, orders);
               }else{
                   console.log("here4");
                   STEP_DB_dropOpenOrders();
               }
           }else{
               STEP_finish(err);
           }
       }

       function STEP_DB_dropOpenOrders() {
           console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - > --- ROBOT --- DROP OPEN ORDERS');
           DB_OpenOrders.dropOpenOrders(STEP_API_getOpenOrders);
       }

       function STEP_API_getOpenOrders(err, data) {
            API_OpenOrders.kraken_OpenOrders(STEP_DB_insertOpenOrders);
       }

       function STEP_DB_insertOpenOrders(err, data) {
           if(!err){
               console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - > --- ROBOT --- '+data.length+'NEW OPEN ORDERS');
               if(data.length>0){
                   DB_OpenOrders.upsertOpenOrders(STEP_finish, data);
               }else{
                   STEP_finish(err);
               }
           }else{
               STEP_finish(false);
           }
       }

        function STEP_finish(err, data) {
            if(err){
                var error = ''+err;
                console.log(error);
                console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - CONTROLER - > Process Add Stop Loss Order FAILED');
            }
            console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - > --- ROBOT --- END STOP LOSS ORDER');
        }
    }
};
