// LOG SYSTEM
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

const API_ClosedOrders = require('../../api/kraken/API_ClosedOrders');
const DB_ClosedOrders = require('../../persistence/kraken/DB_ClosedOrders');
const async = require('async');
const moment = require('moment');

module.exports = {
    LoadClosedOrders: function() {
        /*
            CONTROLLER DESCRIPTION
            1 - We load Closed Orders via Kraken API
            2 - We insert in DB the Closed Orders
         */

        async.waterfall([
            STEP_DB_dropClosedOrders,
            STEP_API_getClosedOrders,
            STEP_DB_insertClosedOrders,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_dropClosedOrders() {
            DB_ClosedOrders.dropClosedOrders(STEP_API_getClosedOrders);
        }

        function STEP_API_getClosedOrders() {
            API_ClosedOrders.kraken_ClosedOrders(STEP_DB_insertClosedOrders);
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
                logger.error(err);
                logger.error('*** CONTROLLER *** ->  Process Load Closed Orders ... [ FAILED ]');
            }
            logger.info('*** CONTROLLER *** ->  Process Load Closed Orders ... [ DONE ]');

        }

    }
};
