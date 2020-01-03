const kraken = require('node-kraken-api');

const api = kraken({
    key: process.env.KRAKEN_KEY,
    secret: process.env.KRAKEN_SECRET,
    tier: '0'
});

module.exports = {
    kraken_OHLC_1h: function(callback, pair, param_fw1) {
        return new Promise(function (resolve, reject) {
            api.call('OHLC', { pair: pair, interval: 60, count: 1 }, (err, data) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                resolve(data);
            });
        }).then(function(data){
            callback(null, data, pair, param_fw1);
        }).catch(function(err) {
            callback(err, null, null);
        });
    },
    kraken_OHLC_1d: function(callback, pair, param_fw1) {
        return new Promise(function (resolve, reject) {
            api.call('OHLC', { pair: pair, interval: 1440, count: 1 }, (err, data) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                resolve(data);
            });
        }).then(function(data){
            callback(null, data, pair, param_fw1);
        }).catch(function(err) {
            callback(err, null, null);
        });
    }
};
