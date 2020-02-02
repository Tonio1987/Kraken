var colors = require('colors');
const API_OpenOrders = require('../../api/kraken/API_OpenOrders');
const DB_OpenOrders = require('../../persistence/kraken/DB_OpenOrders');
const async = require('async');
const moment = require('moment');

module.exports = {
    LoadOpenOrders: function() {
        /*
            CONTROLLER DESCRIPTION
            1 - We drop Open Orders collection in DB
            2 - We load Open Orders via Kraken API
            3 - We insert in DB the Open Orders
         */

        async.waterfall([
            STEP_DB_dropOpenOrders,
            STEP_API_getOpenOrders,
            STEP_DB_insertOpenOrders,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_DB_dropOpenOrders() {
            DB_OpenOrders.dropOpenOrders(STEP_API_getOpenOrders);
        }
        function STEP_API_getOpenOrders(res) {
            if(res){
                API_OpenOrders.kraken_OpenOrders(STEP_DB_insertOpenOrders);
            }else{
                STEP_finish(res);
            }
        }
        function STEP_DB_insertOpenOrders(err, data) {
            if(!err){
                DB_OpenOrders.upsertOpenOrders(STEP_finish, data);
            }else{
                STEP_finish(err);
            }
        }
        function STEP_finish(err, data) {
            if(err){
                console.log(err);
                console.log(colors.yellow(moment().format('L') + ' - ' + moment().format('LTS')), colors.cyan(' *** CONTROLER ***'), colors.white('- > Process Load Open Orders : '), colors.brightRed('[ FAILED ]'));
            }
            console.log(colors.yellow(moment().format('L') + ' - ' + moment().format('LTS')), colors.cyan(' *** CONTROLER ***'), colors.white('- > Process Load Open Orders : '), colors.brightGreen('[ DONE ]'));
        }
    }
};
