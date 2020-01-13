const DB_AssetPairs = require('../../persistence/kraken/DB_AssetPairs');
const DB_OHLC = require('../../persistence/kraken/DB_OHLC');
const API_OHLC = require('../../api/kraken/API_OHLC');
const async = require('async');
const moment = require('moment/moment');


module.exports = {
    /*
        CONTROLLER DESCRIPTION
        1 - We take in DB all actives pairs
        2 - We count the number of docs in collection OHLC -> For init first data loading
        3 - For all pairs
            3.1 - We load OHLC via Kraken API
            3.2 - We insert in DB the OHLC
    */
    LoadOHLC_1h: function () {
        let insert_date = moment().format('L');
        let insert_hour = moment().format('LTS');
        let timestamp = new Date().getTime();
        async.waterfall([
            STEP_DB_getAllPairs,
            STEP_DB_countOHLC,
            STEP_API_loadOHLC,
            STEP_DB_insertOHLC,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getAllPairs() {
            DB_AssetPairs.getAllPairs(STEP_DB_countOHLC);
        }

        function STEP_DB_countOHLC(err, allPairs) {
            DB_OHLC.countOHLC(STEP_API_loadOHLC, "1_HOUR" , allPairs);
        }

        function STEP_API_loadOHLC(err, count, allPairs) {
            if(!err){
                allPairs.forEach(function(pair){
                    API_OHLC.kraken_OHLC_1h(STEP_DB_insertOHLC, pair.name, count);
                });
            }else{
                STEP_finish(err);
            }
        }
        function STEP_DB_insertOHLC(err, data, pair, count) {
            if(!err){
                DB_OHLC.insertOHLC(STEP_finish, data, pair, "1_HOUR", count, insert_date, insert_hour, timestamp);
            }else{
                console.log('Erreur with pair : '+pair);
                STEP_finish(err);
            }
        }
        function STEP_finish(err, data) {
            if(err){
                console.log(err);
                console.log('\x1b[31m', moment().format('L') + ' - ' + moment().format('LTS') + ' - CONTROLER - > Process Load OHLC 1 HOUR FAILED', '\x1b[0m');
            }
        }
    },
    LoadOHLC_1d: function () {
        let insert_date = moment().format('L');
        let insert_hour = moment().format('LTS');
        let timestamp = new Date().getTime();
        async.waterfall([
            STEP_DB_getAllPairs,
            STEP_DB_countOHLC,
            STEP_API_loadOHLC,
            STEP_DB_insertOHLC,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getAllPairs() {
            DB_AssetPairs.getAllPairs(STEP_DB_countOHLC);
        }

        function STEP_DB_countOHLC(err, allPairs) {
            DB_OHLC.countOHLC(STEP_API_loadOHLC, "1_DAY", allPairs);
        }

        function STEP_API_loadOHLC(err, count, allPairs) {
            if (!err) {
                allPairs.forEach(function (pair) {
                    API_OHLC.kraken_OHLC_1d(STEP_DB_insertOHLC, pair.name, count);
                });
            } else {
                STEP_finish(err);
            }
        }

        function STEP_DB_insertOHLC(err, data, pair, count) {
            if (!err) {
                DB_OHLC.insertOHLC(STEP_finish, data, pair, "1_DAY", count, insert_date, insert_hour, timestamp);
            } else {
                console.log('Erreur with pair : ' + pair);
                STEP_finish(err);
            }
        }

        function STEP_finish(err, data) {
            if (err) {
                console.log(err);
                console.log('\x1b[31m', moment().format('L') + ' - ' + moment().format('LTS') + ' - CONTROLER - > Process Load OHLC 1 DAY FAILED', '\x1b[0m');
            }
        }
    }
};