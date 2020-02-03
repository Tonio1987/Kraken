// LOG SYSTEM
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

const DB_AssetPairs = require('../../persistence/kraken/DB_AssetPairs');
const DB_Ticker = require('../../persistence/kraken/DB_Ticker');
const API_Ticker = require('../../api/kraken/API_Ticker');
const async = require('async');
const moment = require('moment/moment');


module.exports = {

    /*
        CONTROLLER DESCRIPTION
        1 - We take in DB all actives pairs
        2 - For all pairs
            2.1 - We load Ticker via Kraken API
            2.2 - We insert in DB the Ticker
    */


    LoadTicker: function () {
        let insert_date = moment().format('L');
        let insert_hour = moment().format('LTS');
        let timestamp = new Date().getTime();
        async.waterfall([
            STEP_DB_getAllPairs,
            STEP_API_loadTicker,
            STEP_DB_insertTicker,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getAllPairs() {
            DB_AssetPairs.getAllPairs(STEP_API_loadTicker);
        }
        function STEP_API_loadTicker(err, allPairs) {
            if(!err){
                for(let i=0; i<allPairs.length; i++){
                    if (i+1 == allPairs.length){
                        API_Ticker.kraken_Ticker(STEP_DB_insertTicker, allPairs[i].name, true);
                    }else{
                        API_Ticker.kraken_Ticker(STEP_DB_insertTicker, allPairs[i].name, false);
                    }
                }
            }else{
                STEP_finish(err);
            }
        }
        function STEP_DB_insertTicker(err, data, pair, iter) {
            if(!err){
                DB_Ticker.insertTicker(STEP_finish, data, pair, insert_date, insert_hour, timestamp, iter);
            }else{
                console.log('Erreur with pair : '+pair);
                STEP_finish(err);
            }
        }
        function STEP_finish(err, data, iter) {
            if(err){
                logger.error(err);
                logger.error('*** CONTROLLER *** ->  Process Load Ticker... [ FAILED ]');
            }
            if(iter){
                logger.info('*** CONTROLLER *** ->  Process Load Ticker ... [ DONE ]');
            }
        }
    }
};