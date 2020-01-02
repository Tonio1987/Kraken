const moment = require('moment/moment');
const MongoClient = require('mongodb').MongoClient;

moment.locale('fr');


module.exports = {
    getLastKeltner: function (callback, pairList, param_fw1, param_fw2, param_fw3,  param_fw4, param_fw5) {
        new Promise(function (resolve, reject) {

            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("Keltner").find({ pair: {$in: pairList} }).sort({insert_timestamp: -1}).limit(pairList.length).toArray(function(err, result) {
                        if (err){
                            reject(err);
                        }
                        db.close();
                        resolve(result);
                    });
                }
            });
        }).then(function(data){
            callback(null, data, pairList, param_fw1, param_fw2, param_fw3,  param_fw4, param_fw5);
        }).catch(function(err) {
            callback(err, null, pairList, param_fw1, param_fw2, param_fw3,  param_fw4, param_fw5);
        });
    }
};