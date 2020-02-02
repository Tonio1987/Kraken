var colors = require('colors');
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
                console.log(err);
                console.log(colors.yellow(moment().format('L') + ' - ' + moment().format('LTS')), colors.cyan(' *** CONTROLER ***'), colors.white('- > Process Purge OHLC Data 1 hour : '), colors.brightRed('[ FAILED ]'));
            }
            console.log(colors.yellow(moment().format('L') + ' - ' + moment().format('LTS')), colors.cyan(' *** CONTROLER ***'), colors.white('- > Process Purge OHLC Data 1 hour : '), colors.brightGreen('[ DONE ]'));
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
                console.log(err);
                console.log(colors.yellow(moment().format('L') + ' - ' + moment().format('LTS')), colors.cyan(' *** CONTROLER ***'), colors.white('- > Process Purge OHLC Data 1 day : '), colors.brightRed('[ FAILED ]'));
            }
            console.log(colors.yellow(moment().format('L') + ' - ' + moment().format('LTS')), colors.cyan(' *** CONTROLER ***'), colors.white('- > Process Purge OHLC Data 1 day : '), colors.brightGreen('[ DONE ]'));
        }
    }
};