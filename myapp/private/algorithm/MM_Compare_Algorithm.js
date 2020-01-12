const moment = require('moment');
moment.locale('fr');

module.exports = {
    calculateMMCompare: function(callback, MM1440, date, hour, timestamp) {
        new Promise(function (resolve, reject) {
            if(MM1440.length > 0){
                let last_mm5_upto_60 = MM1440[0].mm5_upto_60;
                let last_mm5_upto_180 = MM1440[0].mm5_upto_180;
                let last_mm5_upto_360 = MM1440[0].mm5_upto_360;
                let last_mm5_upto_720 = MM1440[0].mm5_upto_720;
                let last_mm5_upto_1440 = MM1440[0].mm5_upto_1440;
                let last_mm60_upto_180 = MM1440[0].mm60_upto_180;
                let last_mm60_upto_360 = MM1440[0].mm60_upto_360;
                let last_mm60_upto_720 = MM1440[0].mm60_upto_720;
                let last_mm60_upto_1440 = MM1440[0].mm60_upto_1440;
                let last_mm180_upto_360 = MM1440[0].mm180_upto_360;
                let last_mm180_upto_720 = MM1440[0].mm180_upto_720;
                let last_mm180_upto_1440 = MM1440[0].mm180_upto_1440;
                let last_mm360_upto_720 = MM1440[0].mm360_upto_720;
                let last_mm360_upto_1440 = MM1440[0].mm360_upto_1440;
                let last_mm720_upto_1440 = MM1440[0].mm720_upto_1440;

                let mm5_upto_60_since = 0;
                let mm5_upto_180_since = 0;
                let mm5_upto_360_since = 0;
                let mm5_upto_720_since = 0;
                let mm5_upto_1440_since = 0;
                let mm60_upto_180_since = 0;
                let mm60_upto_360_since = 0;
                let mm60_upto_720_since = 0;
                let mm60_upto_1440_since = 0;
                let mm180_upto_360_since = 0;
                let mm180_upto_720_since = 0;
                let mm180_upto_1440_since = 0;
                let mm360_upto_720_since = 0;
                let mm360_upto_1440_since = 0;
                let mm720_upto_1440_since = 0;

                let mm5_upto_60_flag = true;
                let mm5_upto_180_flag = true;
                let mm5_upto_360_flag = true;
                let mm5_upto_720_flag = true;
                let mm5_upto_1440_flag = true;
                let mm60_upto_180_flag = true;
                let mm60_upto_360_flag = true;
                let mm60_upto_720_flag = true;
                let mm60_upto_1440_flag = true;
                let mm180_upto_360_flag = true;
                let mm180_upto_720_flag = true;
                let mm180_upto_1440_flag = true;
                let mm360_upto_720_flag = true;
                let mm360_upto_1440_flag = true;
                let mm720_upto_1440_flag = true;

                for(let i = 0; i<MM1440.length; i++){
                    // COMPARE MM 5 TO HIGHER
                    if(last_mm5_upto_60 === true && mm5_upto_60_flag === true && MM1440[i].mm5_upto_60 === true){
                        mm5_upto_60_since++;
                    }else{
                        mm5_upto_60_flag = false;
                    }

                    if(last_mm5_upto_180 === true && mm5_upto_180_flag === true && MM1440[i].mm5_upto_180 === true){
                        mm5_upto_180_since++;
                    }else{
                        mm5_upto_180_flag = false;
                    }

                    if(last_mm5_upto_360 === true && mm5_upto_360_flag === true && MM1440[i].mm5_upto_360 === true){
                        mm5_upto_360_since++;
                    }else{
                        mm5_upto_360_flag = false;
                    }

                    if(last_mm5_upto_720 === true && mm5_upto_720_flag === true && MM1440[i].mm5_upto_720 === true){
                        mm5_upto_720_since++;
                    }else{
                        mm5_upto_720_flag = false;
                    }

                    if(last_mm5_upto_1440 === true && mm5_upto_1440_flag === true && MM1440[i].mm5_upto_1440 === true){
                        mm5_upto_1440_since++;
                    }else{
                        mm5_upto_1440_flag = false;
                    }

                    // COMPARE MM 60 TO HIGHER
                    if(last_mm60_upto_180 === true && mm60_upto_180_flag === true && MM1440[i].mm60_upto_180 === true){
                        mm60_upto_180_since++;
                    }else{
                        mm60_upto_180_flag = false;
                    }

                    if(last_mm60_upto_360 === true && mm60_upto_360_flag === true && MM1440[i].mm60_upto_360 === true){
                        mm60_upto_360_since++;
                    }else{
                        mm60_upto_360_flag = false;
                    }

                    if(last_mm60_upto_720 === true && mm60_upto_720_flag === true && MM1440[i].mm60_upto_720 === true){
                        mm60_upto_720_since++;
                    }else{
                        mm60_upto_720_flag = false;
                    }

                    if(last_mm60_upto_1440 === true && mm60_upto_1440_flag === true && MM1440[i].mm60_upto_1440 === true){
                        mm60_upto_1440_since++;
                    }else{
                        mm60_upto_1440_flag = false;
                    }

                    // COMPARE MM 180 TO HIGHER
                    if(last_mm180_upto_360 === true && mm180_upto_360_flag === true && MM1440[i].mm180_upto_360 === true){
                        mm180_upto_360_since++;
                    }else{
                        mm180_upto_360_flag = false;
                    }

                    if(last_mm180_upto_720 === true && mm180_upto_720_flag === true && MM1440[i].mm180_upto_720 === true){
                        mm180_upto_720_since++;
                    }else{
                        mm180_upto_720_flag = false;
                    }

                    if(last_mm180_upto_1440 === true && mm180_upto_1440_flag === true && MM1440[i].mm180_upto_1440 === true){
                        mm180_upto_1440_since++;
                    }else{
                        mm180_upto_1440_flag = false;
                    }

                    // COMPARE MM 360 TO HIGHER
                    if(last_mm360_upto_720 === true && mm360_upto_720_flag === true && MM1440[i].mm360_upto_720 === true){
                        mm360_upto_720_since++;
                    }else{
                        mm360_upto_720_flag = false;
                    }

                    if(last_mm360_upto_1440 === true && mm360_upto_1440_flag === true && MM1440[i].mm360_upto_1440 === true){
                        mm360_upto_1440_since++;
                    }else{
                        mm360_upto_1440_flag = false;
                    }

                    // COMPARE MM 360 TO HIGHER
                    if(last_mm720_upto_1440 === true && mm720_upto_1440_flag === true && MM1440[i].mm720_upto_1440 === true){
                        mm720_upto_1440_since++;
                    }else{
                        mm720_upto_1440_flag = false;
                    }

                }

                let mmCompare = {
                    insert_date: date,
                    insert_hour: hour,
                    insert_timestamp: timestamp,
                    pair: MM1440[0].pair,
                    mm5_upto_60_since: mm5_upto_60_since,
                    mm5_upto_180_since: mm5_upto_180_since,
                    mm5_upto_360_since: mm5_upto_360_since,
                    mm5_upto_720_since: mm5_upto_720_since,
                    mm5_upto_1440_since: mm5_upto_1440_since,
                    mm60_upto_180_since: mm60_upto_180_since,
                    mm60_upto_360_since: mm60_upto_360_since,
                    mm60_upto_720_since: mm60_upto_720_since,
                    mm60_upto_1440_since: mm60_upto_1440_since,
                    mm180_upto_360_since: mm180_upto_360_since,
                    mm180_upto_720_since: mm180_upto_720_since,
                    mm180_upto_1440_since: mm180_upto_1440_since,
                    mm360_upto_720_since: mm360_upto_720_since,
                    mm360_upto_1440_since: mm360_upto_1440_since,
                    mm720_upto_1440_since: mm720_upto_1440_since
                };

                resolve(mmCompare);
            }else{
                let mmCompare = {};
                resolve(mmCompare);
            }
        }).then(function(res){
            callback(null, res);
        }).catch(function(err) {
            callback(err, null);
        });
    }
};
