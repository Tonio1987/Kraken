const DB_History_TradeBalance = require('../../persistence/history/DB_History_TradeBalance');
const async = require('async');

module.exports = {
    getHistory_TradeBalances: function(callback, req, res, next) {
        async.waterfall([
            STEP_DB_getHistory_TradeBalance,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getHistory_TradeBalance(err, data) {
            DB_History_TradeBalance.getHistory_TradeBalances(STEP_finish);
        }

        function STEP_finish(err, data) {
            if(err){
                console.log(err);
                callback(err, data, req, res, next);
            }else{
                callback(err, data, req, res, next);
            }
        }
    }
};
