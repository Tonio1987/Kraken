// LOG SYSTEM
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

const API_TradesHistory = require('../../api/kraken/API_TradesHistory');
const DB_TradeHistory = require('../../persistence/kraken/DB_TradesHistory');
const async = require('async');
const moment = require('moment/moment');

module.exports = {
    /*
       CONTROLLER DESCRIPTION
       1 - We load Trades History via Kraken API
       2 - We insert in DB the Trades History
    */
    LoadTradesHistory: function() {

        async.waterfall([
            STEP_API_getTradeHistory,
            STEP_DB_insertTradeHistory,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_API_getTradeHistory() {
            API_TradesHistory.kraken_TradesHistory(STEP_DB_insertTradeHistory);
        }
        function STEP_DB_insertTradeHistory(err, data) {
            if(!err){
                DB_TradeHistory.upsertTradeHistory(STEP_finish, data);
            }else{
                STEP_finish(err);
            }
        }
        function STEP_finish(err, data) {
            if(err){
                logger.error(err);
                logger.error('*** CONTROLLER *** ->  Process Load Trade History ... [ FAILED ]');
            }
            logger.info('*** CONTROLLER *** ->  Process Load Trade History ... [ DONE ]');
        }
    }
};
