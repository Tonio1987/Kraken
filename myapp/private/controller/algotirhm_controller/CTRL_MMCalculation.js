const async = require('async');
const moment = require('moment/moment');
const DB_Pairs = require('../../persistence/DB_Pairs');
const DB_Ticker = require('../../persistence/DB_Ticker');
const DB_MM = require('../../persistence/DB_MobileM');
const ALGO_MM = require('../../algorithm/MM_Algorithm');

module.exports = {
    CalculateMM: function () {
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
                    DB_Ticker.getLast1440Ticker(pair.kraken_pair_name, STEP_ALGO_calculateNN);
                });
            }else{
                STEP_finish(err);
            }
        }

        function STEP_ALGO_calculateNN(err, data) {
            if(!err) {
                ALGO_MM.calculateMM(data, STEP_DB_insertMM);
            }else{
                STEP_finish(err);
            }
        }

        function STEP_DB_insertMM(err, data) {
            if(!err) {
                DB_MM.insertMM(data, STEP_finish);
            }else{
                STEP_finish(null, data);
            }
        }

        function STEP_finish(err, data) {
            if (err) {
                console.log(err);
                console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - ### CONTROLER ### - > Process Calculate MM FAILED');
            }
        }
    }
};