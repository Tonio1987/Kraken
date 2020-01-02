
const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

module.exports = {
    getActiveTriggersKeltner: function (callback, LastBalance, OpenOrders) {
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function (err, db) {
                if (err) {
                    reject(err);
                } else {
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("Trigger").find({algorithm: "Keltner", active: true}).toArray(function (err, result) {
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
            callback(null, result, LastBalance, OpenOrders);
        }).catch(function (err) {
            console.log(err);
            callback(err, null);
        });
    },
    getTriggerAutonomous: function (callback, ActiveTriggersKeltner, LastBalance, OpenOrders) {
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function (err, db) {
                if (err) {
                    reject(err);
                } else {
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("Trigger").find({algorithm: "AutonomousRobot"}).toArray(function (err, result) {
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
            callback(null, result, ActiveTriggersKeltner, LastBalance, OpenOrders);
        }).catch(function (err) {
            console.log(err);
            callback(err, null);
        });
    }
}