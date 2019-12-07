const kraken = require('node-kraken-api');
const moment = require('moment');

moment.locale('fr');

const api = kraken({
    key: process.env.KRAKEN_KEY,
    secret: process.env.KRAKEN_SECRET,
    tier: '0'
});

module.exports = {
    kraken_Time: function(callback) {
        return new Promise(function (resolve, reject) {
            api.call('Time', (err, data) => {
                if (err) {
                    console.error(err);
                    reject(true);
                }
                console.log(moment().format('L') +' - '+ moment().format('LTS') + ' - ### API ### - > Kraken server Up ! - Time server : '+data.rfc1123);
                resolve(data);
            });
        }).then(function(res){
            callback(null, res);
        }).catch(function(err) {
            callback(err, null);
        });
    }
};
