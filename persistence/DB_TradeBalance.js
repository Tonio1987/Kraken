const moment = require('moment');
const MongoClient = require('mongodb').MongoClient;

moment.locale('fr');

module.exports = {
     insertTradeBalance: function (data, callback) {
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
                         eur_balance: data.eb
                     };
                     dbo.collection("TradeBalance").insertOne(myobj, function(err, res) {
                         if (err){
                             reject(err);
                         } else{
                             console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - ### DATABASE ### - > New Trade Balance isnerted');
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

