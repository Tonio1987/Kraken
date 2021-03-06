const moment = require('moment');
var MongoClient = require('mongodb').MongoClient;

moment.locale('fr');

module.exports = {
    getLastTicker: function (callback, pair, param_fw1, param_fw2) {
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("Ticker").find({ pair: pair}).sort({insert_timestamp: -1}).limit(1).toArray(function(err, result) {
                        if (err){
                            reject(err);
                        }
                        db.close();
                        resolve(result);
                    });
                }
            });
        }).then(function(data){
            callback(null, data, pair, param_fw1, param_fw2);
        }).catch(function(err) {
            callback(err, null);
        });
    }
};

