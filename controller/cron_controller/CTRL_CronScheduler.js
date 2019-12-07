const async = require('async');
const moment = require('moment');

const CRON_scheduler = require('../../cron/CRON_scheduler');
const DB_CronTask = require('../../persistence/DB_CronTask');

module.exports = {
    Init_CronScheduler: function () {
        console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - ### CONTROLER ### - > Process Init Cron Tasks STARTED');

        async.waterfall([
            STEP_DB_getCronTasks,
            STEP_CRON_initTasksScheduler,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getCronTasks() {
            DB_CronTask.getCronTasks(STEP_CRON_initTasksScheduler);
        }

        function STEP_CRON_initTasksScheduler(err, tasks) {
            if(!err){
                CRON_scheduler.initTasksScheduler(tasks, STEP_finish);
            }else{
                STEP_finish(err, null);
            }
        }

        function STEP_finish(err, data) {
            if (err) {
                console.log(err);
                console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - ### CONTROLER ### - > Process Load Cron Tasks FAILED');
            }
        }
    },
    Reload_CronScheduler: function () {
        console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - ### CONTROLER ### - > Process Reload Cron Tasks STARTED');

        async.waterfall([
            STEP_DB_getCronTasks,
            STEP_CRON_reloadTasksScheduler,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getCronTasks() {
            DB_CronTask.getCronTasks(STEP_CRON_reloadTasksScheduler);
        }

        function STEP_CRON_reloadTasksScheduler(err, tasks) {
            if(!err){
                CRON_scheduler.reloadTasksScheduler(tasks, STEP_finish);
            }else{
                STEP_finish(err, null);
            }
        }

        function STEP_finish(err, data) {
            if (err) {
                console.log(err);
                console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - ### CONTROLER ### - > Process Load Cron Tasks FAILED');
            }
        }
    }
};