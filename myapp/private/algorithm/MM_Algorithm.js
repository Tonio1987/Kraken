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
                mm5_upto_60: false,
                mm5_upto_180: false,
                mm5_upto_360: false,
                mm5_upto_540: false,
                mm5_upto_720: false,
                mm5_upto_1440: false,
                mm60_upto_180: false,
                mm60_upto_360: false,
                mm60_upto_540: false,
                mm60_upto_720: false,
                mm60_upto_1440: false,
                mm180_upto_360: false,
                mm180_upto_540: false,
                mm180_upto_720: false,
                mm180_upto_1440: false,
                mm360_upto_540: false,
                mm360_upto_720: false,
                mm360_upto_1440: false,
                mm540_upto_720: false,
                mm540_upto_1440: false,
                mm720_upto_1440: false,
                mm5_on_60_diff: 0,
                mm5_on_180_diff: 0,
                mm5_on_360_diff: 0,
                mm5_on_540_diff: 0,
                mm5_on_720_diff: 0,
                mm5_on_1440_diff: 0,
                mm60_on_180_diff: 0,
                mm60_on_360_diff: 0,
                mm60_on_540_diff: 0,
                mm60_on_720_diff: 0,
                mm60_on_1440_diff: 0,
                mm180_on_360_diff: 0,
                mm180_on_540_diff: 0,
                mm180_on_720_diff: 0,
                mm180_on_1440_diff: 0,
                mm360_on_540_diff: 0,
                mm360_on_720_diff: 0,
                mm360_on_1440_diff: 0,
                mm540_on_720_diff: 0,
                mm540_on_1440_diff: 0,
                mm720_on_1440_diff: 0,
            };

            for(let i=0; i<data.length; i++){
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
            }
            if(mm.mm5 >= mm.mm60){mm.mm5_upto_60 = true;}
            if(mm.mm5 >= mm.mm180){mm.mm5_upto_180 = true;}
            if(mm.mm5 >= mm.mm360){mm.mm5_upto_360 = true;}
            if(mm.mm5 >= mm.mm540){mm.mm5_upto_540 = true;}
            if(mm.mm5 >= mm.mm720){mm.mm5_upto_720 = true;}
            if(mm.mm5 >= mm.mm1440){mm.mm5_upto_1440 = true;}
            if(mm.mm60 >= mm.mm180){mm.mm60_upto_180 = true;}
            if(mm.mm60 >= mm.mm360){mm.mm60_upto_360 = true;}
            if(mm.mm60 >= mm.mm540){mm.mm60_upto_540 = true;}
            if(mm.mm60 >= mm.mm720){mm.mm60_upto_720 = true;}
            if(mm.mm60 >= mm.mm1440){mm.mm60_upto_1440 = true;}
            if(mm.mm180 >= mm.mm360){mm.mm180_upto_360 = true;}
            if(mm.mm180 >= mm.mm540){mm.mm180_upto_540 = true;}
            if(mm.mm180 >= mm.mm720){mm.mm180_upto_720 = true;}
            if(mm.mm180 >= mm.mm1440){mm.mm180_upto_1440 = true;}
            if(mm.mm360 >= mm.mm540){mm.mm360_upto_540 = true;}
            if(mm.mm360 >= mm.mm720){mm.mm360_upto_720 = true;}
            if(mm.mm360 >= mm.mm1440){mm.mm360_upto_1440 = true;}
            if(mm.mm540 >= mm.mm720){mm.mm540_upto_720 = true;}
            if(mm.mm540 >= mm.mm1440){mm.mm540_upto_1440 = true;}
            if(mm.mm720 >= mm.mm1440){mm.mm720_upto_1440 = true;}

            mm.mm5_on_60_diff = (((mm.mm5 - mm.mm60) / mm.mm60)*100).toFixed(2);
            mm.mm5_on_180_diff = (((mm.mm5 - mm.mm180) / mm.mm180)*100).toFixed(2);
            mm.mm5_on_360_diff = (((mm.mm5 - mm.mm360) / mm.mm360)*100).toFixed(2);
            mm.mm5_on_540_diff = (((mm.mm5 - mm.mm540) / mm.mm540)*100).toFixed(2);
            mm.mm5_on_720_diff = (((mm.mm5 - mm.mm720) / mm.mm720)*100).toFixed(2);
            mm.mm5_on_1440_diff = (((mm.mm5 - mm.mm1440) / mm.mm1440)*100).toFixed(2);
            mm.mm60_on_180_diff = (((mm.mm60 - mm.mm180) / mm.mm180)*100).toFixed(2);
            mm.mm60_on_360_diff = (((mm.mm60 - mm.mm360) / mm.mm360)*100).toFixed(2);
            mm.mm60_on_540_diff = (((mm.mm60 - mm.mm540) / mm.mm540)*100).toFixed(2);
            mm.mm60_on_720_diff = (((mm.mm60 - mm.mm720) / mm.mm720)*100).toFixed(2);
            mm.mm60_on_1440_diff = (((mm.mm60 - mm.mm1440) / mm.mm1440)*100).toFixed(2);
            mm.mm180_on_360_diff = (((mm.mm180 - mm.mm360) / mm.mm360)*100).toFixed(2);
            mm.mm180_on_540_diff = (((mm.mm180 - mm.mm540) / mm.mm540)*100).toFixed(2);
            mm.mm180_on_720_diff = (((mm.mm180 - mm.mm720) / mm.mm720)*100).toFixed(2);
            mm.mm180_on_1440_diff = (((mm.mm180 - mm.mm1440) / mm.mm1440)*100).toFixed(2);
            mm.mm360_on_540_diff = (((mm.mm360 - mm.mm540) / mm.mm540)*100).toFixed(2);
            mm.mm360_on_720_diff = (((mm.mm360 - mm.mm720) / mm.mm720)*100).toFixed(2);
            mm.mm360_on_1440_diff = (((mm.mm360 - mm.mm1440) / mm.mm1440)*100).toFixed(2);
            mm.mm540_on_720_diff = (((mm.mm540 - mm.mm720) / mm.mm720)*100).toFixed(2);
            mm.mm540_on_1440_diff = (((mm.mm540 - mm.mm1440) / mm.mm1440)*100).toFixed(2);
            mm.mm720_on_1440_diff = (((mm.mm720 - mm.mm1440) / mm.mm1440)*100).toFixed(2);

            resolve(mm);
        }).then(function(res){
            callback(null, res);
        }).catch(function(err) {
            callback(err, null);
        });
    }
};
