const moment = require('moment');
moment.locale('fr');

module.exports = {
    calculateMMCompare: function(callback, MM, date, hour, timestamp) {
        new Promise(function (resolve, reject) {
            let count = 1;
            let mmCompare = {

            }
            resolve(mmCompare);
        }).then(function(res){
            callback(null, res);
        }).catch(function(err) {
            err = 'Error during MMCompare calculation';
            callback(err, null);
        });
    }
};
