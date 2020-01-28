const MongoClient = require('mongodb').MongoClient;
const moment = require('moment');
moment.locale('fr');

module.exports = {
    insertHistory_TradeBalance: function (callback, data) {
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
                        eur_balance: data[0].eur_balance
                    };
                    dbo.collection("History_TradeBalance").insertOne(myobj, function(err, res) {
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
    }
};

