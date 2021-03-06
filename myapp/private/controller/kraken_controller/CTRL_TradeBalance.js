// LOG SYSTEM
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

const API_TradeBalance = require('../../api/kraken/API_TradeBalance');
const DB_TradeBalance = require('../../persistence/kraken/DB_TradeBalance');
const async = require('async');
const moment = require('moment');

module.exports = {
    LoadTradeBalance: function() {

        /*
            CONTROLLER DESCRIPTION
            1 - We load Trade Balance via Kraken API
            2 - We insert in DB the Trade Balance
        */

        async.waterfall([
            STEP_API_getTradeBalance,
            STEP_DB_insertTradeBalance,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_API_getTradeBalance() {
            API_TradeBalance.kraken_TradeBalance(STEP_DB_insertTradeBalance);
        }
        function STEP_DB_insertTradeBalance(err, data) {
            if(!err){
                DB_TradeBalance.insertTradeBalance(STEP_finish, data);
            }else{
                STEP_finish(err);
            }
        }
        function STEP_finish(err, data) {
            if(err){
                logger.error(err);
                logger.error('*** CONTROLLER *** ->  Process Load Trade Balance ... [ FAILED ]');
            }
            logger.info('*** CONTROLLER *** ->  Process Load Trade Balance ... [ DONE ]');
        }


    }
};
