// LOG SYSTEM
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

const DB_AssetPairs = require('../../persistence/statistics/DB_AssetPairs');
const DB_Ticker = require('../../persistence/statistics/DB_Ticker');
const DB_Stat_Crypto_Evol = require('../../persistence/statistics/DB_Stat_Crypto_Evol');
const ALGO_crypto_evol = require('../../algorithm/stat/Crypto_Evol_Algorithm');
const async = require('async');
const moment = require('moment');


module.exports = {

   calculateStats: function () {
        let insert_date = moment().format('L');
        let insert_hour = moment().format('LTS');
        let timestamp = new Date().getTime();
        let ts_1Min_inf = moment(new Date()).add(-2, 'minute').valueOf();
        let ts_1Min_sup = moment(new Date()).add(-1, 'minute').valueOf();
        let ts_15Min_inf = moment(new Date()).add(-16, 'minute').valueOf();
        let ts_15Min_sup = moment(new Date()).add(-15, 'minute').valueOf();
        let ts_30Min_inf = moment(new Date()).add(-31, 'minute').valueOf();
        let ts_30Min_sup = moment(new Date()).add(-30, 'minute').valueOf();
        let ts_60Min_inf = moment(new Date()).add(-61, 'minute').valueOf();
        let ts_60Min_sup = moment(new Date()).add(-60, 'minute').valueOf();
        let ts_180Min_inf = moment(new Date()).add(-181, 'minute').valueOf();
        let ts_180Min_sup = moment(new Date()).add(-180, 'minute').valueOf();

        async.waterfall([
            STEP_DB_getAllPairs,
            STEP_DB_loadTicker_1,
            STEP_DB_loadTicker_15,
            STEP_DB_loadTicker_30,
            STEP_DB_loadTicker_60,
            STEP_DB_loadTicker_180,
            STEP_ALGO_crypto_evol,
            STEP_DB_insert_stat,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getAllPairs() {
            DB_AssetPairs.getEurPair(STEP_API_loadTicker);
        }

        function STEP_DB_loadTicker_1(err, allPairs) {
            if(!err){
                for(let i=0; i<allPairs.length; i++){
                    if (i+1 == allPairs.length){
                        DB_Ticker.getTicker(STEP_DB_loadTicker_15, allPairs[i].pair, ts_1Min_inf, ts_1Min_sup, true)
                    }else{
                        DB_Ticker.getTicker(STEP_DB_loadTicker_15, allPairs[i].pair, ts_1Min_inf, ts_1Min_sup, false)
                    }
                }
            }else{
                STEP_finish(err);
            }
        }

        function STEP_DB_loadTicker_15(err, Ticker_1, pair, iter) {
            if (!err) {
                DB_Ticker.getTicker(STEP_DB_loadTicker_30, pair, ts_15Min_inf, ts_15Min_sup, Ticker_1, iter)
            }else{
                STEP_finish(err, null, iter)
            }
        }
        function STEP_DB_loadTicker_30(err, Ticker_15, pair, Ticker_1, iter) {
            if(!err){
                DB_Ticker.getTicker(STEP_DB_loadTicker_60, pair, ts_30Min_inf, ts_30Min_sup, Ticker_1, Ticker_15, iter)
            }else{
                STEP_finish(err, null, iter)
            }
        }
        function STEP_DB_loadTicker_60(err, Ticker_30, pair, Ticker_1, Ticker_15, iter) {
            if(!err){
                DB_Ticker.getTicker(STEP_DB_loadTicker_180, pair, ts_60Min_inf, ts_60Min_sup, Ticker_1, Ticker_15, Ticker_30, iter)
            }else{
                STEP_finish(err, null, iter)
            }
        }
        function STEP_DB_loadTicker_180(err, Ticker_60, pair, Ticker_1, Ticker_15, Ticker_30, iter) {
            if(!err){
                DB_Ticker.getTicker(STEP_ALGO_crypto_evol, pair, ts_180Min_inf, ts_180Min_sup, Ticker_1, Ticker_15, Ticker_30, Ticker_60, iter)
            }else{
                STEP_finish(err, null, iter)
            }
        }

        function STEP_ALGO_crypto_evol(err, Ticker_180, pair, Ticker_1, Ticker_15, Ticker_30, Ticker_60, iter){
            if(!err){
                ALGO_crypto_evol.calculateCryptoEvol(STEP_DB_insert_stat, date, hour, timestamp, pair, Ticker_1, Ticker_15, Ticker_30, Ticker_60, Ticker_180, iter);
            }else{
                STEP_finish(err, null, iter)
            }
        }

        function STEP_DB_insert_stat(err, stat, iter){
            if(!err){
                DB_Stat_Crypto_Evol.insert_Stat_Evol_Ticker(STEP_finish, stat, iter);
            }else{
                STEP_finish(err, null, iter)
            }
        }

        function STEP_finish(err, data, iter) {
            if(err){
                logger.error(err);
                logger.error('*** CONTROLLER *** -> Process Calculate Crypto Stat.. [ FAILED ]');
            }
            if(iter){
                logger.info('*** CONTROLLER *** -> Process Calculate Crypto Stat ... [ DONE ]');
            }
        }
    }
};