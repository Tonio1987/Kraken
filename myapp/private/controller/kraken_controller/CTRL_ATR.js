const DB_AssetPairs = require('../../persistence/kraken/DB_AssetPairs');
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
            STEP_DB_load_LastATR1H,
            STEP_DB_insertATR,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getAllPairs() {
            DB_AssetPairs.getAllPairs(STEP_DB_countATR);
        }

        function STEP_DB_countATR(err, allPairs) {
            DB_ATR.countATR(STEP_DB_loadLast14OHLC, "1_HOUR" , allPairs);
        }

        function STEP_DB_loadLast14OHLC(err, count, allPairs) {
            if(!err){
                for(let i=0; i<allPairs.length; i++) {
                    if (i + 1 == allPairs.length) {
                        DB_OHLC.getLast14OHLC_1h(STEP_DB_load_LastATR1H, allPairs[i].name, count, true);
                    } else{
                        DB_OHLC.getLast14OHLC_1h(STEP_DB_load_LastATR1H, allPairs[i].name, count, false);
                    }
                }
            }else{
                STEP_finish(err);
            }
        }

        function STEP_DB_load_LastATR1H(err, ohlcs, pair, count, iter) {
            if(!err){
                DB_ATR.getLastATR_1h(STEP_DB_insertATR, pair, ohlcs, count, iter)
            }else{
                STEP_finish(err);
            }
        }

        function STEP_DB_insertATR(err, atr, pair, ohlcs, count, iter) {
            if(!err){
                DB_ATR.insertATR(STEP_finish, ohlcs, atr, pair, "1_HOUR", count, insert_date, insert_hour, timestamp, iter);
            }else{
                console.log('Erreur with pair : '+pair);
                STEP_finish(err);
            }
        }

        function STEP_finish(err, data, pair, iter) {
            if(err){
                console.log(err);
                console.log('\x1b[31m', moment().format('L') + ' - ' + moment().format('LTS') + ' - CONTROLER - > Process Load ATR 1 HOUR FAILED', '\x1b[0m');
            }

            if(iter){

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
            STEP_DB_load_LastATR1D,
            STEP_DB_insertATR,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getAllPairs() {
            DB_AssetPairs.getAllPairs(STEP_DB_countATR);
        }

        function STEP_DB_countATR(err, allPairs) {
            DB_ATR.countATR(STEP_DB_loadLast14OHLC, "1_DAY", allPairs);
        }

        function STEP_DB_loadLast14OHLC(err, count, allPairs) {
            if (!err) {
                for(let i=0; i<allPairs.length; i++){
                    if (i+1 == allPairs.length){
                        DB_OHLC.getLast14OHLC_1d(STEP_DB_load_LastATR1H, allPairs[i].name, count, true);
                    }else{
                        DB_OHLC.getLast14OHLC_1d(STEP_DB_load_LastATR1H, allPairs[i].name, count, false);
                    }

                }
            } else {
                STEP_finish(err);
            }
        }

        function STEP_DB_load_LastATR1D(err, ohlcs, pair, count, iter) {
            if(!err){
                DB_ATR.getLastATR_1d(STEP_DB_insertATR, pair, ohlcs, count, iter)
            }else{
                STEP_finish(err);
            }
        }

        function STEP_DB_insertATR(err, atr, pair, ohlcs, count, iter) {
            if (!err) {
                DB_ATR.insertATR(STEP_finish, ohlcs, atr, pair, "1_DAY", count, insert_date, insert_hour, timestamp, iter);
            } else {
                console.log('Erreur with pair : ' + pair);
                STEP_finish(err);
            }
        }

        function STEP_finish(err, data, pair, iter) {
            if (err) {
                console.log(err);
                console.log('\x1b[31m', moment().format('L') + ' - ' + moment().format('LTS') + ' - CONTROLER - > Process Load ATR 1 DAY FAILED', '\x1b[0m');
            }

            if(iter){

            }
        }
    }
};