const MongoClient = require('mongodb').MongoClient;

function prepareData(data, pair, insert_date, insert_hour, timestamp){

    let publicTrades = [];

    for(let i=0; i<data[pair].length; i++){
        var trade = {
            insert_date: insert_date,
            insert_hour: insert_hour,
            insert_timestamp: timestamp,
            pair: pair,
            time: data[pair][i][2],
            price: data[pair][i][0],
            volume: data[pair][i][1],
            oerder_tyoe: data[pair][i][3],
            order_subtype: data[pair][i][4]
        }
        publicTrades.push(trade);
    }
    return publicTrades;
}

module.exports = {
    insertTrades: function (callback, data, pair, insert_date, insert_hour, timestamp, param_fw1) {
        var trades = prepareData(data, pair, insert_date, insert_hour, timestamp);
        new Promise(function (resolve, reject) {
            if(trades.length > 0){
                MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function (err, db) {
                    if (err) {
                        reject(err);
                    } else {
                        var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                        dbo.collection("MarketTrades").insertMany(trades, function (err, res) {
                            if (err) {
                                reject(err);
                            } else {
                                db.close();
                                resolve(true);
                            }
                        });
                    }
                });
            }else{
                resolve(true);
            }
        }).then(function (res) {
            callback(null, res, param_fw1);
        }).catch(function (err) {
            callback(err, null);
        });
    },
    dropMarketTrades: function(callback){
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("MarketTrades").drop(function(err, delOK) {
                        if (err){
                            reject(err);
                        } else{
                            if(delOK){

                            }
                            db.close();
                            resolve(true);
                        }
                    });
                }
            });
        }).then(function(res){
            callback(res);
        }).catch(function(err) {
            callback(err);
        });
    }
}