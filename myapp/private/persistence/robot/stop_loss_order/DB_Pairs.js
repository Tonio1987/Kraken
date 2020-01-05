const moment = require('moment/moment');
const MongoClient = require('mongodb').MongoClient;

moment.locale('fr');

module.exports = {
    getEurPairs: function (callback, currencyList, AutonomousTrigger, ActiveTriggersKeltner,  LastBalance, OpenOrders) {
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("Pairs").find({pair_out: "EUR", pair_in_kraken: {$in: currencyList}}).toArray(function(err, result) {
                        if (err){
                            reject(err);
                        }
                        db.close();
                        resolve(result);
                    });
                }
            });
        }).then(function(data){
            callback(null, data, currencyList, AutonomousTrigger, ActiveTriggersKeltner,  LastBalance, OpenOrders);
        }).catch(function(err) {
            callback(err, null);
        });
    }
};