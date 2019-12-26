const DB_Pairs = require('../../persistence/private/DB_Pairs');
const DB_Ticker = require('../../persistence/private/DB_Ticker');
const API_Ticker = require('../../api/kraken/API_Ticker');
const CTRL_MMCalculation = require('../algotirhm_controller/CTRL_MMCalculation');
const async = require('async');
const moment = require('moment/moment');


module.exports = {
    LoadTicker: function () {

        async.waterfall([
            STEP_DB_getAllPairs,
            STEP_API_loadTicker,
            STEP_DB_insertTicker,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_getAllPairs() {
            DB_Pairs.getAllPairs(STEP_API_loadTicker);
        }
        function STEP_API_loadTicker(err, data) {
            if(!err){
                data.forEach(function(pair){
                    API_Ticker.kraken_Ticker(STEP_DB_insertTicker, pair.kraken_pair_name);
                });
            }else{
                STEP_finish(err);
            }
        }
        function STEP_DB_insertTicker(err, data, pair) {
            if(!err){
                DB_Ticker.insertTicker(STEP_finish, data, pair);
            }else{
                console.log('Erreur with pair : '+pair);
                STEP_finish(err);
            }
        }
        function STEP_finish(err, data) {
            if(err){
                console.log(err);
                console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - CONTROLER - > Process Load Ticker FAILED');
            }
        }
    }
};