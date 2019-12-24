const kraken = require('node-kraken-api');

const api = kraken({
    key: process.env.KRAKEN_KEY,
    secret: process.env.KRAKEN_SECRET,
    tier: '0'
});

module.exports = {
    kraken_Depth: function(callback, pair) {
        return new Promise(function (resolve, reject) {
            api.call('Depth', { pair: pair, count: 1 }, (err, data) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                resolve(data);
            });
        }).then(function(data){
            callback(null, data);
        }).catch(function(err) {
            callback(err, null);
        });

    }
};
