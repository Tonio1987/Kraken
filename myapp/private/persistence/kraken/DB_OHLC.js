const moment = require('moment');
var MongoClient = require('mongodb').MongoClient;

moment.locale('fr');

function prepareData(data, pair, interval, count, insert_date, insert_hour, timestamp){
    let ohlcs = [];
    if(count > 0){
        let i = data[pair].length-1;
        var ohlc = {
            insert_date: insert_date,
            insert_hour: insert_hour,
            insert_timestamp: timestamp,
            pair: pair,
            interval: interval,
            time: data[pair][i][0],
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
            var ohlc = {
                insert_date: insert_date,
                insert_hour: insert_hour,
                insert_timestamp: timestamp,
                pair: pair,
                interval: interval,
                time: data[pair][i][0],
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
    }


};

