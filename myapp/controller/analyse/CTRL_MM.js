const DB_MM = require('../../persistence/analyse/DB_MM');
const async = require('async');

module.exports = {
    getLastMM: function (callback, req, res, next) {
        async.waterfall([
            STEP_DB_getLasMM,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getLasMM() {
            DB_MM.getLastMM(STEP_finish, req.body.pair);
        }

        function STEP_finish(err, MMData) {
            if (err) {
                console.log(err);
                callback(err, MMData, req, res, next);
            } else {
                callback(err, MMData, req, res, next);
            }
        }
    }
};