const kraken = require('node-kraken-api');
const moment = require('moment');

const api = kraken({
    key: process.env.KRAKEN_KEY,
    secret: process.env.KRAKEN_SECRET,
    tier: '0'
});

function waitEndOfLoop(i, length){}

module.exports = {
    kraken_AddOrder: function(callback, orders) {
        for(let i=0; i<orders.length; i++){
            console.log('\x1b[32m', moment().format('L') + ' - ' + moment().format('LTS') + ' - > --- API --- ADD ORDER : '
                +orders[i].type+' '+orders[i].ordertype+' '+orders[i].volume+' '+orders[i].pair+' price : '+orders[i].price, '\x1b[0m');
            return new Promise(function (resolve, reject) {
                api.call('AddOrder',
                    {
                        pair: orders[i].pair,
                        type:  orders[i].type,
                        ordertype:  orders[i].ordertype,
                        price:  orders[i].price,
                        volume:  orders[i].volume,
                        starttm:  orders[i].starttm,
                        expiretm:  orders[i].expiretm
                    }, (err, data) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(data);
                    });
            }).then(function(data){
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
