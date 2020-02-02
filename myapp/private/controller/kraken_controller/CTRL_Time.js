var colors = require('colors');
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
                console.log(err);
                console.log(colors.yellow(moment().format('L') + ' - ' + moment().format('LTS')), colors.cyan(' *** CONTROLER ***'), colors.white('- > Process Load Time : '), colors.brightRed('[ FAILED ]'));
            }
            console.log(colors.yellow(moment().format('L') + ' - ' + moment().format('LTS')), colors.cyan(' *** CONTROLER ***'), colors.white('- > Process Load Time : '), colors.brightGreen('[ DONE ]'));
        }
    }
};
