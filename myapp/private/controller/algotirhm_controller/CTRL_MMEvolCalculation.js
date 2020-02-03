// LOG SYSTEM
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

const async = require('async');
const moment = require('moment');
const DB_AssetPairs = require('../../persistence/algorithm/mm_evol/DB_AssetPairs');
const DB_MM = require('../../persistence/algorithm/mm_evol/DB_MobileM');
const DB_MMEvol = require('../../persistence/algorithm/mm_evol/DB_MobileMEvolution');
const ALGO_MMEvol = require('../../algorithm/MMEvol_Algorithm');

module.exports = {
    CalculateMMEvol: function (callback, step) {
        var date = moment().format('L');
        var hour = moment().format('LTS');
        var timestamp = new Date().getTime();
        async.waterfall([
            STEP_DB_getAllPairs,
            STEP_DB_getLast1440MM,
            STEP_ALGO_calculateMMEvol,
            STEP_DB_insertMMEvol,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getAllPairs() {
            DB_AssetPairs.getAllPairs(STEP_DB_getLast1440MM);
        }

        function STEP_DB_getLast1440MM(err, data) {
            if(!err) {
                for(let i=0; i<data.length; i++){
                    if (i+1 == data.length){
                        DB_MM.getLast1440MM(STEP_ALGO_calculateMMEvol, data[i].name, true);
                    }else{
                        DB_MM.getLast1440MM(STEP_ALGO_calculateMMEvol, data[i].name, false);
                    }
                }
            }else{
                STEP_finish(err);
            }
        }

        function STEP_ALGO_calculateMMEvol(err, data, iter) {
            if(!err) {
                ALGO_MMEvol.calculateMMEvol(STEP_DB_insertMMEvol, data, date, hour, timestamp, iter);
            }else{
                STEP_finish(err);
            }
        }

        function STEP_DB_insertMMEvol(err, data, iter) {
            if(!err) {
                DB_MMEvol.insertMMEvolution(STEP_finish, data, iter);
            }else{
                STEP_finish(err);
            }
        }

        function STEP_finish(err, data, iter) {
            if (err) {
                logger.error(err);
                logger.error('*** CONTROLLER *** ->  Process Calculate MM Evolution ... [ FAILED ]');
            }
            if(iter){
                logger.info('*** CONTROLLER *** ->  Process Calculate MM Evolution ... [ DONE ]');
                callback(err, step);
            }
        }
    }
};