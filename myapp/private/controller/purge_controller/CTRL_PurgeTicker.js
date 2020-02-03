// LOG SYSTEM
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

const async = require('async');
const moment = require('moment');

const DB_Ticker = require('../../persistence/purge/DB_Ticker');

module.exports = {
    purgeTickerData: function () {
        async.waterfall([
            STEP_DB_getMaxTimestamp,
            STEP_DB_purgeDate,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getMaxTimestamp() {
            DB_Ticker.getMaxInsertTimestamp(STEP_DB_purgeDate);
        }

        function STEP_DB_purgeDate(err, data) {
            if (!err) {
                if(data.length > 0){
                    var maxInserTimestamp = moment(new Date(data[0].insert_timestamp)).add(-2, 'days').valueOf();
                    let twoDaysAgo = moment(maxInserTimestamp).valueOf();
                    DB_Ticker.purgeData(STEP_finish, twoDaysAgo);
                }else{
                    STEP_finish(err, null);
                }
            }else{
                STEP_finish(err, null);
            }
        }

        function STEP_finish(err, data) {
            if (err) {
                logger.error(err);
                logger.error('*** CONTROLLER *** ->  Process Purge Ticker data ... [ FAILED ]');
            }
            logger.warn('*** CONTROLLER *** ->  Process Purge Ticker data ... [ DONE ]');
        }
    }
};