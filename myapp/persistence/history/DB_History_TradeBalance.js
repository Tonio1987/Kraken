const MongoClient = require('mongodb').MongoClient;

module.exports = {
    getHistory_TradeBalances: function (callback) {
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function (err, db) {
                if (err) {
                    reject(err);
                } else {
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("History_TradeBalance").find().sort({insert_timestamp: -1}).toArray(function (err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            db.close();
                            resolve(result);
                        }
                    });
                }
            });
        }).then(function (result) {
            callback(null, result);
        }).catch(function (err) {
            console.log(err);
            callback(err, null);
        });
    }
};

