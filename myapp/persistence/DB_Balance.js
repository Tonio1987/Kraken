const MongoClient = require('mongodb').MongoClient;
const moment = require('moment');

moment.locale('fr');

module.exports = {
    getMaxInsertBalanceTimestamp: function (callback) {
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("Balance").find().sort({insert_timestamp: -1}).limit(1).toArray(function(err, result) {
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
            callback(null, res);
        }).catch(function(err) {
            callback(err, null);
        });
    },
    // Get last balance sorted by eur value - near 0 filtered
    getLastBalance: function (callback, data) {
        new Promise(function (resolve, reject) {
            let timestamp = data[0].insert_timestamp;

            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("Balance").find({insert_timestamp: timestamp, units: { $gt: 0 }, eur_value: { $gt: 0.01 }}).sort({eur_value: -1}).toArray(function(err, result) {
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
            callback(null, result);
        }).catch(function(err) {
            console.log(err);
            callback(err, null);
        });
    },
    // Get Balance changes
    getBalanceChanges: function (callback, lastBalance) {
        new Promise(function (resolve, reject) {
            let lim = lastBalance.length;
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("Balance").find({change: true, units: { $gt: 0 }, eur_value: { $gt: 0.01 }}).sort({insert_timestamp: -1}).limit(lim).toArray(function(err, result) {
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
            callback(null, result, lastBalance);
        }).catch(function(err) {
            console.log(err);
            callback(err, null, lastBalance);
        });
    }
};

