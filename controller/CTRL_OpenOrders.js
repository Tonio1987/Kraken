var API_OpenOrders = require('../api/kraken/API_OpenOrders');
var DB_OpenOrders = require('../persistence/DB_OpenOrders');
var async = require('async');

module.exports = {
    LoadOpenOrders: function() {
        /*
        async.series([
            function(callback){
                DB_OpenOrders.dropOpenOrders(function (err) {
                    if(err){
                        console.log(err);
                    }
                    callback(null, 1);
                });
            },
            function(callback){
                API_OpenOrders.kraken_OpenOrders(function () {
                    callback(null, 2);
                });
            }
        ]);
        */
        DB_OpenOrders.dropOpenOrders();
        API_OpenOrders.kraken_OpenOrders();
    }
};
