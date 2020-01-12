const async = require('async');
const moment = require('moment');
const DB_Pairs = require('../../persistence/algorithm/mm/DB_Pairs');
const DB_Ticker = require('../../persistence/algorithm/mm/DB_Ticker');
const DB_MM = require('../../persistence/algorithm/mm/DB_MobileM');
const ALGO_MM = require('../../algorithm/MM_Algorithm');

module.exports = {
    CalculateMM: function () {
        var date = moment().format('L');
        var hour = moment().format('LTS');
        var timestamp = new Date().getTime();

        async.waterfall([
            STEP_DB_getAllPairs,
            STEP_DB_getTickerByPair,
            STEP_ALGO_calculateNN,
            STEP_DB_insertMM,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getAllPairs() {
            DB_Pairs.getAllPairs(STEP_DB_getTickerByPair);
        }

        function STEP_DB_getTickerByPair(err, data) {
            if(!err) {
                data.forEach(function (pair) {
                    DB_Ticker.getLast1440Ticker(STEP_ALGO_calculateNN, pair.kraken_pair_name);
                });
            }else{
                STEP_finish(err);
            }
        }

        function STEP_ALGO_calculateNN(err, data) {
            if(!err) {
                ALGO_MM.calculateMM(STEP_DB_insertMM, data, date, hour, timestamp);
            }else{
                STEP_finish(err);
            }
        }

        function STEP_DB_insertMM(err, data) {
            if(!err) {
                DB_MM.insertMM(STEP_finish, data);
            }else{
                STEP_finish(null, data);
            }
        }

        function STEP_finish(err, data) {
            if (err) {
                console.log(err);
                console.log('\x1b[31m', moment().format('L') + ' - ' + moment().format('LTS') + ' - ### CONTROLER ### - > Process Calculate MM FAILED', '\x1b[0m');
            }
        }
    }
};