const moment = require('moment');
var MongoClient = require('mongodb').MongoClient;

moment.locale('fr');

module.exports = {
    getOHLC: function (callback, pair) {
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("OHLC").find({pair: pair).limit(1).toArray(function(err, result) {
                        if (err){
                            reject(err);
                        }
                        db.close();
                        resolve(result);
                    });
                }
            });
        }).then(function(data){
            callback(null, data, pair);
        }).catch(function(err) {
            callback(err, null);
        });
    }
};

