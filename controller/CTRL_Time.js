var API_Time = require('../api/kraken/API_Time');

module.exports = {
    LoadTime: function() {
        API_Time.kraken_Time();
    }
};
