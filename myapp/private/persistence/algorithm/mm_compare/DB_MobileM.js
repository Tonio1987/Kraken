const moment = require('moment/moment');
const MongoClient = require('mongodb').MongoClient;

moment.locale('fr');

module.exports = {
    getLast1440MM: function (callback, pair, param_fw1) {
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("MobileM").find({ pair: pair }).sort({insert_timestamp: -1}).limit(1440).toArray(function(err, result) {
                        if (err){
                            reject(err);
                        }
                        db.close();
                        resolve(result);
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
