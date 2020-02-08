// LOG SYSTEM
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

const API_Balance = require('../../api/kraken/API_Balance');
const DB_Balance = require('../../persistence/kraken/DB_Balance');
const DB_Ticker = require('../../persistence/kraken/DB_Ticker');
const DB_AssetPairs = require('../../persistence/kraken/DB_AssetPairs');
const NOTIFIER = require('../../notification/notify');
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
            STEP_API_Notify_Change,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_API_getBalance() {
            API_Balance.kraken_Balance(STEP_DB_getEurPair);
        }

        function STEP_DB_getEurPair(err, data) {
            if(!err){
                let j = 0;
                let k = 0;
                for (var i in data) {
                    j++;
                }
                for (var i in data) {
                    if (data.hasOwnProperty(i)) {
                        if (k === j-1){
                            DB_AssetPairs.getEurPair(STEP_DB_getLastTicker, i, data[i], true);
                        }else{
                            DB_AssetPairs.getEurPair(STEP_DB_getLastTicker, i, data[i], false);
                        }
                    }
                    k++;
                }
            }else {
                STEP_finish(err);
            }
        }

        function STEP_DB_getLastTicker(err, data, currency, nb_units, iter) {
            if(!err){
                if(data.length > 0){
                    DB_Ticker.getLastTicker(STEP_DB_getLastBalance, data[0].name, currency, nb_units, iter)
                }else{
                    // Cas de l'EURO ou du DOGE
                    STEP_DB_getLastBalance(err, data, null, currency, nb_units, iter);
                }
            }else{
                STEP_finish(err);
            }
        }

        function STEP_DB_getLastBalance(err, data, pair, currency, nb_units, iter) {
            if(!err){
                DB_Balance.getLastBalanceElement(STEP_DB_insertBalance, currency, data, nb_units, iter);
            }else{
                STEP_finish(err);
            }
        }

        function STEP_DB_insertBalance(err, lastBalance, currency, ticker, nb_units, iter) {
            if(!err){
                if(ticker.length > 0){
                    DB_Balance.insertBalance(STEP_API_Notify_Change, lastBalance, ticker[0].bid_price, currency, nb_units, date, hour, timestamp, iter);
                }else{
                    DB_Balance.insertBalance(STEP_API_Notify_Change, lastBalance, 0, currency, nb_units, date, hour, timestamp, iter);
                }
            }else{
                STEP_finish(err);
            }
        }

        function STEP_API_Notify_Change(err, data, change, iter){
            if(!err){
                if(change){
                    NOTIFIER.notify(STEP_finish, "Kraken - New Elements in Balance ! "+data.units+" "+data.currency+" - Price : "+data.price+" - EUR Value : "+data.eur_value, "Kraken - New Elements in Balance !", 'bugle', iter);
                }else{
                    STEP_finish(err, data, iter);
                }
            }else{
                STEP_finish(err);
            }
        }

        function STEP_finish(err, data, iter) {
            if(err){
                logger.error(err);
                logger.error('*** CONTROLLER *** ->  Process Load Balance ... [ FAILED ]');
            }
            if(iter){
                logger.info('*** CONTROLLER *** ->  Process Load Balance ... [ DONE ]');
            }
        }
    }
};
