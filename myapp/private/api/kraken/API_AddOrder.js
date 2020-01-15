const kraken = require('node-kraken-api');
const moment = require('moment');

const api = kraken({
    key: process.env.KRAKEN_KEY,
    secret: process.env.KRAKEN_SECRET,
    tier: '0'
});

function loop(i, orders, callback) {
    if (i < orders.length){
        new Promise(function (resolve, reject) {
            console.log('\x1b[32m', moment().format('L') + ' - ' + moment().format('LTS') + ' - > --- API --- ADD ORDER : '+orders[i].type+' '+orders[i].ordertype+' '+orders[i].volume+' '+orders[i].pair+' price : '+orders[i].price, '\x1b[0m');
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
            i = i+1;
            if(i < orders.length){
                loop.bind(null, i+1, orders)
            }else{
                callback(null, data);
            }
        }).catch(function(err) {
            callback(err, null);
        });
    }
}

module.exports = {
    kraken_AddOrder: function(callback, orders) {
        let i =0;
        loop(i, orders, callback);
    }
};
