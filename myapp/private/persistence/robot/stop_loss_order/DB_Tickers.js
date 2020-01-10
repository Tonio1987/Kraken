var MongoClient = require('mongodb').MongoClient;

module.exports = {
    getMaxInsertTimestamp: function (callback, param_fw1, param_fw2, param_fw3, param_fw4, param_fw5, param_fw6) {
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("Ticker").find().sort({insert_timestamp: -1}).limit(1).toArray(function(err, result) {
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
            callback(null, res, param_fw1, param_fw2, param_fw3, param_fw4, param_fw5, param_fw6);
        }).catch(function(err) {
            callback(err, null);
        });
    },
    getLastTicker: function (callback, lastTimestamp, pairList, param_fw1, param_fw2, param_fw3, param_fw4, param_fw5) {
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("Ticker").find({insert_timestamp: lastTimestamp, pair: {$in: pairList}}).toArray(function(err, result) {
                        if (err){
                            reject(err);
                        }
                        db.close();
                        resolve(result);
                    });
                }
            });
        }).then(function(data){
            callback(null, data, pairList, param_fw1, param_fw2, param_fw3, param_fw4, param_fw5);
        }).catch(function(err) {
            callback(err, null);
        });
    }
}
