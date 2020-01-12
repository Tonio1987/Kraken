const DB_Pairs = require('../../persistence/kraken/DB_Pairs');
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
            DB_Pairs.getAllPairs(STEP_API_loadTicker);
        }
        function STEP_API_loadTicker(err, data) {
            if(!err){
                data.forEach(function(pair){
                    API_Ticker.kraken_Ticker(STEP_DB_insertTicker, pair.kraken_pair_name);
                });
            }else{
                STEP_finish(err);
            }
        }
        function STEP_DB_insertTicker(err, data, pair) {
            if(!err){
                DB_Ticker.insertTicker(STEP_finish, data, pair, insert_date, insert_hour, timestamp);
            }else{
                console.log('Erreur with pair : '+pair);
                STEP_finish(err);
            }
        }
        function STEP_finish(err, data) {
            if(err){
                console.log(err);
                console.log('\x1b[31m', moment().format('L') + ' - ' + moment().format('LTS') + ' - CONTROLER - > Process Load Ticker FAILED', '\x1b[0m');
            }
        }
    }
};