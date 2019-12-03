const kraken = require('node-kraken-api');


const api = kraken({
    key: process.env.KRAKEN_KEY,
    secret: process.env.KRAKEN_SECRET,
    tier: '0'
});

module.exports = {
    kraken_AddOrder: function(order, callback) {
        return new Promise(function (resolve, reject) {
            api.call('AddOrder',
                {
                    pair: order.pair,
                    type:  order.type,
                    ordertype:  order.ordertype,
                    price:  order.price,
                    volume:  order.volume,
                    starttm:  order.starttm,
                    expiretm:  order.expiretm
                }, (err, data) => {
                    if (err) {
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
