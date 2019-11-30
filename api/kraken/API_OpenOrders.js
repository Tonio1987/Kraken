var kraken = require('node-kraken-api');
var persistence = require('../../persistence/DB_OpenOrders');

const api = kraken({
    key: process.env.KRAKEN_KEY,
    secret: process.env.KRAKEN_SECRET,
    tier: '0'
});

module.exports = {
    kraken_OpenOrders: function() {
        api.call('OpenOrders', (err, data) => {
            if (err) {
                console.error(err);
            } else{
                persistence.upsertOpenOrders(data);
            }
        });
    }
};
