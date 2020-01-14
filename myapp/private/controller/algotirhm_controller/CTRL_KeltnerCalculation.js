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
                allPairs.forEach(function (pair) {
                    DB_ATR.getLastATR_1h(STEP_DB_getLastTicker, pair.name);
                });
            } else {
                STEP_finish(err);
            }
        }

        function STEP_DB_getLastTicker(err, lastATR, pair) {
            if (!err){
                DB_Ticker.getLastTicker(STEP_ALGO_KeltnerCalculation, pair, lastATR);
            } else {
                STEP_finish(err);
            }
        }

        function STEP_ALGO_KeltnerCalculation(err, lastTicker, pair, lastATR) {
            if (!err){
                ALGO_Keltner.calculateKeltner(STEP_DB_insertKeltner, pair, lastTicker, lastATR, "1_HOUR", date, hour, timestamp);
            } else {
                STEP_finish(err);
            }
        }

        function STEP_DB_insertKeltner(err, keltner) {
            if (!err) {
                DB_Keltner.insertKeltner(STEP_finish, keltner);
            } else {
                STEP_finish(err);
            }
        }

        function STEP_finish(err, data) {
            if (err) {
                console.log(err);
                console.log('\x1b[31m', moment().format('L') + ' - ' + moment().format('LTS') + ' - ### CONTROLER ### - > Process Calculate Keltner 1H FAILED', '\x1b[0m');
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
                allPairs.forEach(function (pair) {
                    DB_ATR.getLastATR_1d(STEP_DB_getLastTicker, pair._name);
                });
            } else {
                STEP_finish(err);
            }
        }

        function STEP_DB_getLastTicker(err, lastATR, pair) {
            if (!err){
                DB_Ticker.getLastTicker(STEP_ALGO_KeltnerCalculation, pair, lastATR);
            } else {
                STEP_finish(err);
            }
        }

        function STEP_ALGO_KeltnerCalculation(err, lastTicker, pair, lastATR) {
            if (!err){
                ALGO_Keltner.calculateKeltner(STEP_DB_insertKeltner, pair, lastTicker, lastATR, "1_DAY", date, hour, timestamp);
            } else {
                STEP_finish(err);
            }
        }

        function STEP_DB_insertKeltner(err, keltner) {
            if (!err) {
                DB_Keltner.insertKeltner(STEP_finish, keltner);
            } else {
                STEP_finish(err);
            }
        }

        function STEP_finish(err, data) {
            if (err) {
                console.log(err);
                console.log('\x1b[31m', moment().format('L') + ' - ' + moment().format('LTS') + ' - ### CONTROLER ### - > Process Calculate Keltner 1D FAILED', '\x1b[0m');
            }
        }
    }
};
