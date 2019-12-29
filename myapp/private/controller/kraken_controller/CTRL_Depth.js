const DB_Pairs = require('../../persistence/private/DB_Pairs');
const DB_Depth = require('../../persistence/private/DB_Depth');
const API_Depth = require('../../api/kraken/API_Depth');
const async = require('async');
const moment = require('moment/moment');


module.exports = {
    LoadTicker: function () {
        let insert_date = moment().format('L');
        let insert_hour = moment().format('LTS');
        let timestamp = new Date().getTime();
        async.waterfall([
            STEP_DB_getAllPairs,
            STEP_API_loadDepth,
            STEP_DB_insertDepth,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getAllPairs() {
            DB_Pairs.getAllPairs(STEP_API_loadDepth);
        }
        function STEP_API_loadDepth(err, data) {
            if(!err){
                data.forEach(function(pair){
                    API_Depth.kraken_Depth(STEP_DB_insertDepth, pair.kraken_pair_name);
                });
            }else{
                STEP_finish(err);
            }
        }
        function STEP_DB_insertDepth(err, data, pair) {
            if(!err){
                DB_Depth.insertDepth(STEP_finish, data, pair, insert_date, insert_hour, timestamp);
            }else{
                console.log('Erreur with pair : '+pair);
                STEP_finish(err);
            }
        }
        function STEP_finish(err, data) {
            if(err){
                console.log(err);
                console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - CONTROLER - > Process Load OHLC FAILED');
            }
        }
    }
};