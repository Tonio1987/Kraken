const async = require('async');
const moment = require('moment');
const DB_Pairs = require('../../persistence/algorithm/mm_compare/DB_Pairs');
const DB_MM = require('../../persistence/algorithm/mm_compare/DB_MobileM');
const DB_MMCompare = require('../../persistence/algorithm/mm_compare/DB_MobileMCompare');
const ALGO_MMCompare = require('../../algorithm/MM_Compare_Algorithm');

module.exports = {
    CalculateMMCompare: function () {
        var date = moment().format('L');
        var hour = moment().format('LTS');
        var timestamp = new Date().getTime();
        async.waterfall([
            STEP_DB_getAllPairs,
            STEP_DB_getLast1440MM,
            STEP_ALGO_compareMM,
            STEP_DB_insertMMCompare,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getAllPairs() {
            DB_Pairs.getAllPairs(STEP_DB_getLast1440MM);
        }

        function STEP_DB_getLast1440MM(err, data) {
            if(!err) {
                data.forEach(function (pair) {
                    DB_MM.getLast1440MM(STEP_ALGO_compareMM, pair.kraken_pair_name);
                });
            }else{
                STEP_finish(err);
            }
        }

        function STEP_ALGO_compareMM(err, MM) {
            if(!err) {
                ALGO_MMCompare.calculateMMCompare(STEP_DB_insertMMCompare, MM, date, hour, timestamp);
            }else{
                STEP_finish(err);
            }
        }


        function STEP_DB_insertMMCompare(err, MMC) {
            if(!err) {
                DB_MMCompare.insertMMCompare(STEP_finish, MMC);
            }else{
                STEP_finish(err);
            }
        }

        function STEP_finish(err, data) {
            if (err) {
                console.log(err);
                console.log('\x1b[31m', moment().format('L') + ' - ' + moment().format('LTS') + ' - ### CONTROLER ### - > Process MM Comparaison FAILED', '\x1b[0m');
            }
        }
    }
};