const DB_Balance = require('../persistence/DB_Balance');
const DB_Keltner = require('../persistence/DB_Keltner');
const async = require('async');

module.exports = {
    getBalance: function(callback, req, res, next) {

        async.waterfall([
            STEP_DB_getBalanceMaxInsertTimestamp,
            STEP_DB_getLastBalance,
            STEP_DB_getBalanceChanges,
            STEP_DB_getKeltnerMaxInsertTimestamp,,
            STEP_DB_getLastKeltner,
            STEP_ALGO_CalculateCurrencyEvolution,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getBalanceMaxInsertTimestamp(err, data) {
            DB_Balance.getMaxInsertBalanceTimestamp(STEP_DB_getLastBalance);
        }

        function STEP_DB_getLastBalance(err, data) {
            if(err){
                STEP_finish(err, null);
            }else{
                DB_Balance.getLastBalance(STEP_DB_getBalanceChanges, data);
            }
        }

        function STEP_DB_getBalanceChanges(err, data) {
            if(err){
                STEP_finish(err, null);
            }else{
                DB_Balance.getBalanceChanges(STEP_DB_getKeltnerMaxInsertTimestamp, data);
            }
        }

        function STEP_DB_getKeltnerMaxInsertTimestamp(err, balanceChanges, lastBalance) {
            if(err){
                STEP_finish(err, null);
            }else{
                DB_Keltner.getMaxInsertTimestamp(STEP_DB_getLastKeltner, balanceChanges, lastBalance);
            }
        }

        function STEP_DB_getLastKeltner(err, data, balanceChanges, lastBalance) {
            if(err){
                STEP_finish(err, null);
            }else{
                DB_Keltner.getLastKeltner(STEP_ALGO_CalculateCurrencyEvolution, data, balanceChanges, lastBalance);
            }
        }

        function STEP_ALGO_CalculateCurrencyEvolution(err, keltners, balanceChanges, lastBalance) {
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
                        for(elem2 in keltners){
                            if(keltners.hasOwnProperty(elem2)){
                                let pair = lastBalance[elem].currency+'EUR';
                                let pairx = lastBalance[elem].currency+'ZEUR';
                                let atr = 0;
                                let volat = 0;
                                if (pair === keltners[elem2].pair || pairx === keltners[elem2].pair) {
                                    atr = keltners[elem2].last_ATR;
                                    keltner_inf = lastBalance[elem].price - atr;
                                    keltner_inf_2x = lastBalance[elem].price - (2*atr);
                                    keltner_inf_3x = lastBalance[elem].price - (3*atr);
                                    myBalance[elem].atr = atr;
                                    myBalance[elem].hyp_sell_price = keltner_inf;
                                    myBalance[elem].hyp_sell_price2x = keltner_inf_2x;
                                    myBalance[elem].hyp_sell_price3x = keltner_inf_3x;
                                }
                            }
                        }
                    }
                }
                for(elem in myBalance){
                    if(myBalance.hasOwnProperty(elem)){
                        for(elem2 in balanceChanges) {
                            if (balanceChanges.hasOwnProperty(elem2)) {
                                let evolution = 0;
                                let buy_price = 0;
                                if (myBalance[elem].currency === balanceChanges[elem2].currency) {
                                    evolution = ((myBalance[elem].eur_value - balanceChanges[elem2].eur_value) / balanceChanges[elem2].eur_value) * 100;
                                    buy_price = balanceChanges[elem2].price;
                                    myBalance[elem].evolution = evolution;
                                    myBalance[elem].buy_price = buy_price;

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
