var MongoClient = require('mongodb').MongoClient;
var API_Ticker = require('../api/kraken/API_Ticker');

module.exports = {
    LoadTicker: function () {
        MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
            if (err){
                throw err;
            } else{
                var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                dbo.collection("Pairs").find({}).toArray(function(err, result) {
                    if (err){
                        throw err;
                    } else{
                        result.forEach(function(pair){
                            API_Ticker.kraken_Ticker(pair.kraken_pair_name);
                        });
                    }
                    db.close();
                });
            }
        });
    }
};