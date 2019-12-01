const moment = require('moment');
var MongoClient = require('mongodb').MongoClient;

moment.locale('fr');

module.exports = {
    insertTicker: function (data, pair, callback) {
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
                        pair: pair,
                        ask_price: data[pair].a[0],
                        bid_price: data[pair].b[0],
                        last_trade_closed_price: data[pair].c[0],
                        vol_today: data[pair].v[0],
                        vol_last_24: data[pair].v[1],
                        vol_wghted_avg_price_today: data[pair].p[0],
                        vol_wghted_avg_price_last_24: data[pair].p[1],
                        nb_of_trades_today: data[pair].t[0],
                        nb_of_trades_last_24: data[pair].t[1],
                        low_today: data[pair].l[0],
                        low_last_24: data[pair].l[1],
                        high_today: data[pair].h[0],
                        high_last_24: data[pair].h[1],
                        opening_price: data[pair].o
                    };
                    dbo.collection("Ticker").insertOne(myobj, function(err, res) {
                        if (err){
                            reject(err);
                        } else{
                            console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - ### DATABASE ### - > Ticker for '+pair+' isnerted');
                            db.close();
                            resolve(true);
                        }
                    });
                }
            });
        }).then(function(res){
            callback(res);
        }).catch(function(err) {
            callback(err);
        });

    }
};

