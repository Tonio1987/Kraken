const async = require('async');
const moment = require('moment/moment');
const DB_Pairs = require('../../persistence/private/DB_Pairs');
const DB_Ticker = require('../../persistence/private/DB_Ticker');
const DB_Keltner = require('../../persistence/private/DB_Keltner');
const ALGO_Keltner = require('../../algorithm/Keltner_Algorithm');

let last24 = '';
let highest = '';
let lowest = '';

module.exports = {
    CalculateKeltner: function () {
        async.waterfall([
            STEP_DB_getAllPairs,
            STEP_DB_getPRevious24hTicker,
            STEP_DB_getPRevious24hHighestTicker,
            STEP_DB_getPRevious24hLowestTicker,
            STEP_DB_getLastKeltner,
            STEP_DB_getLastTicker,
            STEP_ALGO_KeltnerCalculation,
            STEP_DB_insertKeltner,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getAllPairs() {
            DB_Pairs.getAllPairs(STEP_DB_getPRevious24hTicker);
        }

        function STEP_DB_getPRevious24hTicker(err, data) {
            if (!err) {
                data.forEach(function (pair) {
                    DB_Ticker.getPrevious24hTicker(STEP_DB_getPRevious24hHighestTicker, pair.kraken_pair_name);
                });
            } else {
                STEP_finish(err);
            }
        }

        function STEP_DB_getPRevious24hHighestTicker(err, last24) {
            if (!err) {
                DB_Ticker.getPRevious24hHighestTicker(STEP_DB_getPRevious24hLowestTicker, last24[0].pair, last24);
            } else {
                STEP_finish(err);
            }
        }

        function STEP_DB_getPRevious24hLowestTicker(err, highest, last24) {
            if (!err) {
                DB_Ticker.getPrevious24hLowestTicker(STEP_DB_getLastTicker, last24[0].pair, last24,  highest);
            } else {
                STEP_finish(err);
            }
        }

        function STEP_DB_getLastTicker(err, lowest, last24, highest) {
            if (!err) {
                DB_Ticker.getLastTicker(STEP_DB_getLastKeltner, last24[0].pair, last24,  highest, lowest);
            } else {
                STEP_finish(err);
            }
        }

        function STEP_DB_getLastKeltner(err, lastTicker, lowest, last24, highest) {
            if (!err) {
                DB_Keltner.getLastKeltner(STEP_ALGO_KeltnerCalculation, last24[0].pair, lastTicker, last24,  highest, lowest);
            } else {
                STEP_finish(err);
            }
        }

        function STEP_ALGO_KeltnerCalculation(err, lastKeltner, lastTicker, lowest, last24, highest) {
            if (!err && lastKeltner && lastKeltner.length > 0) {
                ALGO_Keltner.calculateKeltner(STEP_DB_insertKeltner, lastTicker, last24, highest, lowest, lastKeltner);
            } else {
                ALGO_Keltner.calculateKeltner(STEP_DB_insertKeltner, lastTicker, last24, highest, lowest, null);
                console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - ### CONTROLER ### - > Process Calculate Keltner - WARNING - FIRST EXECUTION');
            }
        }

        function STEP_DB_insertKeltner(err, data) {
            if (!err) {
                DB_Keltner.insertKEltner(STEP_finish, data);
            } else {
                STEP_finish(null, data);
            }
        }

        function STEP_finish(err, data) {
            if (err) {
                console.log(err);
                console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - ### CONTROLER ### - > Process Calculate Keltner FAILED');
            }
        }
    }
};
