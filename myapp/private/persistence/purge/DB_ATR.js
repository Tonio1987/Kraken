const moment = require('moment/moment');
const MongoClient = require('mongodb').MongoClient;

moment.locale('fr');


module.exports = {
    getMaxInsertTimestamp: function (callback) {
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("ATR").find().sort({insert_timestamp: -1}).limit(1).toArray(function(err, result) {
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
    purgeData_1hour: function (callback, twoDaysAgo) {
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function (err, db) {
                if (err) {
                    reject(err);
                } else {
                    var myquery = {interval: "1_HOUR", time: {$lte: twoDaysAgo}};
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("ATR").deleteMany(myquery, function (err, obj) {
                        if (err) {
                            reject(err);
                        } else {
                            console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - DATABASE - > ATR 1 HOUR- ' + obj.result.n + ' document(s) deleted');
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
    },
    purgeData_1day: function (callback, longTimeAgo) {
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function (err, db) {
                if (err) {
                    reject(err);
                } else {
                    var myquery = {interval: "1_DAY", time: {$lte: longTimeAgo}};
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("ATR").deleteMany(myquery, function (err, obj) {
                        if (err) {
                            reject(err);
                        } else {
                            console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - DATABASE - > ATR 1 DAY - ' + obj.result.n + ' document(s) deleted');
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