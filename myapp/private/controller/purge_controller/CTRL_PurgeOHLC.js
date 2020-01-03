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
            if (!err) {
                if(data.length > 0){
                    let twoDaysAgo = moment().add(-2, 'days').valueOf();
                    DB_OHLC.purgeData_1hour(STEP_finish, twoDaysAgo);
                }else{
                    STEP_finish(err, null);
                }
            }else{
                STEP_finish(err, null);
            }
        }

        function STEP_finish(err, data) {
            if (err) {
                console.log(err);
                console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - CONTROLER - > Process Purge OHLC Data 1 hour FAILED');
            }
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
            if (!err) {
                if(data.length > 0){
                    let longTimeAgo = moment().add(-688, 'days').valueOf();
                    DB_OHLC.purgeData_1day(STEP_finish, longTimeAgo);
                }else{
                    STEP_finish(err, null);
                }
            }else{
                STEP_finish(err, null);
            }
        }

        function STEP_finish(err, data) {
            if (err) {
                console.log(err);
                console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - CONTROLER - > Process Purge OHLC Data 1 hour FAILED');
            }
        }
    }
};