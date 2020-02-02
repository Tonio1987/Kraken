var colors = require('colors');
const async = require('async');
const moment = require('moment');

const DB_TradeBalance = require('../../persistence/history/DB_TradeBalance');
const DB_History_TradeBalance = require('../../persistence/history/DB_History_TradeBalance');

module.exports = {
    loadHistory_TradeBalance: function () {
        async.waterfall([
            STEP_DB_getLastTradeBalance,
            STEP_DB_insertHistory_TradeBalance,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getLastTradeBalance() {
            DB_TradeBalance.getLastTradeBalances(STEP_DB_insertHistory_TradeBalance);
        }

        function STEP_DB_insertHistory_TradeBalance(err, data) {
            if (!err) {
                DB_History_TradeBalance.insertHistory_TradeBalance(STEP_finish, data);
            }else{
                STEP_finish(err, null);
            }
        }

        function STEP_finish(err, data) {
            if (err) {
                console.log(err);
                console.log(colors.yellow(moment().format('L') + ' - ' + moment().format('LTS')), colors.cyan(' *** CONTROLER ***'), colors.white('- > Process Load History TradeBalance : '), colors.brightRed('[ FAILED ]'));
            }
            console.log(colors.yellow(moment().format('L') + ' - ' + moment().format('LTS')), colors.cyan(' *** CONTROLER ***'), colors.white('- > Process Load History TradeBalance : '), colors.brightGreen('[ DONE ]'));
        }
    }
};