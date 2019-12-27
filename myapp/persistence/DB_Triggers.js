
const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

module.exports = {
    getTriggersMMEvol: function (callback) {
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function (err, db) {
                if (err) {
                    reject(err);
                } else {
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("Trigger").find({algorithm: "MMEvol"}).sort({period: 1}).toArray(function (err, result) {
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
    },
    changeTriggerStatus : function (callback, trrig_id, active) {
        new Promise(function (resolve, reject) {
            if(active === true){
                active = false;
            }else{
                active = true;
            }
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    var myquery = {_id:  ObjectID(trrig_id)};
                    var newvalues = { $set: {active: active}};
                    dbo.collection("Trigger").updateOne(myquery, newvalues, function(err, result) {
                        if (err){
                            reject(err);
                        } else{
                            db.close();
                            resolve(result);
                        }
                    });
                }
            });
        }).then(function(result){
            callback(null, result);
        }).catch(function(err) {
            console.log(err);
            callback(err, null);
        });
    },
}