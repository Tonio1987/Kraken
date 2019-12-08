const DB_Pairs = require('../../persistence/DB_Pairs');
const DB_Ticker = require('../../persistence/DB_Ticker');
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
                    API_Ticker.kraken_Ticker(pair.kraken_pair_name, STEP_DB_insertTicker);
                });
            }else{
                STEP_finish(err);
            }
        }
        function STEP_DB_insertTicker(err, data, pair) {
            if(!err){
                DB_Ticker.insertTicker(data, pair, STEP_finish);
            }else{
                STEP_finish(err);
            }
        }
        function STEP_finish(err, data) {
            if(err){
                console.log(err);
                console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - ### CONTROLER ### - > Process Load Ticker FAILED');
            }
        }
    }
};