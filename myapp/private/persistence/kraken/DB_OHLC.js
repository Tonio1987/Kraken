const moment = require('moment');
var MongoClient = require('mongodb').MongoClient;

moment.locale('fr');

function prepareData(data, pair, interval, count, insert_date, insert_hour, timestamp){
    let ohlcs = [];
    let time = 0;
    let time_date = 0;
    let time_hour = 0;
    if(count > 0){
        let i = data[pair].length-1;
        if(interval === "1_HOUR"){
            time = data[pair][i][0];
            time_date = moment(time).format('L');
            time_hour = moment(time).format('LTS');
        }else{
            var len = Math.ceil(Math.log(data[pair][i][0] + 1) / Math.LN10);
            if(len === 13){
                time = data[pair][i][0];
            }else{
                time = data[pair][i][0]*1000;
            }
            time_date = moment(time).format('L');
            time_hour = moment(time).format('LTS');
        }

        var ohlc = {
            insert_date: insert_date,
            insert_hour: insert_hour,
            insert_timestamp: timestamp,
            pair: pair,
            interval: interval,
            time: time,
            time_date: time_date,
            time_hour: time_hour,
            open: data[pair][i][1],
            high: data[pair][i][2],
            low: data[pair][i][3],
            close: data[pair][i][4],
            swap: data[pair][i][5],
            volume: data[pair][i][6],
            count: data[pair][i][7]
        }
        ohlcs.push(ohlc);
    }else{
        // FIRST LOAD
        for(let i=0; i<data[pair].length; i++){
            if(interval === "1_HOUR"){
                time = data[pair][i][0];
                time_date = moment(time).format('L');
                time_hour = moment(time).format('LTS');
            }else{
                var len = Math.ceil(Math.log(data[pair][i][0] + 1) / Math.LN10);
                if(len === 13){
                    time = data[pair][i][0];
                }else{
                    time = data[pair][i][0]*1000;
                }
                time_date = moment(time).format('L');
                time_hour = moment(time).format('LTS');
            }
            var ohlc = {
                insert_date: insert_date,
                insert_hour: insert_hour,
                insert_timestamp: timestamp,
                pair: pair,
                interval: interval,
                time: time,
                time_date: time_date,
                time_hour: time_hour,
                open: data[pair][i][1],
                high: data[pair][i][2],
                low: data[pair][i][3],
                close: data[pair][i][4],
                swap: data[pair][i][5],
                volume: data[pair][i][6],
                count: data[pair][i][7]
            }
            ohlcs.push(ohlc);
        }
    }
    return ohlcs;
}

module.exports = {
    insertOHLC: function (callback, data, pair, interval, count, insert_date, insert_hour, timestamp) {
        var ohlc = prepareData(data, pair, interval, count, insert_date, insert_hour, timestamp);
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("OHLC").insertMany(ohlc, function (err, res) {
                        if (err) {
                            reject(err);
                        } else {
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
    countOHLC: function (callback, interval, param_fw1) {
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("OHLC").find({"interval" : interval}).count(function (err, nbDoc) {
                        if (err) {
                            console.log(err);
                            resolve(0);
                        } else {
                            db.close();
                            resolve(nbDoc);
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
    getLast14OHLC_1h: function (callback, pair, param_fw1) {
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("OHLC").find({pair: pair, interval: "1_HOUR"}).sort({time: -1}).limit(14).toArray(function(err, result) {
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
    getLast14OHLC_1d: function (callback, pair, param_fw1) {
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("OHLC").find({pair: pair, interval: '1_DAY'}).sort({time: -1}).limit(14).toArray(function(err, result) {
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

