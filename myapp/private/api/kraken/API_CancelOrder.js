var colors = require('colors/safe');
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
            console.log(colors.yellow(moment().format('L') + ' - ' + moment().format('LTS')), colors.cyan(' ***   API   ***'), colors.brightYellow(' - CANCEL ORDER : '+ordersToCancel[i]));
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
                var newfct = loop.bind(null, i, ordersToCancel, preparedOrders, callback)
                newfct();
            }else{
                callback(null, preparedOrders);
            }
        }).catch(function(err) {
            callback(err, null);
        });
    }else{
        callback(null, preparedOrders);
    }
}

module.exports = {
    kraken_CancelOrder: function(callback, ordersToCancel, preparedOrders) {
        let i = 0;
        loop(i, ordersToCancel, preparedOrders, callback);
    }
};
