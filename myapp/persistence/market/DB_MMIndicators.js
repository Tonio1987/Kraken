const moment = require('moment');
var MongoClient = require('mongodb').MongoClient;
moment.locale('fr');

module.exports = {
    getMaxInsertTimestamp: function (callback, param_fw1, param_fw2) {
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("MobileMIndicators").find().sort({insert_timestamp: -1}).limit(1).toArray(function(err, result) {
                        if (err){
                            reject(err);
                        } else{
                            db.close();
                            resolve(result);
                        }
                    });
                }
            });
        }).then(function(res){
            callback(null, res, param_fw1, param_fw2);
        }).catch(function(err) {
            callback(err, null);
        });
    },
    getLastMMIndicators: function (callback, lastTimestamp, param_fw1, param_fw2) {
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("MobileMIndicators").find({insert_timestamp: lastTimestamp}).toArray(function(err, result) {
                        if (err){
                            reject(err);
                        }
                        db.close();
                        resolve(result);
                    });
                }
            });
        }).then(function(data){
            callback(null, data, param_fw1, param_fw2);
        }).catch(function(err) {
            callback(err, null);
        });
    }

}