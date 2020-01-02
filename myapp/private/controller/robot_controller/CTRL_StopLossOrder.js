const API_AddOrder = require('../../api/kraken/API_AddOrder');
const CTRL_OpenOrders = require('../kraken_controller/CTRL_OpenOrders');
const API_OpenOrders = require('../../api/kraken/API_OpenOrders');
const DB_OpenOrders = require('../../persistence/private/DB_OpenOrders');
const DB_Keltner = require('../../persistence/private/DB_Keltner');
const DB_Balance = require('../../persistence/private/DB_Balance');
const DB_Trigger = require('../../persistence/private/DB_Triggers');
const ALGO_AddOrder = require('../../algorithm/AddOrder_Algorithm');
const async = require('async');
const moment = require('moment/moment');


module.exports = {
   generateStopLossOrders: function() {

        async.waterfall([
            STEP_DB_getOpenOrders,
            STEP_DB_getLastBalance,
            STEP_DB_getLastKeltner,
            STEP_DB_getKeltnerTrigger,
            STEP_DB_getAutonomousTrigger,
            STEP_ALGO_PrepareOrder,
            //STEP_API_cancelOldStopLossOrder,
            //STEP_API_addNewStopLossOrder,
            //STEP_DB_dropOpenOrders,
            //STEP_API_getOpenOrders,
            //STEP_DB_insertOpenOrders,
            STEP_finish
        ], function finish(err, result) {
            // Nothing to do here
        });

       function STEP_DB_getOpenOrders() {
           DB_OpenOrders.getOpenOrders(STEP_DB_getLastBalance);
       }

       function STEP_DB_getLastBalance(err, OpenOrders) {
           if(!err){
               DB_Balance.getLastBalance(STEP_DB_getKeltnerTrigger, OpenOrders);
           }else{
               STEP_finish(err);
           }
       }

       function STEP_DB_getKeltnerTrigger(err, LastBalance, OpenOrders) {
           if(!err){
               DB_Trigger.getActiveTriggersKeltner(STEP_DB_getAutonomousTrigger, LastKeltner, OpenOrders);
           }else{
               STEP_finish(err);
           }
       }

       function STEP_DB_getAutonomousTrigger(err, ActiveTriggersKeltner,  LastBalance, OpenOrders) {
           if(!err){
               DB_Trigger.getTriggerAutonomous(STEP_DB_getLastKeltner, ActiveTriggersKeltner, LastBalance, OpenOrders);
           }else{
               STEP_finish(err);
           }
       }

        // TO DO FOR EACH PAIR HERE + ADD PAIR PARAMETER DB_Keltner.getLastKeltner(STEP_ALGO_PrepareOrder, pair, ActiveTriggersKeltner,  LastBalance, OpenOrders);
       function STEP_DB_getLastKeltner(err, ActiveTriggersKeltner,  LastBalance, OpenOrders) {
           if(!err){
               DB_Keltner.getLastKeltner(STEP_ALGO_PrepareOrder, ActiveTriggersKeltner,  LastBalance, OpenOrders);
           }else{
               STEP_finish(err);
           }
       }

        function STEP_ALGO_PrepareOrder(err, TriggerAutonomous, ActiveTriggersKeltner, LastKeltner, LastBalance, OpenOrders) {
            if(!err){
                ALGO_AddOrder.prepareStopLossOrders(STEP_finish, TriggerAutonomous, ActiveTriggersKeltner, LastKeltner, LastBalance, OpenOrders);
            }else{
                STEP_finish(err);
            }
        }
/*
        // CANCEL OLD STOP LOSS
        function STEP_API_cancelOldStopLossOrder(order) {
           if(!err){
               API_AddOrder.kraken_AddOrder(STEP_API_addNewStopLossOrder, order);
           }else{
               STEP_finish(err);
           }
       }

        // POSITION NEW STOP LOSS
       function STEP_API_addNewStopLossOrder(order) {
           if(!err){
               API_AddOrder.kraken_AddOrder(STEP_DB_dropOpenOrders, order);
           }else{
               STEP_finish(err);
           }

       }

       function STEP_DB_dropOpenOrders() {
           if(!err){
               DB_OpenOrders.dropOpenOrders(STEP_API_getOpenOrders);
           }else{
               STEP_finish(err);
           }
       }

       function STEP_API_getOpenOrders(err, data) {
           if(!err){
               API_OpenOrders.kraken_OpenOrders(STEP_DB_insertOpenOrders);
           }else{
               STEP_finish(err);
           }
       }
       function STEP_DB_insertOpenOrders(err, data) {
           if(data){
               DB_OpenOrders.upsertOpenOrders(STEP_finish, data);
           }else{
               STEP_finish(err);
           }
       }
       
 */
        function STEP_finish(err, data) {
            if(err){
                var error = ''+err;
                console.log(error);
                console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - CONTROLER - > Process Add Order FAILED');
            }
        }
    }
};
