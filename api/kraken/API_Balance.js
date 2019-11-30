var kraken = require('node-kraken-api');
var DB_Balance = require('../../persistence/DB_Balance');

const api = kraken({
    key: process.env.KRAKEN_KEY,
    secret: process.env.KRAKEN_SECRET,
    tier: '0'
});

module.exports = {
    kraken_Balance: function() {
        api.call('Balance', (err, data) => {
            if (err) {
                console.error(err);
            } else{
                DB_Balance.insertBalance(data);
            }
        });
    }
};
