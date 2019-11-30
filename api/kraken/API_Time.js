var kraken = require('node-kraken-api');
var moment = require('moment');

moment.locale('fr');

const api = kraken({
    key: process.env.KRAKEN_KEY,
    secret: process.env.KRAKEN_SECRET,
    tier: '0'
});

module.exports = {
    kraken_Time: function() {
        api.call('Time', (err, data) => {
            if (err) {
                console.error(err);
            } else{
                console.log(moment().format('L') +' - '+ moment().format('LTS') + ' - ### - > Kraken server Up !');
                console.log(moment().format('L') +' - '+ moment().format('LTS') + ' - ### - > Time server : '+data.rfc1123);
            }
        });
    }
};
