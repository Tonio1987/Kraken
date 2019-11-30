var API_Balance = require('../api/kraken/API_Balance');

module.exports = {
    LoadBalance: function() {
        API_Balance.kraken_Balance();
    }
};
