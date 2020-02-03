// LOG SYSTEM
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

const API_Time = require('../../api/kraken/API_Time');
const async = require('async');
const moment = require('moment');

module.exports = {
    LoadTime: function() {

        async.waterfall([
            STEP_API_getTime,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_API_getTime() {
            API_Time.kraken_Time(STEP_finish);
        }
        function STEP_finish(err, data) {
            if(err){
                logger.error(err);
                logger.error('*** CONTROLLER *** ->  Process Check Server time ... [ FAILED ]');
            }
            logger.info('*** CONTROLLER *** ->  Process Check Server time ... [ DONE ]');
        }
    }
};
