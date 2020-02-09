
const DB_Stat_CryptoEvol = require('../../persistence/market/DB_Stat_CryptoEvol');
const async = require('async');

module.exports = {
    getStat_CryptoEvol: function(callback, req, res, next) {
        async.waterfall([
            STEP_DB_getStat_CryptoEvol_MaxInsertTimestamp,
            STEP_DB_getStat_CryptoEvol,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getStat_CryptoEvol_MaxInsertTimestamp() {
            DB_Stat_CryptoEvol.getMaxInsertTimestamp(STEP_DB_getStat_CryptoEvol);
        }

        function STEP_DB_getStat_CryptoEvol(err, data) {
            if(!err){
                DB_Stat_CryptoEvol.getLast_Stat_CryptoEvol(STEP_finish, data[0].insert_timestamp);
            }else{
                STEP_finish(err, null);
            }
        }

        function STEP_finish(err, Stat_CryptoEvol) {
            if(err){
                console.log(err);
                callback(err, Stat_CryptoEvol, req, res, next);
            }else{
                callback(err, Stat_CryptoEvol, req, res, next);
            }
        }
    }
};
