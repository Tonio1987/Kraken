var kraken = require('node-kraken-api');
var persistence = require('../../persistence/DB_TradesHistory');

const api = kraken({
    key: process.env.KRAKEN_KEY,
    secret: process.env.KRAKEN_SECRET,
    tier: '0'
});

module.exports = {
    kraken_TradesHistory: function() {
        api.call('TradesHistory', (err, data) => {
            if (err) {
                console.error(err);
            } else{
                DB_TradesHistory.upsertTradeHistory(data);
            }
        });
    }
};
