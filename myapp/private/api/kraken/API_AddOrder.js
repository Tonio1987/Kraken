const kraken = require('node-kraken-api');


const api = kraken({
    key: process.env.KRAKEN_KEY,
    secret: process.env.KRAKEN_SECRET,
    tier: '0'
});

function waitEndOfLoop(i, length){}

module.exports = {
    kraken_AddOrder: function(callback, orders) {
        for(let i=0; i<orders.length; i++){
            return new Promise(function (resolve, reject) {
                api.call('AddOrder',
                    {
                        pair: orders[order].pair,
                        type:  orders[order].type,
                        ordertype:  orders[order].ordertype,
                        price:  orders[order].price,
                        volume:  orders[order].volume,
                        starttm:  orders[order].starttm,
                        expiretm:  orders[order].expiretm
                    }, (err, data) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(data);
                    });
            }).then(function(data){
                console.log(data);
                if(i === orders.length-1){
                    callback(null, data);
                }else{
                    waitEndOfLoop(i, orders.length);
                }
            }).catch(function(err) {
                callback(err, null);
            });
        }
    }
};
