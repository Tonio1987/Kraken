const moment = require('moment/moment');
const MongoClient = require('mongodb').MongoClient;

moment.locale('fr');

function prepareData(lastBalance, bid_price, currency, nb_units, date, hour, timestamp){
    let change = false;
    for(elem in lastBalance){
        if(lastBalance.hasOwnProperty(elem)){
            if(lastBalance[elem].currency == currency){
                if(lastBalance[elem].units != nb_units){
                    console.log('\x1b[32m', moment().format('L') + ' - ' + moment().format('LTS') + ' - > --- DB BALANCE --- NEW ELEMENT IN BALANCE : '+currency + ' '+ nb_units +  '  OLD : '+ lastBalance[elem].units, '\x1b[0m');
                    change = true;
                }
            }
        }
    }

    var eur_value = 0;
    // Cas de l'EURO et du DOGE
    if(bid_price > 0){
        eur_value = nb_units*bid_price;
    }else{
        eur_value = nb_units;
    }

    var elementOfMyBalance = {
        insert_date: date,
        insert_hour: hour,
        insert_timestamp: timestamp,
        currency: currency,
        units: nb_units,
        price: bid_price,
        eur_value: eur_value,
        change: change
    };

    return elementOfMyBalance;
}

module.exports = {
    insertBalance: function (callback, lastBalance, bid_price, currency, nb_units, date, hour, timestamp, param_fw1) {
        var elementOfMyBalance = prepareData(lastBalance, bid_price, currency, nb_units, date, hour, timestamp);
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function (err, db) {
                if (err) {
                    reject(err);
                } else {
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("Balance").insertOne(elementOfMyBalance, function (err, res) {
                        if (err) {
                            reject(err);
                        } else {
                            db.close();
                            resolve(true);
                        }
                    });
                }
            });
        }).then(function(res){
            callback(null, res, param_fw1);
        }).catch(function(err) {
            callback(err, null);
        });
     },
    getLastBalanceElement: function (callback, currency, param_fw1, param_fw2, param_fw3) {
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("Balance").find({currency: currency}).sort({insert_timestamp: -1}).limit(1).toArray(function(err, result) {
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
            callback(null, res, currency, param_fw1, param_fw2, param_fw3);
        }).catch(function(err) {
            callback(err, null);
        });
    },

};

