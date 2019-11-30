var kraken = require('node-kraken-api');
var persistence = require('../../persistence/DB_Ticker');

const api = kraken({
    key: process.env.KRAKEN_KEY,
    secret: process.env.KRAKEN_SECRET,
    tier: '0'
});

module.exports = {
    kraken_AssetPairs: function(pair) {
        api.call('AssetPairs', { pair: pair, count: 1 },
        (err, data) => {
            if (err) {
                console.error(err);
            } else{
                console.log(data)
                // persistence.insertAssetPairs(data);
            }
        });
    }
};
