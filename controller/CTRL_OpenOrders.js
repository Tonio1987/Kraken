var API_OpenOrders = require('../api/kraken/API_OpenOrders');

module.exports = {
    LoadOpenOrders: function() {
        API_OpenOrders.kraken_OpenOrders();
    }
};
