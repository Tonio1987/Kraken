const DB_CronTasks = require('../persistence/DB_CronTasks');
const async = require('async');

module.exports = {
    getCronTasks: function(callback, req, res, next) {
        async.waterfall([
            STEP_DB_getCronTasks,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getCronTasks(err, data) {
            DB_CronTasks.getCronTasks(STEP_finish);
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
