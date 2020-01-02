const API_Balance = require('../../api/kraken/API_Balance');
const DB_Balance = require('../../persistence/private/DB_Balance');
const DB_Ticker = require('../../persistence/private/DB_Ticker');
const DB_Pairs = require('../../persistence/private/DB_Pairs');
const async = require('async');
const moment = require('moment');

module.exports = {
    LoadBalance: function() {
        var date = moment().format('L');
        var hour = moment().format('LTS');
        var timestamp = new Date().getTime();

        async.waterfall([
            STEP_API_getBalance,
            STEP_DB_getPair,
            STEP_DB_getLastTicker,
            STEP_DB_getLastBalance,
            STEP_DB_insertBalance,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_API_getBalance() {
            API_Balance.kraken_Balance(STEP_DB_getPair);
        }

        function STEP_DB_getPair(err, data) {
            if(!err){
                for (var i in data) {
                    if (data.hasOwnProperty(i)) {
                        DB_Pairs.getPair(STEP_DB_getLastTicker, i, data[i]);
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
                DB_Balance.getLastBalance(STEP_DB_insertBalance, data, currency, nb_units);
            }else{
                STEP_finish(err);
            }
        }

        function STEP_DB_insertBalance(err, lastBalance, ticker, currency, nb_units) {
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
                console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - CONTROLER - > Process Load Balance FAILED');
            }
        }
    }
};
