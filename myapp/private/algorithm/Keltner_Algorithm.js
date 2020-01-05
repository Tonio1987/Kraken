const moment = require('moment');
moment.locale('fr');

module.exports = {
    calculateKeltner: function(callback, pair, lastTicker, lastATR, interval, date, hour, timestamp) {
        new Promise(function (resolve, reject) {

            let keltner = {
                insert_date: date,
                insert_hour: hour,
                insert_timestamp: timestamp,
                pair: pair,
                interval: interval,
                ticker_ask_price: lastTicker[0].ask_price,
                true_range: lastATR[0].TR,
                last_ATR: lastATR[0].ATR,
                keltner_sup: lastTicker[0].ask_price + lastATR[0].ATR,
                keltner_inf: lastTicker[0].ask_price - lastATR[0].ATR,
                keltner_sup_1_5x: lastTicker[0].ask_price + (lastATR[0].ATR*1.5),
                keltner_inf_1_5x: lastTicker[0].ask_price - (lastATR[0].ATR*1.5),
                keltner_sup_2x: lastTicker[0].ask_price + (lastATR[0].ATR*2),
                keltner_inf_2x: lastTicker[0].ask_price - (lastATR[0].ATR*2),
                keltner_sup_2_5x: lastTicker[0].ask_price + (lastATR[0].ATR*2.5),
                keltner_inf_2_5x: lastTicker[0].ask_price - (lastATR[0].ATR*2.5),
                keltner_sup_3x: lastTicker[0].ask_price + (lastATR[0].ATR*3),
                keltner_inf_3x: lastTicker[0].ask_price - (lastATR[0].ATR*3)
            };

            resolve(keltner);

        }).then(function(res){
            callback(null, res);
        }).catch(function(err) {
            callback(err, null);
        });
    }
};