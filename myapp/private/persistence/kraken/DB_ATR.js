const moment = require('moment');
var MongoClient = require('mongodb').MongoClient;

moment.locale('fr');

function prepareData(ohlcs, pair, interval, count, insert_date, insert_hour, timestamp){
    let atrs = [];
    let length = 0;
    let High = 0;
    let Low = 0;
    let Close = 0;
    let H_minus_L = 0;
    let H_minus_CL = 0;
    let L_minus_CL = 0;
    let TR = 0;
    let ATR = 0;

    if(count > 0){
        let High = ohlcs[ohlcs.length-1].high;
        let Low = ohlcs[ohlcs.length-1].low;
        let Close = ohlcs[ohlcs.length-2].close;

        H_minus_L = Math.abs(High-Low);
        H_minus_CL = Math.abs(High-Close);
        L_minus_CL = Math.abs(Low-Close);

        // Calcul du True range
        if(H_minus_L > H_minus_CL && H_minus_L > L_minus_CL){
            TR = H_minus_L;
        }else if( H_minus_CL > L_minus_CL){
            TR = H_minus_CL;
        }else{
            TR = L_minus_CL;
        }

        ATR = ((ohlcs[ohlcs.length-2].ATR * 13) + TR) / 14;
        var new_atr = {
            insert_date: insert_date,
            insert_hour: insert_hour,
            insert_timestamp: timestamp,
            pair: pair,
            interval: interval,
            time: ohlcs[ohlcs.length-1].time,
            time_date: ohlcs[ohlcs.length-1].time_date,
            time_hour: ohlcs[ohlcs.length-1].time_hour,
            high: High,
            Low: Low,
            Close: Close,
            h_minus_l: H_minus_L,
            h_minus_cl: H_minus_CL,
            l_minus_cl: L_minus_CL,
            TR: TR,
            ATR: ATR
        }
        atrs.push(new_atr);
    }else{
        let listTR = [];

        for(let i=13; i>=0; i--){
            if(i===13){
                High = ohlcs[i].high;
                Low = ohlcs[i].low;
                H_minus_L = Math.abs(High - Low);
                TR = H_minus_L;
                listTR.push(TR);
                var new_atr = {
                    insert_date: insert_date,
                    insert_hour: insert_hour,
                    insert_timestamp: timestamp,
                    pair: pair,
                    interval: interval,
                    time: ohlcs[i].time,
                    time_date: ohlcs[i].time_date,
                    time_hour: ohlcs[i].time_hour,
                    high: High,
                    Low: Low,
                    Close: Close,
                    h_minus_l: H_minus_L,
                    h_minus_cl: 0,
                    l_minus_cl: 0,
                    TR: TR,
                    ATR: 0
                }

                atrs.push(new_atr);
            }else if(i>0){
                High = ohlcs[i].high;
                Low = ohlcs[i].low;
                Close = ohlcs[i+1].close;
                H_minus_L = Math.abs(High-Low);
                H_minus_CL = Math.abs(High-Close);
                L_minus_CL = Math.abs(Low-Close);

                // Calcul du True range
                if(H_minus_L > H_minus_CL && H_minus_L > L_minus_CL){
                    TR = H_minus_L;
                }else if( H_minus_CL > L_minus_CL){
                    TR = H_minus_CL;
                }else{
                    TR = L_minus_CL;
                }
                listTR.push(TR);
                var new_atr = {
                    insert_date: insert_date,
                    insert_hour: insert_hour,
                    insert_timestamp: timestamp,
                    pair: pair,
                    interval: interval,
                    time: ohlcs[i].time,
                    time_date: ohlcs[i].time_date,
                    time_hour: ohlcs[i].time_hour,
                    high: High,
                    Low: Low,
                    Close: Close,
                    h_minus_l: H_minus_L,
                    h_minus_cl: H_minus_CL,
                    l_minus_cl: L_minus_CL,
                    TR: TR,
                    ATR: 0
                }
                atrs.push(new_atr);
            }else if(i===0){
                High = ohlcs[i].high;
                Low = ohlcs[i].low;
                Close = ohlcs[i+1].close;
                H_minus_L = Math.abs(High-Low);
                H_minus_CL = Math.abs(High-Close);
                L_minus_CL = Math.abs(Low-Close);

                // Calcul du True range
                if(H_minus_L > H_minus_CL && H_minus_L > L_minus_CL){
                    TR = H_minus_L;
                }else if( H_minus_CL > L_minus_CL){
                    TR = H_minus_CL;
                }else{
                    TR = L_minus_CL;
                }
                listTR.push(TR);

                // Calcul du premier ATR
                let sumOfTR = 0
                for(let j=0; j<listTR.length; j++){
                    sumOfTR = sumOfTR+listTR[j];
                }
                ATR = sumOfTR / 14;

                var new_atr = {
                    insert_date: insert_date,
                    insert_hour: insert_hour,
                    insert_timestamp: timestamp,
                    pair: pair,
                    interval: interval,
                    time: ohlcs[i].time,
                    time_date: ohlcs[i].time_date,
                    time_hour: ohlcs[i].time_hour,
                    high: High,
                    Low: Low,
                    Close: Close,
                    h_minus_l: H_minus_L,
                    h_minus_cl: H_minus_CL,
                    l_minus_cl: L_minus_CL,
                    TR: TR,
                    ATR: ATR
                }
                atrs.push(new_atr);
            }
        }
    }

    return atrs;
}

module.exports = {
    insertATR: function (callback, ohlcs, pair, interval, count, insert_date, insert_hour, timestamp) {
        var atr = prepareData(ohlcs, pair, interval, count, insert_date, insert_hour, timestamp);
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function (err, db) {
                if (err) {
                    reject(err);
                } else {
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("ATR").insertMany(atr, function (err, res) {
                        if (err) {
                            reject(err);
                        } else {
                            db.close();
                            resolve(true);
                        }
                    });
                }
            });
        }).then(function (res) {
            callback(null, res);
        }).catch(function (err) {
            callback(err, null);
        });
    },
    countATR: function (callback, interval, param_fw1) {
        new Promise(function (resolve, reject) {
            MongoClient.connect(process.env.MONGO_SERVER_URL, {useUnifiedTopology: true}, function(err, db) {
                if (err){
                    reject(err);
                } else{
                    var dbo = db.db(process.env.MONGO_SERVER_DATABASE);
                    dbo.collection("ATR").find({"interval" : interval}).count(function (err, nbDoc) {
                        if (err) {
                            console.log(err);
                            resolve(0);
                        } else {
                            db.close();
                            resolve(nbDoc);
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
};