const kraken = require('node-kraken-api');
const moment = require('moment');

const api = kraken({
    key: process.env.KRAKEN_KEY,
    secret: process.env.KRAKEN_SECRET,
    tier: '0'
});


function loop(i, ordersToCancel, preparedOrders, callback) {
    if (i < ordersToCancel.length){
        new Promise(function (resolve, reject) {
            console.log('\x1b[33m', moment().format('L') + ' - ' + moment().format('LTS') + ' - > --- API --- CANCEL ORDER : '+ordersToCancel[i], '\x1b[0m');
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
            i = i+1;
            if(i < ordersToCancel.length){
                loop.bind(null, i+1, ordersToCancel)
            }else{
                callback(null, preparedOrders);
            }
        }).catch(function(err) {
            callback(err, null);
        });
    }
}

module.exports = {
    kraken_CancelOrder: function(callback, ordersToCancel, preparedOrders) {
        let i = 0;
        loop(i, ordersToCancel, preparedOrders, callback);
    }
};
