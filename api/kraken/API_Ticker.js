const kraken = require('node-kraken-api');

const api = kraken({
    key: process.env.KRAKEN_KEY,
    secret: process.env.KRAKEN_SECRET,
    tier: '0'
});

module.exports = {
    kraken_Ticker: function(pair, callback) {
        return new Promise(function (resolve, reject) {
            api.call('Ticker', { pair: pair, count: 1 }, (err, data) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                resolve(data);
            });
        }).then(function(data){
            callback(null, data, pair);
        }).catch(function(err) {
            callback(err, null, null);
        });

    }
};
