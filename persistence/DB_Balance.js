const moment = require('moment');
const MongoClient = require('mongodb').MongoClient;

moment.locale('fr');

function prepareData(data){
    var date = moment().format('L');
    var hour = moment().format('LTS');
    var timestamp = new Date().getTime();
    // Cette limite permet d'éviter d'indiquer dans le portefeuille les fractions de parts de cryptos non détenues
    var limite = 0.0001;
    var myBalance = [];
    for (var i in data) {
        if (data.hasOwnProperty(i)) {
            if (data[i] > limite) {
                var currency = i;
                var units = data[i];
                var elementOfMyBalance = {
                    insert_date: date,
                    insert_hour: hour,
                    insert_timestamp: timestamp,
                    currency: currency,
                    units: units
                };
                myBalance.push(elementOfMyBalance);
            }
        }
    }
    return myBalance;
}

module.exports = {
    insertBalance: function (data, callback) {
        var myBalance = prepareData(data);
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function (err, db) {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("Balance").insertMany(myBalance, function (err, res) {
                        if (err) {
                            console.error(err);
                            reject(err);
                        } else {
                            console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - ### DATABASE ### - > New Balance currency isnerted');
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

