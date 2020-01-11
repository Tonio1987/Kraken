const moment = require('moment');
moment.locale('fr');

module.exports = {
    calculateMM: function(callback, data, date, hour, timestamp) {
        new Promise(function (resolve, reject) {

            let count = 0;
            let sum = 0;
            let mm5_upto_60 = false;
            let mm5_upto_180 = false;
            let mm5_upto_360 = false;
            let mm5_upto_720 = false;
            let mm5_upto_1440 = false;
            let mm60_upto_180 = false;
            let mm60_upto_360 = false;
            let mm60_upto_720 = false;
            let mm60_upto_1440 = false;
            let mm180_upto_360 = false;
            let mm180_upto_720 = false;
            let mm180_upto_1440 = false;
            let mm360_upto_720 = false;
            let mm360_upto_1440 = false;
            let mm720_upto_1440 = false;
            let since_mm5_upto_60 = 0;
            let since_mm5_upto_180 = 0;
            let since_mm5_upto_360 = 0;
            let since_mm5_upto_720 = 0;
            let since_mm5_upto_1440 = 0;
            let since_mm60_upto_180 = 0;
            let since_mm60_upto_360 = 0;
            let since_mm60_upto_720 = 0;
            let since_mm60_upto_1440 = 0;
            let since_mm180_upto_360 = 0;
            let since_mm180_upto_720 = 0;
            let since_mm180_upto_1440 = 0;
            let since_mm360_upto_720 = 0;
            let since_mm360_upto_1440 = 0;
            let since_mm720_upto_1440 = 0;

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
                mm5_upto_60: false,
                mm5_upto_180: false,
                mm5_upto_360: false,
                mm5_upto_720: false,
                mm5_upto_1440: false,
                mm60_upto_180: false,
                mm60_upto_360: false,
                mm60_upto_720: false,
                mm60_upto_1440: false,
                mm180_upto_360: false,
                mm180_upto_720: false,
                mm180_upto_1440: false,
                mm360_upto_720: false,
                mm360_upto_1440: false,
                mm720_upto_1440: false
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
            if(mm.mm5 >= mm.mm60){mm.mm5_upto_60 = true;}
            if(mm.mm5 >= mm.mm180){mm.mm5_upto_180 = true;}
            if(mm.mm5 >= mm.mm360){mm.mm5_upto_360 = true;}
            if(mm.mm5 >= mm.mm720){mm.mm5_upto_720 = true;}
            if(mm.mm5 >= mm.mm1440){mm.mm5_upto_1440 = true;}
            if(mm.mm60 >= mm.mm180){mm.mm60_upto_180 = true;}
            if(mm.mm60 >= mm.mm360){mm.mm60_upto_360 = true;}
            if(mm.mm60 >= mm.mm720){mm.mm60_upto_720 = true;}
            if(mm.mm60 >= mm.mm1440){mm.mm60_upto_1440 = true;}
            if(mm.mm180 >= mm.mm360){mm.mm180_upto_360 = true;}
            if(mm.mm180 >= mm.mm720){mm.mm180_upto_720 = true;}
            if(mm.mm180 >= mm.mm1440){mm.mm180_upto_1440 = true;}
            if(mm.mm360 >= mm.mm720){mm.mm360_upto_720 = true;}
            if(mm.mm360 >= mm.mm1440){mm.mm360_upto_1440 = true;}
            if(mm.mm720 >= mm.mm1440){mm.mm720_upto_1440 = true;}

            resolve(mm);
        }).then(function(res){
            callback(null, res);
        }).catch(function(err) {
            err = 'Error during MM calculation';
            callback(err, null);
        });
    }
};
