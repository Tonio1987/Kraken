var API_TradesHistory = require('../api/kraken/API_TradesHistory');

module.exports = {
    LoadTradesHistory: function() {
        API_TradesHistory.kraken_TradesHistory();
    }
};
