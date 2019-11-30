var API_TradeBalance = require('../api/kraken/API_TradeBalance');

module.exports = {
    LoadTradeBalance: function() {
        API_TradeBalance.kraken_TradeBalance();
    }
};
