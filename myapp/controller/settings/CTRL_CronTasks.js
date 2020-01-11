const DB_CronTasks = require('../../persistence/settings/DB_CronTasks');
const async = require('async');

module.exports = {
    getCronTasks: function(callback, req, res, next) {
        async.waterfall([
            STEP_DB_getCronTasks,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getCronTasks() {
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
    },
    changeCronTaskStatus: function(callback, req, res, next) {
        async.waterfall([
            STEP_DB_changeCronTaskStatus,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_changeCronTaskStatus() {
            DB_CronTasks.changeCronTaskStatus(STEP_finish, req.body.task_id, req.body.active_task);
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
