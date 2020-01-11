const DB_ClosedOrders = require('../../persistence/home/DB_ClosedOrders');
const async = require('async');

module.exports = {
    getLast5ClosedOrders: function(callback, req, res, next) {

        async.waterfall([
            STEP_DB_getLast5ClosedOrders,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getLast5ClosedOrders(err, data) {
            DB_ClosedOrders.getLast5ClosedOrders(STEP_finish);
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
