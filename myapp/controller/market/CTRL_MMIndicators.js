
const DB_MMIndicators = require('../../persistence/market/DB_MMIndicators');
const async = require('async');

module.exports = {
    getMMIndicatorsByPair: function(callback, req, res, next) {
        async.waterfall([
            STEP_DB_getMMIndicators,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getMMIndicators() {
            DB_MMIndicators.getMMIndicatorsByPair(STEP_finish, req.body.pair);
        }

        function STEP_finish(err, MMIndicators) {
            if(err){
                console.log(err);
                callback(err, MMIndicators, req, res, next);
            }else{
                callback(err, MMIndicators, req, res, next);
            }
        }
    }
};
