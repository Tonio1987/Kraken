// LOG SYSTEM
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

const async = require('async');
const moment = require('moment');
const DB_AssetPairs = require('../../persistence/algorithm/keltner/DB_AssetPairs');
const DB_Ticker = require('../../persistence/algorithm/keltner/DB_Ticker');
const DB_Keltner = require('../../persistence/algorithm/keltner/DB_Keltner');
const DB_ATR = require('../../persistence/algorithm/keltner/DB_ATR');
const ALGO_Keltner = require('../../algorithm/Keltner_Algorithm');


module.exports = {
    CalculateKeltner_1h: function () {

        var date = moment().format('L');
        var hour = moment().format('LTS');
        var timestamp = new Date().getTime();

        async.waterfall([
            STEP_DB_getAllPairs,
            STEP_DB_getLastATR,
            STEP_DB_getLastTicker,
            STEP_ALGO_KeltnerCalculation,
            STEP_DB_insertKeltner,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getAllPairs() {
            DB_AssetPairs.getAllPairs(STEP_DB_getLastATR);
        }

        function STEP_DB_getLastATR(err, allPairs) {
            if (!err) {
                for(let i=0; i<allPairs.length; i++){
                    if (i+1 == allPairs.length){
                        DB_ATR.getLastATR_1h(STEP_DB_getLastTicker, allPairs[i].name, true);
                    }else{
                        DB_ATR.getLastATR_1h(STEP_DB_getLastTicker, allPairs[i].name, false);
                    }
                }
            } else {
                STEP_finish(err);
            }
        }

        function STEP_DB_getLastTicker(err, lastATR, pair, iter) {
            if (!err){
                DB_Ticker.getLastTicker(STEP_ALGO_KeltnerCalculation, pair, lastATR, iter);
            } else {
                STEP_finish(err);
            }
        }

        function STEP_ALGO_KeltnerCalculation(err, lastTicker, pair, lastATR, iter) {
            if (!err){
                ALGO_Keltner.calculateKeltner(STEP_DB_insertKeltner, pair, lastTicker, lastATR, "1_HOUR", date, hour, timestamp, iter);
            } else {
                STEP_finish(err);
            }
        }

        function STEP_DB_insertKeltner(err, keltner, iter) {
            if (!err) {
                DB_Keltner.insertKeltner(STEP_finish, keltner, iter);
            } else {
                STEP_finish(err);
            }
        }

        function STEP_finish(err, data, iter) {
            if (err) {
                logger.error(err);
                logger.error('*** CONTROLLER *** ->  Process Calculate Keltner 1H ... [ FAILED ]');
            }
            if(iter){
                logger.info('*** CONTROLLER *** ->  Process Calculate Keltner 1H ... [ DONE ]');
            }
        }
    },
    CalculateKeltner_1d: function () {

        var date = moment().format('L');
        var hour = moment().format('LTS');
        var timestamp = new Date().getTime();

        async.waterfall([
            STEP_DB_getAllPairs,
            STEP_DB_getLastATR,
            STEP_DB_getLastTicker,
            STEP_ALGO_KeltnerCalculation,
            STEP_DB_insertKeltner,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getAllPairs() {
            DB_AssetPairs.getAllPairs(STEP_DB_getLastATR);
        }

        function STEP_DB_getLastATR(err, allPairs) {
            if (!err) {
                for(let i=0; i<allPairs.length; i++){
                    if (i+1 == allPairs.length){
                        DB_ATR.getLastATR_1d(STEP_DB_getLastTicker, allPairs[i].name, true);
                    }else{
                        DB_ATR.getLastATR_1d(STEP_DB_getLastTicker, allPairs[i].name, false);
                    }
                }
            } else {
                STEP_finish(err);
            }
        }

        function STEP_DB_getLastTicker(err, lastATR, pair, iter) {
            if (!err){
                DB_Ticker.getLastTicker(STEP_ALGO_KeltnerCalculation, pair, lastATR, iter);
            } else {
                STEP_finish(err);
            }
        }

        function STEP_ALGO_KeltnerCalculation(err, lastTicker, pair, lastATR, iter) {
            if (!err){
                ALGO_Keltner.calculateKeltner(STEP_DB_insertKeltner, pair, lastTicker, lastATR, "1_DAY", date, hour, timestamp, iter);
            } else {
                STEP_finish(err);
            }
        }

        function STEP_DB_insertKeltner(err, keltner, iter) {
            if (!err) {
                DB_Keltner.insertKeltner(STEP_finish, keltner, iter);
            } else {
                STEP_finish(err);
            }
        }

        function STEP_finish(err, data, iter) {
            if (err) {
                logger.error(err);
                logger.error('*** CONTROLLER *** ->  Process Calculate Keltner 1D ... [ FAILED ]');
            }
            if(iter){
                logger.info('*** CONTROLLER *** ->  Process Calculate Keltner 1D ... [ DONE ]');
            }
        }
    }
};
