const MongoClient = require('mongodb').MongoClient;
const moment = require('moment');
moment.locale('fr');

module.exports = {
     insertTradeBalance: function (callback, data) {
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
    getLastTradeBalance: function (callback) {
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
    }
};

