var kraken = require('node-kraken-api');
var DB_Ticker = require('../../persistence/DB_Ticker');


const api = kraken({
    key: process.env.KRAKEN_KEY,
    secret: process.env.KRAKEN_SECRET,
    tier: '0'
});

module.exports = {
    kraken_Ticker: function(pair) {
        api.call('Ticker', { pair: pair, count: 1 },
            (err, data) => {
                if (err) {
                    console.error(err);
                } else{
                   DB_Ticker.insertTicker(data, pair);
                }
            });
    }
};
