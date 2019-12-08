const API_OpenOrders = require('../../api/kraken/API_OpenOrders');
const DB_OpenOrders = require('../../persistence/DB_OpenOrders');
const async = require('async');
const moment = require('moment/moment');

module.exports = {
    LoadOpenOrders: function() {


        async.waterfall([
            STEP_DB_dropOpenOrders,
            STEP_API_getOpenOrders,
            STEP_DB_insertOpenOrders,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_dropOpenOrders() {
            DB_OpenOrders.dropOpenOrders(STEP_API_getOpenOrders);
        }
        function STEP_API_getOpenOrders(res) {
            if(res){
                API_OpenOrders.kraken_OpenOrders(STEP_DB_insertOpenOrders);
            }else{
                STEP_finish(res);
            }
        }
        function STEP_DB_insertOpenOrders(err, data) {
            if(!err){
                DB_OpenOrders.upsertOpenOrders(data, STEP_finish);
            }else{
                STEP_finish(err);
            }
        }
        function STEP_finish(err, data) {
            if(err){
                console.log(err);
                console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - ### CONTROLER ### - > Process Load Open Orders FAILED');
            }
        }
    }
};
