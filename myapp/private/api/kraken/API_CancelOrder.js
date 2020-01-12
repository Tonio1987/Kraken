const kraken = require('node-kraken-api');
const moment = require('moment');
const api = kraken({
    key: process.env.KRAKEN_KEY,
    secret: process.env.KRAKEN_SECRET,
    tier: '0'
});

function waitEndOfLoop(i, length){}

module.exports = {
    kraken_CancelOrder: function(callback, ordersToCancel, preparedOrders) {
        for(let i=0; i<ordersToCancel.length; i++){
            console.log('\x1b[33m', moment().format('L') + ' - ' + moment().format('LTS') + ' - > --- API --- CANCEL ORDER : '+ordersToCancel[i], '\x1b[0m');
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
                    callback(null, data, preparedOrders);
                }else{
                    waitEndOfLoop(i, ordersToCancel.length);
                }
            }).catch(function(err) {
                callback(err, null);
            });
        }
    }
};
