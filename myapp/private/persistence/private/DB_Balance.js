const moment = require('moment/moment');
const MongoClient = require('mongodb').MongoClient;

moment.locale('fr');

function prepareData(data){
    var date = moment().format('L');
    var hour = moment().format('LTS');
    var timestamp = new Date().getTime();
    // Cette limite permet d'éviter d'indiquer dans le portefeuille les fractions de parts de cryptos non détenues
    var limite = 0.0001;
    var myBalance = [];
    for (var i in data) {
        if (data.hasOwnProperty(i)) {
            if (data[i] > limite) {
                var currency = i;
                var units = data[i];
                var elementOfMyBalance = {
                    insert_date: date,
                    insert_hour: hour,
                    insert_timestamp: timestamp,
                    currency: currency,
                    units: units
                };
                myBalance.push(elementOfMyBalance);
            }
        }
    }
    return myBalance;
}

module.exports = {
    insertBalance: function (callback, data) {
        var myBalance = prepareData(data);
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function (err, db) {
                if (err) {
                    reject(err);
                } else {
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("Balance").insertMany(myBalance, function (err, res) {
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
    getMaxInsertTimestamp: function (callback) {
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
    purgeData: function (callback, twoDaysAgo) {
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var myquery = {insert_timestamp : {$lte : twoDaysAgo}};
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

