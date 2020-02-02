const moment = require('moment');
var MongoClient = require('mongodb').MongoClient;

moment.locale('fr');


module.exports = {
    getLastATR_1h: function (callback, pair, param_fw1) {
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("ATR").find({pair: pair, interval: "1_HOUR"}).sort({time: -1}).limit(1).toArray(function(err, result) {
                        if (err){
                            reject(err);
                        }
                        db.close();
                        resolve(result);
                    });
                }
            });
        }).then(function(data){
            callback(null, data, pair, param_fw1);
        }).catch(function(err) {
            callback(err, null);
        });
    },
    getLastATR_1d: function (callback, pair, param_fw1) {
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("ATR").find({pair: pair, interval: "1_DAY"}).sort({time: -1}).limit(1).toArray(function(err, result) {
                        if (err){
                            reject(err);
                        }
                        db.close();
                        resolve(result);
                    });
                }
            });
        }).then(function(data){
            callback(null, data, pair, param_fw1);
        }).catch(function(err) {
            callback(err, null);
        });
    }
};