const moment = require('moment');
var MongoClient = require('mongodb').MongoClient;

moment.locale('fr');

module.exports = {
    upsertTradeHistory: function (data) {
        var date = moment().format('L');
        var hour = moment().format('LTS');
        var timestamp = new Date().getTime();
        var myTradesHistory = [];
        var trades = data.trades;
        for (var trade in trades) {
            if (trades.hasOwnProperty(trade)) {
                var tr = {
                    "updateMany": {
                        "filter": { "tradeid": trade, 'postxid' : trades[trade].postxid, 'ordertxid': trades[trade].ordertxid},
                        "update": { "$set": {
                                insert_date: date,
                                insert_hour: hour,
                                insert_timestamp: timestamp,
                                tradeid: trade,
                                ordertxid: trades[trade].ordertxid,
                                postxid: trades[trade].postxid,
                                pair: trades[trade].pair,
                                trade_time: trades[trade].time,
                                trade_date: moment(trades[trade].time).format('L'),
                                trade_hour: moment(trades[trade].time).format('LTS'),
                                type: trades[trade].type,
                                ordertype: trades[trade].ordertype,
                                price: trades[trade].price,
                                cost: trades[trade].cost,
                                fee: trades[trade].fee,
                                vol: trades[trade].vol,
                                margin: trades[trade].margin,
                                misc: trades[trade].misc
                            } },
                        "upsert": true
                    }
                };
                myTradesHistory.push(tr);
            }
        }
        MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db ) {
            if (err){
                throw err;
            } else{
                var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                dbo.collection("TradesHistory").bulkWrite(myTradesHistory, function(err, res) {
                    if (err){
                        throw err;
                    } else{
                        console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - ### DATABASE ### - > New Trades History isnerted');
                        db.close();
                    }
                });
            }
        });
    }
};

