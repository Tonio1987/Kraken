var kraken = require('node-kraken-api');
var DB_ClosedOrders = require('../../persistence/DB_ClosedOrders');

const api = kraken({
    key: process.env.KRAKEN_KEY,
    secret: process.env.KRAKEN_SECRET,
    tier: '0'
});

module.exports = {
    kraken_ClosedOrders: function() {
        api.call('ClosedOrders', (err, data) => {
            if (err) {
                console.error(err);
            } else{
                DB_ClosedOrders.upsertClosedOrders(data);
            }
        });
    }
};
