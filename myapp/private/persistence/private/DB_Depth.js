const MongoClient = require('mongodb').MongoClient;

function prepareData(pair, insert_date, insert_hour, timestamp){

    var depth = {
        insert_date: date,
        insert_hour: hour,
        insert_timestamp: timestamp,
        price: ,
        volume: ,
        order_timestamp:
    };

    return depth;
}

module.exports = {
    insertBalance: function (callback, data, pair, insert_date, insert_hour, timestamp) {
        var depth = prepareData(pair, insert_date, insert_hour, timestamp);
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function (err, db) {
                if (err) {
                    reject(err);
                } else {
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("Depth").insertOne(depth, function (err, res) {
                        if (err) {
                            reject(err);
                        } else {
                            db.close();
                            resolve(true);
                        }
                    });
                }
            });
        }).then(function (res) {
            callback(null, res);
        }).catch(function (err) {
            callback(err, null);
        });
    }
}