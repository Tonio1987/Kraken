const moment = require('moment/moment');
var MongoClient = require('mongodb').MongoClient;

moment.locale('fr');

module.exports = {
    insertTicker: function (data, pair, callback) {
        new Promise(function (resolve, reject) {
            var timestamp = new Date().getTime();
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    var myobj = {
                        insert_date: moment().format('L'),
                        insert_hour: moment().format('LTS'),
                        insert_timestamp: timestamp,
                        pair: pair,
                        ask_price: data[pair].a[0],
                        bid_price: data[pair].b[0],
                        last_trade_closed_price: data[pair].c[0],
                        vol_today: data[pair].v[0],
                        vol_last_24: data[pair].v[1],
                        vol_wghted_avg_price_today: data[pair].p[0],
                        vol_wghted_avg_price_last_24: data[pair].p[1],
                        nb_of_trades_today: data[pair].t[0],
                        nb_of_trades_last_24: data[pair].t[1],
                        low_today: data[pair].l[0],
                        low_last_24: data[pair].l[1],
                        high_today: data[pair].h[0],
                        high_last_24: data[pair].h[1],
                        opening_price: data[pair].o
                    };
                    dbo.collection("Ticker").insertOne(myobj, function(err, res) {
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
    getLast1440Ticker: function (pair, callback) {
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("Ticker").find({ pair: pair }).sort({insert_timestamp: -1}).limit(1440).toArray(function(err, result) {
                        if (err){
                            reject(err);
                        }
                        db.close();
                        resolve(result);
                    });
                }
            });
        }).then(function(data){
            callback(null, data);
        }).catch(function(err) {
            callback(err, null);
        });
    },
    getPrevious24hTicker: function (pair, callback) {
        new Promise(function (resolve, reject) {
            const yesterday = moment().add(-1, 'days').valueOf();
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("Ticker").find({ pair: pair, insert_timestamp: {$gte: yesterday}}).sort({insert_timestamp: 1}).limit(1).toArray(function(err, result) {
                        if (err){
                            reject(err);
                        }
                        db.close();
                        resolve(result);
                    });
                }
            });
        }).then(function(data){
            callback(null, data);
        }).catch(function(err) {
            callback(err, null);
        });
    },
    getPRevious24hHighestTicker: function (pair, last24, callback) {
        new Promise(function (resolve, reject) {
            const yesterday = moment().add(-1, 'days').valueOf();
            const now = new moment().valueOf();
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("Ticker").find({ pair: pair, insert_timestamp: {$gte: yesterday, $lte: now}}).sort({ask_price:-1}).limit(1).toArray(function(err, result) {
                        if (err){
                            reject(err);
                        }
                        db.close();
                        resolve(result);
                    });
                }
            });
        }).then(function(data){
            callback(null, data, last24);
        }).catch(function(err) {
            callback(err, null);
        });
    },
    getLastTicker: function (pair, last24,  highest, lowest, callback) {
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("Ticker").find({ pair: pair}).sort({insert_timestamp: -1}).limit(1).toArray(function(err, result) {
                        if (err){
                            reject(err);
                        }
                        db.close();
                        resolve(result);
                    });
                }
            });
        }).then(function(data){
            callback(null, data, lowest, last24, highest);
        }).catch(function(err) {
            callback(err, null);
        });
    },
    getPrevious24hLowestTicker: function (pair, last24, highest, callback) {
        new Promise(function (resolve, reject) {
            const yesterday = moment().add(-1, 'days').valueOf();
            const now = new moment().valueOf();
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("Ticker").find({ pair: pair, insert_timestamp: {$gte: yesterday, $lte: now}}).sort({ask_price:+1}).limit(1).toArray(function(err, result) {
                        if (err){
                            reject(err);
                        }
                        db.close();
                        resolve(result);
                    });
                }
            });
        }).then(function(data){
            callback(null, data, last24, highest);
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
            callback(null, res);
        }).catch(function(err) {
            callback(err, null);
        });
    },
    purgeData: function (twoDaysAgo, callback) {
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var myquery = {insert_timestamp : {$lte : twoDaysAgo}};
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("Ticker").deleteMany(myquery, function(err, obj) {
                        if (err){
                            reject(err);
                        } else{
                            console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - DATABASE - > Ticker - '+ obj.result.n + ' document(s) deleted');
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
    }
};

