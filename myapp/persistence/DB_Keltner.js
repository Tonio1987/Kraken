const MongoClient = require('mongodb').MongoClient;

module.exports = {
    getMaxInsertTimestamp: function (callback, balanceChanges, lastBalance) {
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("Keltner").find().sort({insert_timestamp: -1}).limit(1).toArray(function(err, result) {
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
            callback(null, res, balanceChanges, lastBalance);
        }).catch(function(err) {
            callback(err, null);
        });
    },
    getLastKeltner: function (callback, data, balanceChanges, lastBalance) {
        new Promise(function (resolve, reject) {
            let timestamp = data[0].insert_timestamp;
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("Keltner").find({insert_timestamp: timestamp}).toArray(function(err, result) {
                        if (err){
                            reject(err);
                        } else{
                            db.close();
                            resolve(result);
                        }
                    });
                }
            });
        }).then(function(result){
            callback(null, result, balanceChanges, lastBalance);
        }).catch(function(err) {
            console.log(err);
            callback(err, null);
        });
    }
};