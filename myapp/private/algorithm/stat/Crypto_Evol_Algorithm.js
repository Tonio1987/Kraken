const moment = require('moment');
moment.locale('fr');

module.exports = {
    calculateCryptoEvol: function(callback, date, hour, timestamp, pair, Ticker_1, Ticker_15, Ticker_30, Ticker_60, Ticker_180, param_fw1) {
        new Promise(function (resolve, reject) {

            let evol_15 = ((Ticker_1.ask_price - Ticker_15.ask_price) /  Ticker_15.ask_price)*100;
            let evol_30 = ((Ticker_1.ask_price - Ticker_30.ask_price) /  Ticker_30.ask_price)*100;
            let evol_60 = ((Ticker_1.ask_price - Ticker_60.ask_price) /  Ticker_60.ask_price)*100;
            let evol_180 = ((Ticker_1.ask_price - Ticker_180.ask_price) /  Ticker_180.ask_price)*100;

            let cryptoEvol = {
                insert_date: date,
                insert_hour: hour,
                insert_timestamp: timestamp,
                pair: pair,
                evol_15: evol_15,
                evol_30: evol_30,
                evol_60: evol_60,
                evol_180: evol_180
            };
            resolve(cryptoEvol);

        }).then(function(res){
            callback(null, res, param_fw1);
        }).catch(function(err) {
            callback(err, null);
        });
    }
};
