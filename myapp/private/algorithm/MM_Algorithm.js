const moment = require('moment');
moment.locale('fr');

module.exports = {
    calculateMM: function(callback, data, date, hour, timestamp) {
        new Promise(function (resolve, reject) {

            let count = 0;
            let sum = 0;
            let  mm = {
                insert_date: date,
                insert_hour: hour,
                insert_timestamp: timestamp,
                pair: data[0].pair,
                mm5: 0,
                mm15: 0,
                mm30: 0,
                mm45: 0,
                mm60: 0,
                mm75: 0,
                mm90: 0,
                mm105: 0,
                mm120: 0,
                mm180: 0,
                mm360: 0,
                mm540: 0,
                mm720: 0,
                mm1440: 0,
            };
            for(let ticker in data){
                if (data.hasOwnProperty(ticker)) {
                    count++;
                }else{
                    reject();
                }
            }
            count = 0;
            for(let i in data){
                if (data.hasOwnProperty(i)) {
                    sum = sum + data[i].ask_price;
                    count++;
                    if(count === 5){mm.mm5 = sum/count;}
                    if(count === 15){mm.mm15 = sum/count;}
                    if(count === 30){mm.mm30 = sum/count;}
                    if(count === 45){mm.mm45 = sum/count;}
                    if(count === 60){mm.mm60 = sum/count;}
                    if(count === 75){mm.mm75 = sum/count;}
                    if(count === 90){mm.mm90 = sum/count;}
                    if(count === 105){mm.mm105 = sum/count;}
                    if(count === 120){mm.mm120 = sum/count;}
                    if(count === 180){mm.mm180 = sum/count;}
                    if(count === 360){mm.mm360 = sum/count;}
                    if(count === 540){mm.mm540 = sum/count;}
                    if(count === 720){mm.mm720 = sum/count;}
                    if(count === 1440){mm.mm1440 = sum/count;}
                }else{
                    reject();
                }
            }
            resolve(mm);
        }).then(function(res){
            callback(null, res);
        }).catch(function(err) {
            err = 'Error during MM calculation';
            callback(err, null);
        });
    }
};
