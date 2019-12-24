const DB_OpenOrders = require('../persistence/DB_OpenOrders');
const async = require('async');

module.exports = {
    getOpenOrders: function(callback, req, res, next) {

        async.waterfall([
            STEP_DB_getOpenOrders,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getOpenOrders(err, data) {
            DB_OpenOrders.getOpenOrders(STEP_finish);
        }

        function STEP_finish(err, data) {
            if(err){
                console.log(err);
                callback(err, data, req, res, next);
            }else{
                callback(err, data, req, res, next);
            }
        }
    }
};
