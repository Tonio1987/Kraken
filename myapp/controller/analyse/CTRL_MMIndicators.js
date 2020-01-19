const DB_MMIndicators = require('../../persistence/analyse/DB_MMIndicators');
const async = require('async');

module.exports = {
    getLastMMIndicators: function (callback, req, res, next) {
        async.waterfall([
            STEP_DB_getLasMMIndicators,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getLasMMIndicators() {
            DB_MMIndicators.getLastMMIndicators(STEP_finish, req.body.pair);
        }

        function STEP_finish(err, MMIndicatorsData) {
            if (err) {
                console.log(err);
                callback(err, MMIndicatorsData, req, res, next);
            } else {
                callback(err, MMIndicatorsData, req, res, next);
            }
        }
    }
};