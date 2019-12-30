const DB_Balance = require('../persistence/DB_Balance');
const async = require('async');

module.exports = {
    getBalance: function(callback, req, res, next) {

        async.waterfall([
            STEP_DB_getMaxInsertTimestamp,
            STEP_DB_getLastBalance,
            STEP_DB_get24hAgoBalance,
            STEP_ALGO_CalculateCurrencyEvolution,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getMaxInsertTimestamp(err, data) {
            DB_Balance.getMaxInsertBalanceTimestamp(STEP_DB_getLastBalance);
        }

        function STEP_DB_getLastBalance(err, data) {
            if(err){
                STEP_finish(err, null);
            }else{
                DB_Balance.getLastBalance(STEP_DB_get24hAgoBalance, data);
            }
        }

        function STEP_DB_get24hAgoBalance(err, data) {
            if(err){
                STEP_finish(err, null);
            }else{
                DB_Balance.get24hAgoBalance(STEP_ALGO_CalculateCurrencyEvolution, data);
            }
        }

        function STEP_ALGO_CalculateCurrencyEvolution(err, oneDayAgoBalance, lastBalance) {
            if(err){
                STEP_finish(err, null);
            }else{
                var myBalance = [];
                for(elem in lastBalance){
                    if(lastBalance.hasOwnProperty(elem)){
                        let elementOfMyBalance = {
                            currency : lastBalance[elem].currency,
                            units: lastBalance[elem].units,
                            price: lastBalance[elem].price,
                            eur_value: lastBalance[elem].eur_value
                        }
                        myBalance.push(elementOfMyBalance);
                    }
                }
                for(elem in myBalance){
                    if(myBalance.hasOwnProperty(elem)){
                        for(elem2 in oneDayAgoBalance) {
                            if (oneDayAgoBalance.hasOwnProperty(elem2)) {
                                let evolution = 0;
                                if (myBalance[elem].currency === oneDayAgoBalance[elem2].currency) {
                                    evolution = ((myBalance[elem].eur_value - oneDayAgoBalance[elem2].eur_value) / oneDayAgoBalance[elem2].eur_value) * 100;
                                    myBalance[elem].evolution = evolution;
                                }
                            }
                        }
                    }
                }
                STEP_finish(null, myBalance)
            }
        }

        function STEP_finish(err, data) {
            if(err){
                console.log(err);
                callback(err, data, req, res, next);
            }else{
                callback(err, data, req, res, next);
            }
        }
    }
};
