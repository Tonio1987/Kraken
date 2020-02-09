const moment = require('moment');
const MongoClient = require('mongodb').MongoClient;

moment.locale('fr');

module.exports = {
    insert_Stat_Evol_Ticker: function (callback, stat, param_fw1) {
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("Stat_CryptoEvol").insertOne(stat, function (err, res) {
                        if (err){
                            reject(err);
                        }
                        db.close();
                        resolve(res);
                    });
                }
            });
        }).then(function(data){
            callback(null, data, param_fw1);
        }).catch(function(err) {
            callback(err, null);
        });
    }
};
