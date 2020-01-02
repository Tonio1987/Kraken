const DB_Pairs = require('../../persistence/kraken/DB_Pairs');
const DB_Trades = require('../../persistence/kraken/DB_Trades');
const API_Trades = require('../../api/kraken/API_Trades');
const async = require('async');
const moment = require('moment');

module.exports = {
     /*
        CONTROLLER DESCRIPTION
        1 - We drop MarketTrades collection in DB
        2 - We tqke in DB all actives pairs
        3 - We load Trades via Kraken API
        4 - We insert in DB the Trades
     */

    LoadTrades: function () {
        let insert_date = moment().format('L');
        let insert_hour = moment().format('LTS');
        let timestamp = new Date().getTime();
        async.waterfall([
            STEP_DB_dropMarketTrades,
            STEP_DB_getAllPairs,
            STEP_API_loadTrades,
            STEP_DB_insertTrades,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });
        function STEP_DB_dropMarketTrades() {
            DB_Trades.dropMarketTrades(STEP_DB_getAllPairs);
        }
        function STEP_DB_getAllPairs() {
            DB_Pairs.getAllPairs(STEP_API_loadTrades);
        }
        function STEP_API_loadTrades(err, data) {
            if(!err){
                data.forEach(function(pair){
                    API_Trades.kraken_Trades(STEP_DB_insertTrades, pair.kraken_pair_name);
                });

            }else{
                STEP_finish(err);
            }
        }
        function STEP_DB_insertTrades(err, data, pair) {
            if(!err){
                DB_Trades.insertTrades(STEP_finish, data, pair, insert_date, insert_hour, timestamp);
            }else{
                console.log('Erreur with pair : '+pair);
                STEP_finish(err);
            }
        }
        function STEP_finish(err, data) {
            if(err){
                console.log(err);
                console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - CONTROLER - > Process Load Depth FAILED');
            }
        }
    }
};