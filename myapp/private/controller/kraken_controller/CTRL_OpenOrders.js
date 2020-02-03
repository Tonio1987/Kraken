// LOG SYSTEM
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

const API_OpenOrders = require('../../api/kraken/API_OpenOrders');
const DB_OpenOrders = require('../../persistence/kraken/DB_OpenOrders');
const async = require('async');
const moment = require('moment');

module.exports = {
    LoadOpenOrders: function() {
        /*
            CONTROLLER DESCRIPTION
            1 - We drop Open Orders collection in DB
            2 - We load Open Orders via Kraken API
            3 - We insert in DB the Open Orders
         */

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
                DB_OpenOrders.upsertOpenOrders(STEP_finish, data);
            }else{
                STEP_finish(err);
            }
        }
        function STEP_finish(err, data) {
            if(err){
                logger.error(err);
                logger.error('*** CONTROLLER *** ->  Process Load Open Orders ... [ FAILED ]');
            }
            logger.info('*** CONTROLLER *** ->  Process Load Open Orders ... [ DONE ]');
        }
    }
};
