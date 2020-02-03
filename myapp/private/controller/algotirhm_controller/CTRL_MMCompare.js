// LOG SYSTEM
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

const async = require('async');
const moment = require('moment');
const DB_AssetPairs = require('../../persistence/kraken/DB_AssetPairs');
const DB_MM = require('../../persistence/algorithm/mm_compare/DB_MobileM');
const DB_MMCompare = require('../../persistence/algorithm/mm_compare/DB_MobileMCompare');
const ALGO_MMCompare = require('../../algorithm/MM_Compare_Algorithm');

module.exports = {
    CalculateMMCompare: function (callback, step) {
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
            DB_AssetPairs.getAllPairs(STEP_DB_getLast1440MM);
        }

        function STEP_DB_getLast1440MM(err, data) {
            if(!err) {
                for(let i=0; i<data.length; i++){
                    if (i+1 == data.length){
                        DB_MM.getLast1440MM(STEP_ALGO_compareMM,  data[i].name, true);
                    }else{
                        DB_MM.getLast1440MM(STEP_ALGO_compareMM,  data[i].name, false);
                    }
                }
            }else{
                STEP_finish(err);
            }
        }

        function STEP_ALGO_compareMM(err, MM, iter) {
            if(!err) {
                ALGO_MMCompare.calculateMMCompare(STEP_DB_insertMMCompare, MM, date, hour, timestamp, iter);
            }else{
                STEP_finish(err);
            }
        }


        function STEP_DB_insertMMCompare(err, MMC, iter) {
            if(!err) {
                DB_MMCompare.insertMMCompare(STEP_finish, MMC, iter);
            }else{
                STEP_finish(err);
            }
        }

        function STEP_finish(err, data, iter) {
            if (err) {
                logger.error(err);
                logger.error('*** CONTROLLER *** ->  Process Calculate MM Compare ... [ FAILED ]');
            }
            if(iter){
                logger.info('*** CONTROLLER *** ->  Process Calculate MM Compare ... [ DONE ]');
                callback(err, step);
            }
        }
    }
};