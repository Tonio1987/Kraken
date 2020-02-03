// LOG SYSTEM
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

const async = require('async');
const moment = require('moment');

const DB_ATR = require('../../persistence/purge/DB_ATR');

module.exports = {
    purgeATRData1h: function () {
        async.waterfall([
            STEP_DB_purgeDate,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_purgeDate() {
            let twoDaysAgo = moment().add(-2, 'days').valueOf();
            DB_ATR.purgeData_1hour(STEP_finish, twoDaysAgo);
        }

        function STEP_finish(err, data) {
            if (err) {
                logger.error(err);
                logger.error('*** CONTROLLER *** ->  Process Purge ATR Data 1 hour ... [ FAILED ]');
            }
            logger.warn('*** CONTROLLER *** ->  Process Purge ATR Data 1 hour ... [ DONE ]');
        }
    },
    purgeATRData1d: function () {
        async.waterfall([
            STEP_DB_purgeDate,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_purgeDate() {
            let longTimeAgo = moment().add(-15, 'days').valueOf();
            DB_ATR.purgeData_1day(STEP_finish, longTimeAgo);
        }

        function STEP_finish(err, data) {
            if (err) {
                logger.error(err);
                logger.error('*** CONTROLLER *** ->  Process Purge ATR Data 1 day ... [ FAILED ]');
            }
            logger.warn('*** CONTROLLER *** ->  Process Purge ATR Data 1 day ... [ DONE ]');
        }
    }
};