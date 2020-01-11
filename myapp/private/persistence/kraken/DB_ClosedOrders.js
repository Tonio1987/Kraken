const moment = require('moment');
const MongoClient = require('mongodb').MongoClient;

moment.locale('fr');

function prepareData(data){
    var date = moment().format('L');
    var hour = moment().format('LTS');
    var timestamp = new Date().getTime();

    var myClosedOrders = [];
    var orders = data.closed;
    for (var order in orders) {
        if (orders.hasOwnProperty(order)) {
            var ord = {
                    insert_date: date,
                    insert_hour: hour,
                    insert_timestamp: timestamp,
                    orderid: order,
                    status: orders[order].status,
                    reason: orders[order].reason,
                    opentm: orders[order].opentm,
                    opentm_date: moment(orders[order].opentm).format('L'),
                    opentm_hour: moment(orders[order].opentm).format('LTS'),
                    closetm: orders[order].closetm,
                    closetm_date: moment(orders[order].closetm).format('L'),
                    closetm_hour: moment(orders[order].closetm).format('LTS'),
                    pair: orders[order].descr.pair,
                    type: orders[order].descr.type,
                    ordertype: orders[order].descr.ordertype,
                    price: orders[order].descr.price,
                    price2: orders[order].descr.price2,
                    leverage: orders[order].descr.leverage,
                    order: orders[order].descr.order,
                    close: orders[order].descr.close,
                    vol: orders[order].vol,
                    vol_exec: orders[order].vol_exec,
                    cost: orders[order].cost,
                    fee: orders[order].fee,
                    price3: orders[order].price,
                    misc: orders[order].misc,
                    oflags: orders[order].oflags,
                    refid: orders[order].refid,
                    userref: orders[order].userref,
                    starttm: orders[order].starttm,
                    expiretm: orders[order].expiretm
                }
            myClosedOrders.push(ord);
        }
    }
    return myClosedOrders;
}

module.exports = {
    upsertClosedOrders: function (callback, data) {
        var myClosedOrders = prepareData(data);
        new Promise(function (resolve, reject) {
            if(myClosedOrders.length > 0){
                MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db ) {
                    if (err){
                        console.error(err);
                        reject(err);
                    } else{
                        var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                        dbo.collection("ClosedOrders").insertMany(myClosedOrders, function(err, res) {
                            if (err){
                                reject(err);
                            } else{
                                db.close();
                                resolve(true);
                            }
                        });
                    }
                });
            }else{
                resolve(true);
            }
        }).then(function(res){
            callback(null, res);
        }).catch(function(err) {
            callback(err, null);
        });
    },
    dropClosedOrders: function(callback){
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("ClosedOrders").drop(function(err, delOK) {
                        if (err){
                            reject(err);
                        } else{
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

