var kraken = require('node-kraken-api');

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
                console.log(data);
            }
        });
    }
};
