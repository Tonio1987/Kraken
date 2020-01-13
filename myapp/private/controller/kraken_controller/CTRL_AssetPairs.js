const API_AssetPairs = require('../../api/kraken/API_AssetPairs');
const DB_AssetPairs = require('../../persistence/kraken/DB_AssetPairs');
const async = require('async');
const moment = require('moment');

module.exports = {
    LoadAssetPairs: function() {
        /*
            CONTROLLER DESCRIPTION
            1 - We drop AssetPairs collection in DB
            2 - We load AssetPairs via Kraken API
            3 - We insert in DB the AssetPairs
         */

        async.waterfall([
            STEP_DB_dropAssetPairs,
            STEP_API_getAssetPairs,
            STEP_DB_insertAssetPairs,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_dropAssetPairs() {
            DB_AssetPairs.dropAssetPairs(STEP_API_getAssetPairs);
        }
        function STEP_API_getAssetPairs(res) {
            if(res){
                API_AssetPairs.kraken_AssetPairs(STEP_DB_insertAssetPairs);
            }else{
                STEP_finish(res);
            }
        }
        function STEP_DB_insertAssetPairs(err, data) {
            if(!err){
                DB_AssetPairs.insertAssetPairs(STEP_finish, data);
            }else{
                STEP_finish(err);
            }
        }
        function STEP_finish(err, data) {
            if(err){
                console.log(err);
                console.log('\x1b[31m', moment().format('L') + ' - ' + moment().format('LTS') + ' - CONTROLER - > Process Load AssetPairs FAILED', '\x1b[0m');
            }
        }
    }
};
