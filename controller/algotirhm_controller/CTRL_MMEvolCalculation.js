const async = require('async');
const moment = require('moment');
const DB_Pairs = require('../../persistence/DB_Pairs');
const DB_MM = require('../../persistence/DB_MobileM');
const ALGO_MMEvol = require('../../algorithm/MMEvol_Algorithm');
const DB_MMEvol = require('../../persistence/DB_MobileMEvolution');

module.exports = {
    CalculateMMEvol: function () {
        console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - ### CONTROLER ### - > Process Calculate MM and EvolMM STARTED');

        async.waterfall([
            STEP_DB_getAllPairs,
            STEP_DB_getLast120MM,
            STEP_ALGO_calculateNNEvol,
            STEP_DB_insertMMEvol,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getAllPairs() {
            DB_Pairs.getAllPairs(STEP_DB_getLast120MM);
        }

        function STEP_DB_getLast120MM(err, data) {
            if(!err) {
                data.forEach(function (pair) {
                    DB_MM.getLast120MM(pair.kraken_pair_name, STEP_ALGO_calculateNNEvol);
                });
            }else{
                STEP_finish(err);
            }
        }

        function STEP_ALGO_calculateNNEvol(err, data) {
            if(!err) {
                ALGO_MMEvol.calculateMMEvol(data, STEP_DB_insertMMEvol);
            }else{
                STEP_finish(err);
            }
        }

        function STEP_DB_insertMMEvol(err, data) {
            if(!err) {
                DB_MMEvol.insertMMEvolution(data, STEP_finish);
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