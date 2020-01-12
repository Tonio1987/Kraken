const DB_MMCompare = require('../../persistence/analyse/DB_MMCompare');
const async = require('async');

module.exports = {
    getLastMMCompare: function (callback, req, res, next) {
        async.waterfall([
            STEP_DB_getLasMMCompare,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getLasMMCompare() {
            DB_MMCompare.getLastMMCompare(STEP_finish, req.body.pair);
        }

        function STEP_finish(err, MMCompareData) {
            if (err) {
                console.log(err);
                callback(err, MMCompareData, req, res, next);
            } else {
                callback(err, MMCompareData, req, res, next);
            }
        }
    }
};