const moment = require('moment/moment');
const MongoClient = require('mongodb').MongoClient;

moment.locale('fr');


module.exports = {
    getLastKeltner: function (callback, pair, lastTicker, last24,  highest, lowest) {
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("Keltner").find({ pair: pair }).sort({insert_timestamp: -1}).limit(1).toArray(function(err, result) {
                        if (err){
                            reject(err);
                        }
                        db.close();
                        resolve(result);
                    });
                }
            });
        }).then(function(data){
            callback(null, data, pair, lastTicker, last24,  highest, lowest);
        }).catch(function(err) {
            callback(err, null, pair, lastTicker, last24,  highest, lowest);
        });
    },
    insertKEltner: function (callback, data) {
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("Keltner").insertOne(data, function(err, res) {
                        if (err){
                            reject(err);
                        } else{
                            db.close();
                            resolve(true);
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
    getMaxInsertTimestamp: function (callback) {
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
            callback(null, res);
        }).catch(function(err) {
            callback(err, null);
        });
    },
    purgeData: function (callback, twoDaysAgo) {
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function (err, db) {
                if (err) {
                    reject(err);
                } else {
                    var myquery = {insert_timestamp: {$lte: twoDaysAgo}};
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("Keltner").deleteMany(myquery, function (err, obj) {
                        if (err) {
                            reject(err);
                        } else {
                            console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - DATABASE - > Keltner - ' + obj.result.n + ' document(s) deleted');
                            db.close();
                            resolve(true);
                        }
                    });
                }
            });
        }).then(function (res) {
            callback(null, res);
        }).catch(function (err) {
            callback(err, null);
        });
    }
};