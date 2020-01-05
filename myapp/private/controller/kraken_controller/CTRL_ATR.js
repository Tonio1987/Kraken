const DB_Pairs = require('../../persistence/kraken/DB_Pairs');
const DB_ATR = require('../../persistence/kraken/DB_ATR');
const DB_OHLC = require('../../persistence/kraken/DB_OHLC');
const async = require('async');
const moment = require('moment/moment');

module.exports = {
    /*
        CONTROLLER DESCRIPTION
        1 - We take in DB all actives pairs
        2 - For all pairs
            2.1 - We load OHLC via Kraken API
            2.2 - We insert in DB the OHLC
    */
    LoadATR_1h: function () {
        let insert_date = moment().format('L');
        let insert_hour = moment().format('LTS');
        let timestamp = new Date().getTime();

        async.waterfall([
            STEP_DB_getAllPairs,
            STEP_DB_countATR,
            STEP_DB_loadLast14OHLC,
            STEP_DB_insertATR,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getAllPairs() {
            DB_Pairs.getAllPairs(STEP_DB_countATR);
        }

        function STEP_DB_countATR(err, allPairs) {
            DB_ATR.countATR(STEP_DB_loadLast14OHLC, "1_HOUR" , allPairs);
        }

        function STEP_DB_loadLast14OHLC(err, count, allPairs) {
            if(!err){
                allPairs.forEach(function(pair){
                    DB_OHLC.getLast14OHLC_1h(STEP_DB_insertATR, pair.kraken_pair_name, count);
                });
            }else{
                STEP_finish(err);
            }
        }

        function STEP_DB_insertATR(err, ohlcs, pair, count) {
            if(!err){
                DB_ATR.insertATR(STEP_finish, ohlcs, pair, "1_HOUR", count, insert_date, insert_hour, timestamp);
            }else{
                console.log('Erreur with pair : '+pair);
                STEP_finish(err);
            }
        }

        function STEP_finish(err, data, pair) {
            if(err){
                console.log(err);
                console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - CONTROLER - > Process Load ATR 1 HOUR FAILED');
            }
        }
    },
    LoadATR_1d: function () {
        let insert_date = moment().format('L');
        let insert_hour = moment().format('LTS');
        let timestamp = new Date().getTime();

        async.waterfall([
            STEP_DB_getAllPairs,
            STEP_DB_countATR,
            STEP_DB_loadLast14OHLC,
            STEP_DB_insertATR,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getAllPairs() {
            DB_Pairs.getAllPairs(STEP_DB_countATR);
        }

        function STEP_DB_countATR(err, allPairs) {
            DB_ATR.countATR(STEP_DB_loadLast14OHLC, "1_DAY", allPairs);
        }

        function STEP_DB_loadLast14OHLC(err, count, allPairs) {
            if (!err) {
                allPairs.forEach(function (pair) {
                    DB_OHLC.getLast14OHLC_1d(STEP_DB_insertATR, pair.kraken_pair_name, count);
                });
            } else {
                STEP_finish(err);
            }
        }

        function STEP_DB_insertATR(err, ohlcs, pair, count) {
            if (!err) {
                DB_ATR.insertATR(STEP_finish, ohlcs, pair, "1_DAY", count, insert_date, insert_hour, timestamp);
            } else {
                console.log('Erreur with pair : ' + pair);
                STEP_finish(err);
            }
        }

        function STEP_finish(err, data, pair) {
            if (err) {
                console.log(err);
                console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - CONTROLER - > Process Load ATR 1 DAY FAILED');
            }
        }
    }
};