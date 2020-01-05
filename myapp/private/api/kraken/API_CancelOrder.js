const kraken = require('node-kraken-api');

const api = kraken({
    key: process.env.KRAKEN_KEY,
    secret: process.env.KRAKEN_SECRET,
    tier: '0'
});

function waitEndOfLoop(i, length){}

module.exports = {
    kraken_CancelOrder: function(callback, ordersToCancel, orders) {
        for(let i=0; i<ordersToCancel.length; i++){
            return new Promise(function (resolve, reject) {
                api.call('CancelOrder',
                    {
                        txid: ordersToCancel[i]
                    }, (err, data) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(data);
                    });
            }).then(function(data){
                if(i === ordersToCancel.length-1){
                    callback(null, data, ordersToCancel, orders);
                }else{
                    waitEndOfLoop(i, ordersToCancel.length);
                }
            }).catch(function(err) {
                callback(err, null);
            });
        }
    }
};
