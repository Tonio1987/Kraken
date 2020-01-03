const moment = require('moment');
moment.locale('fr');

module.exports = {
    calculateKeltner: function(callback, lastTicker, last24, highest, lowest, lastKeltner, date, hour, timestamp) {
        new Promise(function (resolve, reject) {
            var high_minus_low = highest[0].ask_price-lowest[0].ask_price;
            var high_minus_l24 = Math.abs(highest[0].ask_price-last24[0].ask_price);
            var low_minus_l24 = Math.abs(lowest[0].ask_price-last24[0].ask_price);
            var true_range = 0;
            var last_atr = 0;

            // Calcul du True range
            if(high_minus_low > high_minus_l24 && high_minus_low > low_minus_l24){
                true_range = high_minus_low
            }else if( high_minus_l24 > low_minus_l24){
                true_range = high_minus_l24;
            }else{
                true_range = low_minus_l24;
            }

            // Calcul du Average Trade Range
            if(lastKeltner){
                last_atr = ((lastKeltner[0].last_ATR * 13) + true_range) / 14;
            }else{
                last_atr = lowest[0].ask_price * 0.02;
            }

            let keltner = {
                insert_date: date,
                insert_hour: hour,
                insert_timestamp: timestamp,
                pair: last24[0].pair,
                high_minus_low: high_minus_low,
                high_minus_l24: high_minus_l24,
                low_minus_l24: low_minus_l24,
                true_range: true_range,
                last_ATR: last_atr,
                lastTicker: lastTicker[0].ask_price,
                last24: last24[0].ask_price,
                highest: highest[0].ask_price,
                lowest: lowest[0].ask_price,
                keltner_sup: lastTicker[0].ask_price + last_atr,
                keltner_inf: lastTicker[0].ask_price - last_atr,
                keltner_sup_1_5x: lastTicker[0].ask_price + (last_atr*1.5),
                keltner_inf_1_5x: lastTicker[0].ask_price - (last_atr*1.5),
                keltner_sup_2x: lastTicker[0].ask_price + (last_atr*2),
                keltner_inf_2x: lastTicker[0].ask_price - (last_atr*2),
                keltner_sup_2_5x: lastTicker[0].ask_price + (last_atr*2.5),
                keltner_inf_2_5x: lastTicker[0].ask_price - (last_atr*2.5),
                keltner_sup_3x: lastTicker[0].ask_price + (last_atr*3),
                keltner_inf_3x: lastTicker[0].ask_price - (last_atr*3)
            };

            resolve(keltner);

        }).then(function(res){
            callback(null, res);
        }).catch(function(err) {
            err = 'Error during Keltner calculation';
            callback(err, null);
        });
    }
};