const moment = require('moment');
var MongoClient = require('mongodb').MongoClient;

moment.locale('fr');

module.exports = {
     insertTradeBalance: function (data) {
         var timestamp = new Date().getTime();
         MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
             if (err){
                 throw err;
             } else{
                 var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                 var myobj = {
                     date: moment().format('L'),
                     time: moment().format('LTS'),
                     timestamp: timestamp,
                     eur_balance: data.eb
                 };
                 dbo.collection("TradeBalance").insertOne(myobj, function(err, res) {
                     if (err){
                         throw err;
                     } else{
                         console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - ### DATABASE ### - > New Trade Balance isnerted');
                         db.close();
                     }
                 });
             }
         });
     }
};

