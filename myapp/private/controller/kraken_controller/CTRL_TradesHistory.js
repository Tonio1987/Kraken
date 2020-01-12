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
                console.log(err);
                console.log('\x1b[31m', moment().format('L') + ' - ' + moment().format('LTS') + ' - CONTROLER - > Process Load Trade History FAILED', '\x1b[0m');
            }
        }
    }
};
