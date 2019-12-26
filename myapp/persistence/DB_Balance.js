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
    // Get 24h ago balance sorted by eur value - near 0 filtered
    get24hAgoBalance: function (callback, lastBalance) {
        new Promise(function (resolve, reject) {
            const yesterday = moment().add(-1, 'days').valueOf();
            const yesterday1m = moment().add({days:-1,minutes:1}).valueOf();
            //const yesterday = moment().add(-12, 'hours').valueOf();
            //const yesterday1m = moment().add({hours:-12,minutes:1}).valueOf();
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("Balance").find({insert_timestamp: {$gte: yesterday, $lt: yesterday1m}, units: { $gt: 0 }, eur_value: { $gt: 0.01 }}).sort({eur_value: -1}).toArray(function(err, result) {
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

