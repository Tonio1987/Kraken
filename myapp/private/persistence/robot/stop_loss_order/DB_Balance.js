const moment = require('moment');
const MongoClient = require('mongodb').MongoClient;

moment.locale('fr');

module.exports = {
    getMaxInsertTimestamp: function (callback, param_fw1) {
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
            callback(null, res, param_fw1);
        }).catch(function(err) {
            callback(err, null);
        });
    },
    getLastBalanceSpecial: function (callback,  LastBalanceTimestamp, param_fw1) {
        new Promise(function (resolve, reject) {
            let timestamp = LastBalanceTimestamp[0].insert_timestamp;

            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function (err, db) {
                if (err) {
                    reject(err);
                } else {
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("Balance").find({
                        insert_timestamp: timestamp,
                        units: {$gt: 0},
                        eur_value: {$gt: 0.01}
                    }).sort({eur_value: -1}).toArray(function (err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            db.close();
                            resolve(result);
                        }
                    });
                }
            });
        }).then(function (result) {
            callback(null, result, param_fw1);
        }).catch(function (err) {
            console.log(err);
            callback(err, null);
        });
    }
};

