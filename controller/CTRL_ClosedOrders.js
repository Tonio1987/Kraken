var API_ClosedOrders = require('../api/kraken/API_ClosedOrders');

module.exports = {
    LoadClosedOrders: function() {
        API_ClosedOrders.kraken_ClosedOrders();
    }
};
