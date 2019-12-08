const moment = require('moment');
moment.locale('fr');

module.exports = {
    calculateMMEvol: function(data, callback) {
        console.log(data);
        new Promise(function (resolve, reject) {
            var date = moment().format('L');
            var hour = moment().format('LTS');
            var timestamp = new Date().getTime();
            let count = 0;
            let  mmEvol = {
                insert_date: date,
                insert_hour: hour,
                insert_timestamp: timestamp,
                pair: data[0].pair,
                evol_mm5: 0,
                evol_mm15: 0,
                evol_mm30: 0,
                evol_mm45: 0,
                evol_mm60: 0,
                evol_mm75: 0,
                evol_mm90: 0,
                evol_mm105: 0,
                evol_mm120: 0
            };
            for(let MM in data){
                if (data.hasOwnProperty(MM)) {
                    count++;
                }else{
                    reject();
                }
            }

            if(count >= 5){
                mmEvol.mm5 = ((data[0].mm5-data[4].mm5)/data[4].mm5)*100;
            }
            if(count >= 15){mmEvol.mm15 = ((data[0].mm15-data[14].mm15)/data[14].mm15)*100;}
            if(count >= 30){mmEvol.mm30 = ((data[0].mm30-data[29].mm30)/data[29].mm30)*100;}
            if(count >= 45){mmEvol.mm45 = ((data[0].mm45-data[44].mm45)/data[44].mm45)*100;}
            if(count >= 60){mmEvol.mm60 = ((data[0].mm60-data[59].mm60)/data[59].mm60)*100;}
            if(count >= 75){mmEvol.mm75 = ((data[0].mm75-data[74].mm75)/data[74].mm75)*100;}
            if(count >= 90){mmEvol.mm90 = ((data[0].mm90-data[89].mm90)/data[89].mm90)*100;}
            if(count >= 105){mmEvol.mm105 = ((data[0].mm105-data[104].mm105)/data[104].mm105)*100;}
            if(count >= 120){mmEvol.mm120 = ((data[0].mm120-data[119].mm120)/data[119].mm120)*100;}

            resolve(mmEvol);
        }).then(function(res){
            callback(null, res);
        }).catch(function(err) {
            err = 'Error during MMEvol calculation';
            callback(err, null);
        });
    }
};
