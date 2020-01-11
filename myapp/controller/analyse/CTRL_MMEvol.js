const DB_MMEvol = require('../../persistence/analyse/DB_MMEvol');
const async = require('async');

module.exports = {
    getLastMMEvol: function (callback, req, res, next) {
        async.waterfall([
            STEP_DB_getLasMMEvol,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getLasMMEvol() {
            DB_MMEvol.getLastMMEvol(STEP_finish, req.body.pair);
        }

        function STEP_finish(err, MMEvolData) {
            if (err) {
                console.log(err);
                callback(err, MMEvolData, req, res, next);
            } else {
                callback(err, MMEvolData, req, res, next);
            }
        }
    }
};