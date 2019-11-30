var kraken = require('node-kraken-api');
var moment = require('moment');


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
                console.log(data);
            }
        });
    }
};
