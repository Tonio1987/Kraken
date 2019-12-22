const DB_TradeBalance = require('../persistence/DB_TradeBalance');
const async = require('async');

module.exports = {
    getTradeBalance: function(callback, req, res, next) {

        async.waterfall([
            STEP_DB_getLastTradeBalance,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getLastTradeBalance(err, data) {
            DB_TradeBalance.getLastTradeBalance(STEP_finish);
        }

        function STEP_finish(err, data) {
            if(err){
                console.log(err);
                callback(err, data, req, res, next);
            }else{
                callback(err, data, req, res, next);
            }
        }
    },
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
