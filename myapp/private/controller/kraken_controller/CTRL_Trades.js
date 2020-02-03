// LOG SYSTEM
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

const DB_AssetPairs = require('../../persistence/kraken/DB_AssetPairs');
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
            DB_AssetPairs.getAllPairs(STEP_API_loadTrades);
        }
        function STEP_API_loadTrades(err, allPairs) {
            if(!err){
                for(let i=0; i<allPairs.length; i++){
                    if (i+1 == allPairs.length){
                        API_Trades.kraken_Trades(STEP_DB_insertTrades, allPairs[i].name, true);
                    }else{
                        API_Trades.kraken_Trades(STEP_DB_insertTrades, allPairs[i].name, false);
                    }
                }
            }else{
                STEP_finish(err);
            }
        }
        function STEP_DB_insertTrades(err, data, pair, iter) {
            if(!err){
                DB_Trades.insertTrades(STEP_finish, data, pair, insert_date, insert_hour, timestamp, iter);
            }else{
                console.log('Erreur with pair : '+pair);
                STEP_finish(err);
            }
        }
        function STEP_finish(err, data, iter) {
            if(err){
                logger.error(err);
                logger.error('*** CONTROLLER *** ->  Process Load Trades... [ FAILED ]');
            }
            if(iter){
                logger.info('*** CONTROLLER *** ->  Process Load Trades ... [ DONE ]');
            }
        }
    }
};