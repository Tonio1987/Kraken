// LOG SYSTEM
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

const async = require('async');
const moment = require('moment');
const DB_AssetPairs = require('../../persistence/kraken/DB_AssetPairs');
const DB_MM = require('../../persistence/algorithm/mm_indicators/DB_MobileM');
const DB_MMCompare = require('../../persistence/algorithm/mm_indicators/DB_MobileMCompare');
const DB_MMIndicator = require('../../persistence/algorithm/mm_indicators/DB_MMIndicator');
const ALGO_MMIndicators = require('../../algorithm/MM_Indicator_Algorithm');

module.exports = {
    CalculateMMIndicators: function (callback, err_callback) {
        var date = moment().format('L');
        var hour = moment().format('LTS');
        var timestamp = new Date().getTime();
        async.waterfall([
            STEP_DB_getAllPairs,
            STEP_DB_getLastMMC,
            STEP_ALGO_MMIndicators,
            STEP_DB_insertMMIndicator,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getAllPairs() {
            DB_AssetPairs.getAllPairs(STEP_DB_getLastMMC);
        }

        function STEP_DB_getLastMMC(err, data) {
            if(!err) {
                for(let i=0; i<data.length; i++){
                    if (i+1 == data.length){
                        DB_MMCompare.getLastMMC(STEP_ALGO_MMIndicators, data[i].name, true);
                    }else{
                        DB_MMCompare.getLastMMC(STEP_ALGO_MMIndicators, data[i].name, false);
                    }
                }
            }else{
                STEP_finish(err);
            }
        }

        function STEP_ALGO_MMIndicators(err, MMC, pair, iter) {
            if(!err) {
                ALGO_MMIndicators.calculateMMIndicators(STEP_DB_insertMMIndicator, pair, MMC, date, hour, timestamp, iter);
            }else{
                STEP_finish(err);
            }
        }

        function STEP_DB_insertMMIndicator(err, MMIndicator, iter) {
            if(!err) {
                DB_MMIndicator.insertMMIndicators(STEP_finish, MMIndicator, iter);
            }else{
                STEP_finish(err);
            }
        }

        function STEP_finish(err, data, iter) {
            if (err) {
                logger.error(err);
                logger.error('*** CONTROLLER *** ->  Process Calculate MM Indicators ... [ FAILED ]');
                err_callback(err);
            }
            if(iter){
                logger.info('*** CONTROLLER *** ->  Process Calculate MM Indicators ... [ DONE ]');
                callback();
            }
        }
    }
};