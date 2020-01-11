const DB_TradeBalance = require('../../persistence/home/DB_TradeBalance');
const async = require('async');

module.exports = {
    getLastTradeBalances: function(callback, req, res, next) {
        async.waterfall([
            STEP_DB_getLastTradeBalanceq,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getLastTradeBalanceq(err, data) {
            DB_TradeBalance.getLastTradeBalances(STEP_finish);
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
