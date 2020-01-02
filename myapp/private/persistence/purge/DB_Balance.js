const moment = require('moment/moment');
const MongoClient = require('mongodb').MongoClient;

moment.locale('fr');

module.exports = {
    getMaxInsertTimestamp: function (callback, OpenOrders) {
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("Balance").find().sort({insert_timestamp: -1}).limit(1).toArray(function(err, result) {
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
            callback(null, res, OpenOrders);
        }).catch(function(err) {
            callback(err, null);
        });
    },
    purgeData: function (callback, twoDaysAgo) {
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var myquery = {insert_timestamp : {$lte : twoDaysAgo}};
                    // Uncomment 03/01/2020 - 00h40
                    // var myquery = {change: false, insert_timestamp : {$lte : twoDaysAgo}};
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("Balance").deleteMany(myquery, function(err, obj) {
                        if (err){
                            reject(err);
                        } else{
                            console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - DATABASE - > Balance - '+ obj.result.n + ' document(s) deleted');
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

