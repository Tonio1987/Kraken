const API_Balance = require('../../api/kraken/API_Balance');
const DB_Balance = require('../../persistence/DB_Balance');
const async = require('async');
const moment = require('moment/moment');

module.exports = {
    LoadBalance: function() {
        console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - ### CONTROLER ### - > Process Load Balance STARTED');
        async.waterfall([
            STEP_API_getBalance,
            STEP_DB_insertBalance,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_API_getBalance() {
            API_Balance.kraken_Balance(STEP_DB_insertBalance);
        }
        function STEP_DB_insertBalance(err, data) {
            if(!err){
                DB_Balance.insertBalance(data, STEP_finish);
            }else{
                STEP_finish(err);
            }
        }
        function STEP_finish(err, data) {
            if(!err){
                console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - ### CONTROLER ### - > Process Load Balance SUCCESS');
            }else{
                console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - ### CONTROLER ### - > Process Load Balance FAILED');
            }
        }
    }
};
