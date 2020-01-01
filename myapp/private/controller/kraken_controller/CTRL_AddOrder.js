const API_AddOrder = require('../../api/kraken/API_AddOrder');
const CTRL_OpenOrders = require('./CTRL_OpenOrders');
const API_OpenOrders = require('../../api/kraken/API_OpenOrders');
const DB_OpenOrders = require('../../persistence/private/DB_OpenOrders');
const async = require('async');
const moment = require('moment/moment');


module.exports = {
   addOrder: function() {

        async.waterfall([
            STEP_DB_getOpenOrders,
            STEP_DB_getBalance,
            STEP_DB_getKeltner,
            STEP_ALGO_PrepareOrder,
            STEP_DB_dropOpenOrders,
            STEP_API_addOrder,
            STEP_API_getOpenOrders,
            STEP_DB_insertOpenOrders,
            STEP_finish
        ], function finish(err, result) {
            // Nothing to do here
        });


        function STEP_ALGO_PrepareOrder() {
            const order =
                {
                    pair: 'EOSEUR',
                    type:  'sell',
                    ordertype: 'stop-loss',
                    price:  2.3,
                    volume:  120.62767,
                    starttm:  0,
                    expiretm: 0
                };
            STEP_API_addOrder(order);
        }

       function STEP_DB_dropOpenOrders() {
           DB_OpenOrders.dropOpenOrders(STEP_ALGO_PrepareOrder);
       }

        function STEP_API_addOrder(order) {
            API_AddOrder.kraken_AddOrder(STEP_API_getOpenOrders, order);
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
        function STEP_finish(err, data) {
            if(err){
                var error = ''+err;
                console.log(error);
                console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - CONTROLER - > Process Add Order FAILED');
            }
        }
    }
};
