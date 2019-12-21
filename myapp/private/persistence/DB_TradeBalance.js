const moment = require('moment');
const MongoClient = require('mongodb').MongoClient;

moment.locale('fr');

module.exports = {
     insertTradeBalance: function (data, callback) {
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
                         eur_balance: data.eb
                     };
                     dbo.collection("TradeBalance").insertOne(myobj, function(err, res) {
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
                    dbo.collection("TradeBalance").find().sort({insert_timestamp: -1}).limit(1).toArray(function(err, result) {
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
                    dbo.collection("TradeBalance").deleteMany(myquery, function(err, obj) {
                        if (err){
                            reject(err);
                        } else{
                            console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - DATABASE - > TradeBalance - '+ obj.result.n + ' document(s) deleted');
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

