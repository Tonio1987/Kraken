const moment = require('moment');
var MongoClient = require('mongodb').MongoClient;

moment.locale('fr');

module.exports = {
    getTicker: function (callback, pair, inf, sup, param_fw1, param_fw2, param_fw3, param_fw4, param_fw5) {
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("Ticker").find({pair: pair, insert_timestamp: {$gte: inf, $lt: sup}}).toArray(function(err, result) {
                        if (err){
                            reject(err);
                        }
                        db.close();
                        resolve(result);
                    });
                }
            });
        }).then(function(data){
            callback(null, data, pair, param_fw1, param_fw2, param_fw3, param_fw4, param_fw5);
        }).catch(function(err) {
            callback(err, null);
        });
    }
};

