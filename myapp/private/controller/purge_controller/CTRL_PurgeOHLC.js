// LOG SYSTEM
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

const async = require('async');
const moment = require('moment');

const DB_OHLC = require('../../persistence/purge/DB_OHLC');

module.exports = {
    purgeOHLCData1h: function () {
        async.waterfall([
            STEP_DB_purgeDate,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_purgeDate() {
                let twoDaysAgo = moment().add(-2, 'days').valueOf();
                DB_OHLC.purgeData_1hour(STEP_finish, twoDaysAgo);
        }

        function STEP_finish(err, data) {
            if (err) {
                logger.error(err);
                logger.error('*** CONTROLLER *** ->  Process Purge OHLC 1 hour data ... [ FAILED ]');
            }
            logger.warn('*** CONTROLLER *** ->  Process Purge OHLC 1 hour data ... [ DONE ]');
        }
    },
    purgeOHLCData1d: function () {
        async.waterfall([
            STEP_DB_purgeDate,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_purgeDate() {
            let longTimeAgo = moment().add(-688, 'days').valueOf();
            DB_OHLC.purgeData_1day(STEP_finish, longTimeAgo);
        }

        function STEP_finish(err, data) {
            if (err) {
                logger.error(err);
                logger.error('*** CONTROLLER *** ->  Process Purge OHLC 1 day data ... [ FAILED ]');
            }
            logger.warn('*** CONTROLLER *** ->  Process Purge OHLC 1 day data ... [ DONE ]');
        }
    }
};