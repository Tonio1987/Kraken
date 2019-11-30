var kraken = require('node-kraken-api');
var moment = require('moment');
var persistence = require('../../persistence/DB_TradesHistory');

moment.locale('fr');

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
                persistence.upsertTradeHistory(data);
            }
        });
    }
};
