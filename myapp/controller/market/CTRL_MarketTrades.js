const DB_MarketTrades = require('../../persistence/market/DB_MarketTrades');
const async = require('async');

module.exports = {
    getLastMarketTrades: function(callback, req, res, next) {
        async.waterfall([
            STEP_DB_getMarketTrades,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getMarketTrades() {
            DB_MarketTrades.getMarketTrades(STEP_finish, req.body.pair);
        }

        function STEP_finish(err, marketInfo) {
            if(err){
                console.log(err);
                callback(err, marketInfo, req, res, next);
            }else{
                callback(err, marketInfo, req, res, next);
            }
        }
    }
};
