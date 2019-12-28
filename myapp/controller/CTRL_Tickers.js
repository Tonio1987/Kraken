const DB_Tickers = require('../persistence/DB_Tickers');
const async = require('async');

module.exports = {
    getLast24hTicker: function(callback, req, res, next) {

        async.waterfall([
            STEP_DB_getMaxInsertTimestamp,
            STEP_DB_getLastTickers,
            STEP_DB_get24hAgoTickers,
            STEP_ALGO_prepareMarketInfo,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getMaxInsertTimestamp() {
            DB_Tickers.getMaxInsertTimestamp(STEP_DB_getLastTickers);
        }

        function STEP_DB_getLastTickers(err, data) {
            DB_Tickers.getLastTicker(STEP_DB_get24hAgoTickers, data[0].insert_timestamp);
        }

        function STEP_DB_get24hAgoTickers(err, lastTicker) {
            DB_Tickers.get24hAgoTicker(STEP_ALGO_prepareMarketInfo, lastTicker);
        }

        function STEP_ALGO_prepareMarketInfo(err, ticker24hAgo, lastTicker) {
            let marketInfo = [];
            for (last in lastTicker){
                if(lastTicker.hasOwnProperty(last)){
                    for(old in ticker24hAgo){
                        if(ticker24hAgo.hasOwnProperty(old)){
                            if(lastTicker[last].pair == ticker24hAgo[old].pair){
                                let evolution = ((lastTicker[last].ask_price - ticker24hAgo[old].ask_price) / ticker24hAgo[old].ask_price)*100;
                                let pair = lastTicker[last].pair;
                                let cvl_currency = pair.substr(-3);
                                let ticker = {
                                    pair: lastTicker[last].pair,
                                    ask_price: lastTicker[last].ask_price,
                                    bid_price: lastTicker[last].bid_price,
                                    low24h: lastTicker[last].low_last_24,
                                    high24h: lastTicker[last].high_last_24,
                                    cvl_currency: cvl_currency,
                                    evol: evolution
                                }
                                marketInfo.push(ticker);
                            }
                        }
                    }
                }
            }
            STEP_finish(null, marketInfo);
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
