const moment = require('moment/moment');
const MongoClient = require('mongodb').MongoClient;

moment.locale('fr');

function prepareData(lastBalance, bid_price, currency, nb_units, date, hour, timestamp){
    let change = false;
    for(elem in lastBalance){
        if(lastBalance.hasOwnProperty(elem)){
            if(lastBalance[elem].currency == currency){
                if(lastBalance[elem].units != nb_units){
                    console.log(currency + '  '+ nb_units +  '   '+ lastBalance[elem].units);
                    change = true;
                }
            }
        }
    }

    var eur_value = 0;
    // Cas de l'EURO et du DOGE
    if(bid_price > 0){
        eur_value = nb_units*bid_price;
    }else{
        eur_value = nb_units;
    }

    var elementOfMyBalance = {
        insert_date: date,
        insert_hour: hour,
        insert_timestamp: timestamp,
        currency: currency,
        units: nb_units,
        price: bid_price,
        eur_value: eur_value,
        change: change
    };

    return elementOfMyBalance;
}

module.exports = {
    insertBalance: function (callback, lastBalance, bid_price, currency, nb_units, date, hour, timestamp) {
        var elementOfMyBalance = prepareData(lastBalance, bid_price, currency, nb_units, date, hour, timestamp);
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function (err, db) {
                if (err) {
                    reject(err);
                } else {
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("Balance").insertOne(elementOfMyBalance, function (err, res) {
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
    getLastBalance: function (callback, ticker, currency, nb_units) {
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("Balance").find({currency: currency}).sort({insert_timestamp: -1}).limit(1).toArray(function(err, result) {
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
            callback(null, res, ticker, currency, nb_units);
        }).catch(function(err) {
            callback(err, null);
        });
    },
    /*
    getLastBalanceSpecial: function (callback, ticker, currency, nb_units) {
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
            callback(null, res, ticker, currency, nb_units);
        }).catch(function(err) {
            callback(err, null);
        });
    },
*/
    getLastBalanceSpecial: function (callback,  LastBalanceTimestamp, OpenOrders) {
        new Promise(function (resolve, reject) {
            let timestamp = LastBalanceTimestamp[0].insert_timestamp;

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
            callback(null, result, OpenOrders);
        }).catch(function(err) {
            console.log(err);
            callback(err, null);
        });
    },
    getMaxInsertTimestamp: function (callback, OpenOrders) {
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
            callback(null, res, OpenOrders);
        }).catch(function(err) {
            callback(err, null);
        });
    },
    purgeData: function (callback, twoDaysAgo) {
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var myquery = {insert_timestamp : {$lte : twoDaysAgo}};
                    // Uncomment 03/01/2020 - 00h40
                    // var myquery = {change: false, insert_timestamp : {$lte : twoDaysAgo}};
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("Balance").deleteMany(myquery, function(err, obj) {
                        if (err){
                            reject(err);
                        } else{
                            console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - DATABASE - > Balance - '+ obj.result.n + ' document(s) deleted');
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

