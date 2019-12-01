const API_TradesHistory = require('../api/kraken/API_TradesHistory');
const DB_TradeHistory = require('../persistence/DB_TradesHistory');
const async = require('async');
const moment = require('moment');

module.exports = {
    LoadTradesHistory: function() {

        console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - ### CONTROLER ### - > Process Load Trade History STARTED');

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
                DB_TradeHistory.upsertTradeHistory(data, STEP_finish);
            }else{
                STEP_finish(err);
            }
        }
        function STEP_finish(res) {
            if(res){
                console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - ### CONTROLER ### - > Process Load Trade History SUCCESS');
            }else{
                console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - ### CONTROLER ### - > Process Load Trade History FAILED');
            }
        }
    }
};
