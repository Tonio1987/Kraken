const async = require('async');
const moment = require('moment/moment');
const DB_Pairs = require('../../persistence/private/DB_Pairs');
const DB_MM = require('../../persistence/private/DB_MobileM');
const ALGO_MMEvol = require('../../algorithm/MMEvol_Algorithm');
const DB_MMEvol = require('../../persistence/private/DB_MobileMEvolution');

module.exports = {
    CalculateMMEvol: function () {
        var date = moment().format('L');
        var hour = moment().format('LTS');
        var timestamp = new Date().getTime();
        async.waterfall([
            STEP_DB_getAllPairs,
            STEP_DB_getLast1440MM,
            STEP_ALGO_calculateNNEvol,
            STEP_DB_insertMMEvol,
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
                    DB_MM.getLast1440MM(STEP_ALGO_calculateNNEvol, pair.kraken_pair_name);
                });
            }else{
                STEP_finish(err);
            }
        }

        function STEP_ALGO_calculateNNEvol(err, data) {
            if(!err) {
                ALGO_MMEvol.calculateMMEvol(STEP_DB_insertMMEvol, data, date, hour, timestamp);
            }else{
                STEP_finish(err);
            }
        }

        function STEP_DB_insertMMEvol(err, data) {
            if(!err) {
                DB_MMEvol.insertMMEvolution(STEP_finish, data);
            }else{
                STEP_finish(err);
            }
        }

        function STEP_finish(err, data) {
            if (err) {
                console.log(err);
                console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - ### CONTROLER ### - > Process Calculate MMEvol FAILED');
            }
        }
    }
};