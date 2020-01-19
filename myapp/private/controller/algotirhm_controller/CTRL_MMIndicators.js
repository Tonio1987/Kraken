const async = require('async');
const moment = require('moment');
const DB_AssetPairs = require('../../persistence/kraken/DB_AssetPairs');
const DB_MM = require('../../persistence/algorithm/mm_indicators/DB_MobileM');
const DB_MMCompare = require('../../persistence/algorithm/mm_indicators/DB_MobileMCompare');
const DB_MMIndicator = require('../../persistence/algorithm/mm_indicators/DB_MMIndicator');
const ALGO_MMIndicators = require('../../algorithm/MM_Indicator_Algorithm');

module.exports = {
    CalculateMMIndicators: function () {
        var date = moment().format('L');
        var hour = moment().format('LTS');
        var timestamp = new Date().getTime();
        async.waterfall([
            STEP_DB_getAllPairs,
            STEP_DB_getLastMM,
            STEP_DB_getLastMMC,
            STEP_ALGO_MMIndicators,
            STEP_DB_insertMMIndicator,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getAllPairs() {
            DB_AssetPairs.getAllPairs(STEP_DB_getLastMM);
        }

        function STEP_DB_getLastMM(err, data) {
            if(!err) {
                data.forEach(function (pair) {
                    DB_MM.getLastMM(STEP_DB_getLastMMC, pair.name);
                });
            }else{
                STEP_finish(err);
            }
        }

        function STEP_DB_getLastMMC(err, MM, pair) {
            if(!err) {
                DB_MMCompare.getLastMMC(STEP_ALGO_MMIndicators, pair, MM);
            }else{
                STEP_finish(err);
            }
        }


        function STEP_ALGO_MMIndicators(err, MMC, pair, MM) {
            if(!err) {
                ALGO_MMIndicators.calculateMMIndicators(STEP_DB_insertMMIndicator, pair, MM, MMC, date, hour, timestamp);
            }else{
                STEP_finish(err);
            }
        }

        function STEP_DB_insertMMIndicator(err, MMIndicator) {
            if(!err) {
                DB_MMIndicator.insertMMIndicators(STEP_finish, MMIndicator);
            }else{
                STEP_finish(err);
            }
        }

        function STEP_finish(err, data) {
            if (err) {
                console.log(err);
                console.log('\x1b[31m', moment().format('L') + ' - ' + moment().format('LTS') + ' - ### CONTROLER ### - > Process MM Indicator FAILED', '\x1b[0m');
            }
        }
    }
};