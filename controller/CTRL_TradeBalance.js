const API_TradeBalance = require('../api/kraken/API_TradeBalance');
const DB_TradeBalance = require('../persistence/DB_TradeBalance');
const async = require('async');
const moment = require('moment');

module.exports = {
    LoadTradeBalance: function() {
        console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - ### CONTROLER ### - > Process Load Trade Balance STARTED');

        async.waterfall([
            STEP_API_getTradeBalance,
            STEP_DB_insertTradeBalance,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_API_getTradeBalance() {
            API_TradeBalance.kraken_TradeBalance(STEP_DB_insertTradeBalance);
        }
        function STEP_DB_insertTradeBalance(err, data) {
            if(!err){
                DB_TradeBalance.insertTradeBalance(data, STEP_finish);
            }else{
                STEP_finish(err);
            }
        }
        function STEP_finish(res) {
            if(res){
                console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - ### CONTROLER ### - > Process Load Trade Balance SUCCESS');
            }else{
                console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - ### CONTROLER ### - > Process Load Trade Balance FAILED');
            }
        }


    }
};
