const DB_Triggers = require('../persistence/DB_Triggers');
const async = require('async');

module.exports = {
    getTriggersMMEvol: function(callback, req, res, next) {
        async.waterfall([
            STEP_DB_getTriggers,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getTriggers() {
            DB_Triggers.getTriggersMMEvol(STEP_finish);
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
    getTriggersKeltner: function(callback, req, res, next) {
        async.waterfall([
            STEP_DB_getTriggers,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getTriggers() {
            DB_Triggers.getTriggersKeltner(STEP_finish);
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
    changeTriggerStatus: function(callback, req, res, next) {
        async.waterfall([
            STEP_DB_changeTrigerStatus,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_changeTrigerStatus() {
            DB_Triggers.changeTriggerStatus(STEP_finish, req.body.trig_id, req.body.active_trig);
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