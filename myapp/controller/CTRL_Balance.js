const DB_Balance = require('../persistence/DB_Balance');
const async = require('async');

module.exports = {
    getBalance: function(callback, req, res, next) {

        async.waterfall([
            STEP_DB_getMaxInsertTimestamp,
            STEP_DB_getLastBalance,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getMaxInsertTimestamp(err, data) {
            DB_Balance.getMaxInsertBalanceTimestamp(STEP_DB_getLastBalance);
        }

        function STEP_DB_getLastBalance(err, data) {
            if(err){
                STEP_finish(err, null);
            }else{
                DB_Balance.getLastBalance(data, STEP_finish);
            }
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
