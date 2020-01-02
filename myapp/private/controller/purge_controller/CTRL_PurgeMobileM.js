const async = require('async');
const moment = require('moment');

const DB_MobileM = require('../../persistence/purge/DB_MobileM');

module.exports = {
    purgeMobileMData: function () {
        async.waterfall([
            STEP_DB_getMaxTimestamp,
            STEP_DB_purgeDate,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getMaxTimestamp() {
            DB_MobileM.getMaxInsertTimestamp(STEP_DB_purgeDate);
        }

        function STEP_DB_purgeDate(err, data) {
            if (!err) {
                if(data.length > 0){
                    var maxInserTimestamp = moment(new Date(data[0].insert_timestamp)).add(-2, 'days').valueOf();
                    let twoDaysAgo = moment(maxInserTimestamp).valueOf();
                    DB_MobileM.purgeData(STEP_finish, twoDaysAgo);
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
                console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - CONTROLER - > Process Purge MobileM Data FAILED');
            }
        }
    }
};