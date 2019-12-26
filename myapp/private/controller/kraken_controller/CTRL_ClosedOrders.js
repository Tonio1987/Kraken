const API_ClosedOrders = require('../../api/kraken/API_ClosedOrders');
const DB_ClosedOrders = require('../../persistence/private/DB_ClosedOrders');
const async = require('async');
const moment = require('moment');

module.exports = {
    LoadClosedOrders: function() {

        async.waterfall([
            //STEP_DB_dropClosedOrders,
            STEP_API_getClosedOrders,
            STEP_DB_insertClosedOrders,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_dropClosedOrders() {
            DB_ClosedOrders.dropClosedOrders(STEP_API_getClosedOrders);
        }

        function STEP_API_getClosedOrders(err, res) {
            if(!err){
                API_ClosedOrders.kraken_ClosedOrders(STEP_DB_insertClosedOrders);
            }else{
                console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - CONTROLER - > Warning - First time Closed Order Loading');
                API_ClosedOrders.kraken_ClosedOrders(STEP_DB_insertClosedOrders);
            }
        }

        function STEP_DB_insertClosedOrders(err, data) {
            if(!err){
                DB_ClosedOrders.upsertClosedOrders(STEP_finish, data);
            }else{
                STEP_finish(err);
            }
        }
        function STEP_finish(err, data) {
            if(err){
                console.log(err);
                console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - CONTROLER - > Process Load Closed Orders FAILED');
            }
        }

    }
};
