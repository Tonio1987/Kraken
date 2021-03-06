const DB_AssetPairs = require('../../persistence/analyse/DB_AssetPairs');
const async = require('async');

module.exports = {
    getPairsList: function(callback, req, res, next) {

        async.waterfall([
            STEP_DB_getPairsList,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getPairsList(err, data) {
            DB_AssetPairs.getAllPairs(STEP_finish);
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
