const DB_Tickers = require('../../persistence/market/DB_Tickers');
const DB_MMIndicators = require('../../persistence/market/DB_MMIndicators');
const async = require('async');

module.exports = {
    getLast24hTicker: function(callback, req, res, next) {
        async.waterfall([
            STEP_DB_getTickerMaxInsertTimestamp,
            STEP_DB_getLastTickers,
            STEP_DB_get24hAgoTickers,
            STEP_DB_getMMIndicatorsMaxInsertTimestamp,
            STEP_DB_getMMIndicators,
            STEP_ALGO_prepareMarketInfo,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getTickerMaxInsertTimestamp() {
            DB_Tickers.getMaxInsertTimestamp(STEP_DB_getLastTickers);
        }

        function STEP_DB_getLastTickers(err, data) {
            DB_Tickers.getLastTicker(STEP_DB_get24hAgoTickers, data[0].insert_timestamp);
        }

        function STEP_DB_get24hAgoTickers(err, lastTicker) {
            DB_Tickers.get24hAgoTicker(STEP_DB_getMMIndicatorsMaxInsertTimestamp, lastTicker);
        }

        function STEP_DB_getMMIndicatorsMaxInsertTimestamp(err, ticker24hAgo, lastTicker){
            DB_MMIndicators.getMaxInsertTimestamp(STEP_DB_getMMIndicators, ticker24hAgo, lastTicker);
        }

        function STEP_DB_getMMIndicators(err, data, ticker24hAgo, lastTicker){
            DB_MMIndicators.getLastMMIndicators(STEP_ALGO_prepareMarketInfo, data[0].insert_timestamp, ticker24hAgo, lastTicker);
        }

        function STEP_ALGO_prepareMarketInfo(err, MMIndicators, ticker24hAgo, lastTicker) {
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

            for (MMIndic in MMIndicators) {
                if (MMIndicators.hasOwnProperty(MMIndic)) {
                    for(ticker in marketInfo){
                        if (marketInfo.hasOwnProperty(ticker)) {
                            if(marketInfo[ticker].pair == MMIndicators[MMIndic].pair){
                                marketInfo[ticker].pair_mm_rating_global = (100*MMIndicators[MMIndic].pair_mm_rating_global).toFixed(2);
                                marketInfo[ticker].pair_mm_rating_ct = (100*MMIndicators[MMIndic].pair_mm_rating_ct).toFixed(2);
                                marketInfo[ticker].pair_mm_rating_mt = (100*MMIndicators[MMIndic].pair_mm_rating_mt).toFixed(2);
                                marketInfo[ticker].pair_mm_rating_lt = (100*MMIndicators[MMIndic].pair_mm_rating_lt).toFixed(2);
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
