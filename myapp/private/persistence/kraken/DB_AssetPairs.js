const moment = require('moment');
const MongoClient = require('mongodb').MongoClient;

moment.locale('fr');

function prepareData(data){
    var date = moment().format('L');
    var hour = moment().format('LTS');
    var timestamp = new Date().getTime();
    var myAssetPairs = [];
    let i = 0;
    let darkpool = false;
    for (let asset in data) {
        let lastTwo = asset.substr(asset.length - 2);
        if(lastTwo === ".d"){darkpool = true;}else{darkpool = false;}
        if (data.hasOwnProperty(asset)) {
            var ass = {
                insert_date: date,
                insert_hour: hour,
                insert_timestamp: timestamp,
                darkpool: darkpool,
                name: asset,
                altname: data[asset].altname,
                wsname: data[asset].wsname,
                aclass_base: data[asset].aclass_base,
                base: data[asset].base,
                aclass_quote: data[asset].aclass_quote,
                quote: data[asset].quote,
                lot: data[asset].lot,
                pair_decimals: data[asset].pair_decimals,
                lot_decimals: data[asset].lot_decimals,
                lot_multiplier: data[asset].lot_multiplier,
                leverage_buy: data[asset].leverage_buy,
                leverage_sell: data[asset].leverage_sell,
                fees: data[asset].fees,
                fees_maker: data[asset].fees_maker,
                fee_volume_currency: data[asset].fee_volume_currency,
                margin_call: data[asset].margin_call,
                margin_stop: data[asset].margin_stop
            };
            myAssetPairs.push(ass);
            i++;
        }
    }
    return myAssetPairs;
}

module.exports = {
    dropAssetPairs: function(callback){
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("AssetPairs").drop(function(err, delOK) {
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
            callback(res);
        }).catch(function(err) {
            callback(err);
        });
    },
    insertAssetPairs: function (callback, data) {
        var myAssetPairs = prepareData(data);
        new Promise(function (resolve, reject) {
            if(myAssetPairs.length > 0){
                MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db ) {
                    if (err){
                        reject(err);
                    } else{
                        var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                        dbo.collection("AssetPairs").insertMany(myAssetPairs, function(err, res) {
                            if (err){
                                reject(err);
                            } else{
                                db.close();
                                resolve(true);
                            }
                        });
                    }
                });
            }else{
                resolve(true);
            }
        }).then(function(res){
            callback(null, res);
        }).catch(function(err) {
            callback(err, null);
        });
    },
    getAllPairs: function (callback) {
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("AssetPairs").find({darkpool: false}).toArray(function(err, result) {
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
    getEurPair: function (callback, currency, param_fw1, param_fw2) {
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("AssetPairs").find({darkpool: false, quote: "ZEUR", base: currency}).toArray(function(err, result) {
                        if (err){
                            reject(err);
                        }
                        db.close();
                        resolve(result);
                    });
                }
            });
        }).then(function(data){
            callback(null, data, currency, param_fw1, param_fw2);
        }).catch(function(err) {
            callback(err, null);
        });
    }
};

