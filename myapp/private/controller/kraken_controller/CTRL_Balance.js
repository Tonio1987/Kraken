const API_Balance = require('../../api/kraken/API_Balance');
const DB_Balance = require('../../persistence/kraken/DB_Balance');
const DB_Ticker = require('../../persistence/kraken/DB_Ticker');
const DB_Pairs = require('../../persistence/kraken/DB_Pairs');
const async = require('async');
const moment = require('moment');

module.exports = {
    LoadBalance: function() {
        /*
            CONTROLLER DESCRIPTION
            1 - We load Last Balance via Kraken API
            2 - For all currency in Last Balance,
                2.1 - We take in DB the XXXXEUR pair associated
                2.2 - We take in DB the ticker por all XXXXEUR pairs except for EUR itself and XXDG which have no EUR pair
                2.3 - We take in DB the last inserted balance for the pair
                2.4 - We insert in DB the new balance
         */

        var date = moment().format('L');
        var hour = moment().format('LTS');
        var timestamp = new Date().getTime();

        async.waterfall([
            STEP_API_getBalance,
            STEP_DB_getEurPair,
            STEP_DB_getLastTicker,
            STEP_DB_getLastBalance,
            STEP_DB_insertBalance,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_API_getBalance() {
            API_Balance.kraken_Balance(STEP_DB_getEurPair);
        }

        function STEP_DB_getEurPair(err, data) {
            if(!err){
                for (var i in data) {
                    if (data.hasOwnProperty(i)) {
                        DB_Pairs.getEurPair(STEP_DB_getLastTicker, i, data[i]);
                    }
                }
            }else {
                STEP_finish(err);
            }
        }

        function STEP_DB_getLastTicker(err, data, currency, nb_units) {
            if(!err){
                if(data.length > 0){
                    DB_Ticker.getLastTicker(STEP_DB_getLastBalance, data[0].kraken_pair_name, currency, nb_units)
                }else{
                    // Cas de l'EURO ou du DOGE
                    STEP_DB_getLastBalance(err, data, null, currency, nb_units);
                }
            }else{
                STEP_finish(err);
            }
        }

        function STEP_DB_getLastBalance(err, data, pair, currency, nb_units) {
            if(!err){
                DB_Balance.getLastBalanceElement(STEP_DB_insertBalance, currency, data, nb_units);
            }else{
                STEP_finish(err);
            }
        }

        function STEP_DB_insertBalance(err, lastBalance, currency, ticker, nb_units) {
            if(!err){
                if(ticker.length > 0){
                    DB_Balance.insertBalance(STEP_finish, lastBalance, ticker[0].bid_price, currency, nb_units, date, hour, timestamp);
                }else{
                    DB_Balance.insertBalance(STEP_finish, lastBalance, 0, currency, nb_units, date, hour, timestamp);
                }
            }else{
                STEP_finish(err);
            }
        }
        function STEP_finish(err, data) {
            if(err){
                console.log(err);
                console.log('\x1b[31m', moment().format('L') + ' - ' + moment().format('LTS') + ' - CONTROLER - > Process Load Balance FAILED', '\x1b[0m');
            }
        }
    }
};
