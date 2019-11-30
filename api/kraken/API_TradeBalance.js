require('dotenv').config();
var kraken = require('node-kraken-api');
var persistence = require('../../persistence/DB_TradeBalance');


const api = kraken({
    key: process.env.KRAKEN_KEY,
    secret: process.env.KRAKEN_SECRET,
    tier: '0'
});

module.exports = {
    kraken_TradeBalance: function() {
        api.call('TradeBalance', {asset : 'ZEUR'}, (err, data) => {
            if (err) {
                console.error(err);
            } else{
                persistence.insertTradeBalance(data);
            }
        });
    }
};
