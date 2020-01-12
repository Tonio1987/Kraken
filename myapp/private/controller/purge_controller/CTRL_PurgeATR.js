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
                console.log(err);
                console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - CONTROLER - > Process Purge ATR Data 1 hour FAILED');
            }
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
                console.log(err);
                console.log('\x1b[31m', moment().format('L') + ' - ' + moment().format('LTS') + ' - CONTROLER - > Process Purge ATR Data 1 day FAILED', '\x1b[0m');
            }
            console.log('\x1b[31m', moment().format('L') + ' - '+ moment().format('LTS') + ' - CONTROLER -> END - Purge ATR Data', '\x1b[0m');
        }
    }
};