const API_ClosedOrders = require('../api/kraken/API_ClosedOrders');
const DB_ClosedOrders = require('../persistence/DB_ClosedOrders');
const async = require('async');
const moment = require('moment');

module.exports = {
    LoadClosedOrders: function() {
        console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - ### CONTROLER ### - > Process Load Closed Orders STARTED');

        async.waterfall([
            STEP_API_getClosedOrders,
            STEP_DB_insertClosedOrders,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_API_getClosedOrders() {
            API_ClosedOrders.kraken_ClosedOrders(STEP_DB_insertClosedOrders);
        }
        function STEP_DB_insertClosedOrders(err, data) {
            if(!err){
                DB_ClosedOrders.upsertClosedOrders(data, STEP_finish);
            }else{
                STEP_finish(err);
            }
        }
        function STEP_finish(err, data) {
            if(!err){
                console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - ### CONTROLER ### - > Process Load Closed Orders SUCCESS');
            }else{
                console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - ### CONTROLER ### - > Process Load Closed Orders FAILED');
            }
        }

    }
};
