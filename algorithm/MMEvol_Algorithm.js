const moment = require('moment');
moment.locale('fr');

module.exports = {
    calculateMMEvol: function(data, callback) {
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
                evol_1p_mm5: 0,
                evol_5p_mm5: 0,
                evol_15p_mm5: 0,
                evol_30p_mm5: 0,
                evol_45p_mm5: 0,
                evol_60p_mm5: 0,
                evol_75p_mm5: 0,
                evol_90p_mm5: 0,
                evol_105p_mm5: 0,
                evol_120p_mm5: 0,
                evol_180p_mm5: 0,
                evol_360p_mm5: 0,
                evol_540p_mm5: 0,
                evol_720p_mm5: 0,
                evol_1440p_mm5: 0,
                evol_1p_mm15: 0,
                evol_5p_mm15: 0,
                evol_15p_mm15: 0,
                evol_30p_mm15: 0,
                evol_45p_mm15: 0,
                evol_60p_mm15: 0,
                evol_75p_mm15: 0,
                evol_90p_mm15: 0,
                evol_105p_mm15: 0,
                evol_120p_mm15: 0,
                evol_180p_mm15: 0,
                evol_360p_mm15: 0,
                evol_540p_mm15: 0,
                evol_720p_mm15: 0,
                evol_1440p_mm15: 0,
                evol_1p_mm30: 0,
                evol_5p_mm30: 0,
                evol_15p_mm30: 0,
                evol_30p_mm30: 0,
                evol_45p_mm30: 0,
                evol_60p_mm30: 0,
                evol_75p_mm30: 0,
                evol_90p_mm30: 0,
                evol_105p_mm30: 0,
                evol_120p_mm30: 0,
                evol_180p_mm30: 0,
                evol_360p_mm30: 0,
                evol_540p_mm30: 0,
                evol_720p_mm30: 0,
                evol_1440p_mm30: 0,
                evol_1p_mm45: 0,
                evol_5p_mm45: 0,
                evol_15p_mm45: 0,
                evol_30p_mm45: 0,
                evol_45p_mm45: 0,
                evol_60p_mm45: 0,
                evol_75p_mm45: 0,
                evol_90p_mm45: 0,
                evol_105p_mm45: 0,
                evol_120p_mm45: 0,
                evol_180p_mm45: 0,
                evol_360p_mm45: 0,
                evol_540p_mm45: 0,
                evol_720p_mm45: 0,
                evol_1440p_mm45: 0,
                evol_1p_mm60: 0,
                evol_5p_mm60: 0,
                evol_15p_mm60: 0,
                evol_30p_mm60: 0,
                evol_45p_mm60: 0,
                evol_60p_mm60: 0,
                evol_75p_mm60: 0,
                evol_90p_mm60: 0,
                evol_105p_mm60: 0,
                evol_120p_mm60: 0,
                evol_180p_mm60: 0,
                evol_360p_mm60: 0,
                evol_540p_mm60: 0,
                evol_720p_mm60: 0,
                evol_1440p_mm60: 0,
                evol_1p_mm75: 0,
                evol_5p_mm75: 0,
                evol_15p_mm75: 0,
                evol_30p_mm75: 0,
                evol_45p_mm75: 0,
                evol_60p_mm75: 0,
                evol_75p_mm75: 0,
                evol_90p_mm75: 0,
                evol_105p_mm75: 0,
                evol_120p_mm75: 0,
                evol_180p_mm75: 0,
                evol_360p_mm75: 0,
                evol_540p_mm75: 0,
                evol_720p_mm75: 0,
                evol_1440p_mm75: 0,
                evol_1p_mm90: 0,
                evol_5p_mm90: 0,
                evol_15p_mm90: 0,
                evol_30p_mm90: 0,
                evol_45p_mm90: 0,
                evol_60p_mm90: 0,
                evol_75p_mm90: 0,
                evol_90p_mm90: 0,
                evol_105p_mm90: 0,
                evol_120p_mm90: 0,
                evol_180p_mm90: 0,
                evol_360p_mm90: 0,
                evol_540p_mm90: 0,
                evol_720p_mm90: 0,
                evol_1440p_mm90: 0,
                evol_5p_mm105: 0,
                evol_15p_mm105: 0,
                evol_30p_mm105: 0,
                evol_45p_mm105: 0,
                evol_60p_mm105: 0,
                evol_75p_mm105: 0,
                evol_90p_mm105: 0,
                evol_105p_mm105: 0,
                evol_120p_mm105: 0,
                evol_180p_mm105: 0,
                evol_360p_mm105: 0,
                evol_540p_mm105: 0,
                evol_720p_mm105: 0,
                evol_1440p_mm105: 0,
                evol_1p_mm120: 0,
                evol_5p_mm120: 0,
                evol_15p_mm120: 0,
                evol_30p_mm120: 0,
                evol_45p_mm120: 0,
                evol_60p_mm120: 0,
                evol_75p_mm120: 0,
                evol_90p_mm120: 0,
                evol_105p_mm120: 0,
                evol_120p_mm120: 0,
                evol_180p_mm120: 0,
                evol_360p_mm120: 0,
                evol_540p_mm120: 0,
                evol_720p_mm120: 0,
                evol_1440p_mm120: 0,
                evol_1p_mm180: 0,
                evol_5p_mm180: 0,
                evol_15p_mm180: 0,
                evol_30p_mm180: 0,
                evol_45p_mm180: 0,
                evol_60p_mm180: 0,
                evol_75p_mm180: 0,
                evol_90p_mm180: 0,
                evol_105p_mm180: 0,
                evol_120p_mm180: 0,
                evol_180p_mm180: 0,
                evol_360p_mm180: 0,
                evol_540p_mm180: 0,
                evol_720p_mm180: 0,
                evol_1440p_mm180: 0,
                evol_1p_mm360: 0,
                evol_5p_mm360: 0,
                evol_15p_mm360: 0,
                evol_30p_mm360: 0,
                evol_45p_mm360: 0,
                evol_60p_mm360: 0,
                evol_75p_mm360: 0,
                evol_90p_mm360: 0,
                evol_105p_mm360: 0,
                evol_120p_mm360: 0,
                evol_180p_mm360: 0,
                evol_360p_mm360: 0,
                evol_540p_mm360: 0,
                evol_720p_mm360: 0,
                evol_1440p_mm360: 0,
                evol_1p_mm540: 0,
                evol_5p_mm540: 0,
                evol_15p_mm540: 0,
                evol_30p_mm540: 0,
                evol_45p_mm540: 0,
                evol_60p_mm540: 0,
                evol_75p_mm540: 0,
                evol_90p_mm540: 0,
                evol_105p_mm540: 0,
                evol_120p_mm540: 0,
                evol_180p_mm540: 0,
                evol_360p_mm540: 0,
                evol_540p_mm540: 0,
                evol_720p_mm540: 0,
                evol_1440p_mm540: 0,
                evol_1p_mm720: 0,
                evol_5p_mm720: 0,
                evol_15p_mm720: 0,
                evol_30p_mm720: 0,
                evol_45p_mm720: 0,
                evol_60p_mm720: 0,
                evol_75p_mm720: 0,
                evol_90p_mm720: 0,
                evol_105p_mm720: 0,
                evol_120p_mm720: 0,
                evol_180p_mm720: 0,
                evol_360p_mm720: 0,
                evol_540p_mm720: 0,
                evol_720p_mm720: 0,
                evol_1440p_mm720: 0,
                evol_1p_mm1440: 0,
                evol_5p_mm1440: 0,
                evol_15p_mm1440: 0,
                evol_30p_mm1440: 0,
                evol_45p_mm1440: 0,
                evol_60p_mm1440: 0,
                evol_75p_mm1440: 0,
                evol_90p_mm1440: 0,
                evol_105p_mm1440: 0,
                evol_120p_mm1440: 0,
                evol_180p_mm1440: 0,
                evol_360p_mm1440: 0,
                evol_540p_mm1440: 0,
                evol_720p_mm1440: 0,
                evol_1440p_mm1440: 0
            };
            for(let MM in data){
                if (data.hasOwnProperty(MM)) {
                    count++;
                }else{
                    reject();
                }
            }
            if(count >= 2) {
                mmEvol.evol_1p_mm5 = ((data[0].mm5 - data[1].mm5) / data[1].mm5) * 100;
                mmEvol.evol_1p_mm15 = ((data[0].mm15 - data[1].mm15) / data[1].mm15) * 100;
                mmEvol.evol_1p_mm30 = ((data[0].mm30 - data[1].mm30) / data[1].mm30) * 100;
                mmEvol.evol_1p_mm45 = ((data[0].mm45 - data[1].mm45) / data[1].mm45) * 100;
                mmEvol.evol_1p_mm60 = ((data[0].mm60 - data[1].mm60) / data[1].mm60) * 100;
                mmEvol.evol_1p_mm75 = ((data[0].mm75 - data[1].mm75) / data[1].mm75) * 100;
                mmEvol.evol_1p_mm90 = ((data[0].mm90 - data[1].mm90) / data[1].mm90) * 100;
                mmEvol.evol_1p_mm105 = ((data[0].mm105 - data[1].mm105) / data[1].mm105) * 100;
                mmEvol.evol_1p_mm120 = ((data[0].mm120 - data[1].mm120) / data[1].mm120) * 100;
                mmEvol.evol_1p_mm180 = ((data[0].mm180 - data[1].mm180) / data[1].mm180) * 100;
                mmEvol.evol_1p_mm360 = ((data[0].mm360 - data[1].mm360) / data[1].mm360) * 100;
                mmEvol.evol_1p_mm540 = ((data[0].mm540 - data[1].mm540) / data[1].mm540) * 100;
                mmEvol.evol_1p_mm720 = ((data[0].mm720 - data[1].mm720) / data[1].mm720) * 100;
                mmEvol.evol_1p_mm1440 = ((data[0].mm1440 - data[1].mm1440) / data[1].mm1440) * 100;
            }
            if(count >= 5) {
                mmEvol.evol_5p_mm5 = ((data[0].mm5 - data[4].mm5) / data[4].mm5) * 100;
                mmEvol.evol_5p_mm15 = ((data[0].mm15 - data[4].mm15) / data[4].mm15) * 100;
                mmEvol.evol_5p_mm30 = ((data[0].mm30 - data[4].mm30) / data[4].mm30) * 100;
                mmEvol.evol_5p_mm45 = ((data[0].mm45 - data[4].mm45) / data[4].mm45) * 100;
                mmEvol.evol_5p_mm60 = ((data[0].mm60 - data[4].mm60) / data[4].mm60) * 100;
                mmEvol.evol_5p_mm75 = ((data[0].mm75 - data[4].mm75) / data[4].mm75) * 100;
                mmEvol.evol_5p_mm90 = ((data[0].mm90 - data[4].mm90) / data[4].mm90) * 100;
                mmEvol.evol_5p_mm105 = ((data[0].mm105 - data[4].mm105) / data[4].mm105) * 100;
                mmEvol.evol_5p_mm120 = ((data[0].mm120 - data[4].mm120) / data[4].mm120) * 100;
                mmEvol.evol_5p_mm180 = ((data[0].mm180 - data[4].mm180) / data[4].mm180) * 100;
                mmEvol.evol_5p_mm360 = ((data[0].mm360 - data[4].mm360) / data[4].mm360) * 100;
                mmEvol.evol_5p_mm540 = ((data[0].mm540 - data[4].mm540) / data[4].mm540) * 100;
                mmEvol.evol_5p_mm720 = ((data[0].mm720 - data[4].mm720) / data[4].mm720) * 100;
                mmEvol.evol_5p_mm1440 = ((data[0].mm1440 - data[4].mm1440) / data[4].mm1440) * 100;
            }
            if(count >= 15) {
                mmEvol.evol_15p_mm5 = ((data[0].mm5 - data[14].mm5) / data[14].mm5) * 100;
                mmEvol.evol_15p_mm15 = ((data[0].mm15 - data[14].mm15) / data[14].mm15) * 100;
                mmEvol.evol_15p_mm30 = ((data[0].mm30 - data[14].mm30) / data[14].mm30) * 100;
                mmEvol.evol_15p_mm45 = ((data[0].mm45 - data[14].mm45) / data[14].mm45) * 100;
                mmEvol.evol_15p_mm60 = ((data[0].mm60 - data[14].mm60) / data[14].mm60) * 100;
                mmEvol.evol_15p_mm75 = ((data[0].mm75 - data[14].mm75) / data[14].mm75) * 100;
                mmEvol.evol_15p_mm90 = ((data[0].mm90 - data[14].mm90) / data[14].mm90) * 100;
                mmEvol.evol_15p_mm105 = ((data[0].mm105 - data[14].mm105) / data[14].mm105) * 100;
                mmEvol.evol_15p_mm120 = ((data[0].mm120 - data[14].mm120) / data[14].mm120) * 100;
                mmEvol.evol_15p_mm180 = ((data[0].mm180 - data[14].mm180) / data[14].mm180) * 100;
                mmEvol.evol_15p_mm360 = ((data[0].mm360 - data[14].mm360) / data[14].mm360) * 100;
                mmEvol.evol_15p_mm540 = ((data[0].mm540 - data[14].mm540) / data[14].mm540) * 100;
                mmEvol.evol_15p_mm720 = ((data[0].mm720 - data[14].mm720) / data[14].mm720) * 100;
                mmEvol.evol_15p_mm1440 = ((data[0].mm1440 - data[14].mm1440) / data[14].mm1440) * 100;
            }
            if(count >= 30) {
                mmEvol.evol_30p_mm5 = ((data[0].mm5 - data[29].mm5) / data[29].mm5) * 100;
                mmEvol.evol_30p_mm15 = ((data[0].mm15 - data[29].mm15) / data[29].mm15) * 100;
                mmEvol.evol_30p_mm30 = ((data[0].mm30 - data[29].mm30) / data[29].mm30) * 100;
                mmEvol.evol_30p_mm45 = ((data[0].mm45 - data[28].mm45) / data[29].mm45) * 100;
                mmEvol.evol_30p_mm60 = ((data[0].mm60 - data[29].mm60) / data[29].mm60) * 100;
                mmEvol.evol_30p_mm75 = ((data[0].mm75 - data[29].mm75) / data[29].mm75) * 100;
                mmEvol.evol_30p_mm90 = ((data[0].mm90 - data[29].mm90) / data[29].mm90) * 100;
                mmEvol.evol_30p_mm105 = ((data[0].mm105 - data[28].mm105) / data[29].mm105) * 100;
                mmEvol.evol_30p_mm120 = ((data[0].mm120 - data[29].mm120) / data[29].mm120) * 100;
                mmEvol.evol_30p_mm180 = ((data[0].mm180 - data[29].mm180) / data[29].mm180) * 100;
                mmEvol.evol_30p_mm360 = ((data[0].mm360 - data[29].mm360) / data[29].mm360) * 100;
                mmEvol.evol_30p_mm540 = ((data[0].mm540 - data[29].mm540) / data[29].mm540) * 100;
                mmEvol.evol_30p_mm720 = ((data[0].mm720 - data[29].mm720) / data[29].mm720) * 100;
                mmEvol.evol_30p_mm1440 = ((data[0].mm1440 - data[29].mm1440) / data[29].mm1440) * 100;
            }
            if(count >= 45) {
                mmEvol.evol_45p_mm5 = ((data[0].mm5 - data[44].mm5) / data[44].mm5) * 100;
                mmEvol.evol_45p_mm15 = ((data[0].mm15 - data[44].mm15) / data[44].mm15) * 100;
                mmEvol.evol_45p_mm30 = ((data[0].mm30 - data[44].mm30) / data[44].mm30) * 100;
                mmEvol.evol_45p_mm45 = ((data[0].mm45 - data[44].mm45) / data[44].mm45) * 100;
                mmEvol.evol_45p_mm60 = ((data[0].mm60 - data[44].mm60) / data[44].mm60) * 100;
                mmEvol.evol_45p_mm75 = ((data[0].mm75 - data[44].mm75) / data[44].mm75) * 100;
                mmEvol.evol_45p_mm90 = ((data[0].mm90 - data[44].mm90) / data[44].mm90) * 100;
                mmEvol.evol_45p_mm105 = ((data[0].mm105 - data[44].mm105) / data[44].mm105) * 100;
                mmEvol.evol_45p_mm120 = ((data[0].mm120 - data[44].mm120) / data[44].mm120) * 100;
                mmEvol.evol_45p_mm180 = ((data[0].mm180 - data[44].mm180) / data[44].mm180) * 100;
                mmEvol.evol_45p_mm360 = ((data[0].mm360 - data[44].mm360) / data[44].mm360) * 100;
                mmEvol.evol_45p_mm540 = ((data[0].mm540 - data[44].mm540) / data[44].mm540) * 100;
                mmEvol.evol_45p_mm720 = ((data[0].mm720 - data[44].mm720) / data[44].mm720) * 100;
                mmEvol.evol_45p_mm1440 = ((data[0].mm1440 - data[44].mm1440) / data[44].mm1440) * 100;
            }
            if(count >= 60) {
                mmEvol.evol_60p_mm5 = ((data[0].mm5 - data[59].mm5) / data[59].mm5) * 100;
                mmEvol.evol_60p_mm15 = ((data[0].mm15 - data[59].mm15) / data[59].mm15) * 100;
                mmEvol.evol_60p_mm30 = ((data[0].mm30 - data[59].mm30) / data[59].mm30) * 100;
                mmEvol.evol_60p_mm45 = ((data[0].mm45 - data[59].mm45) / data[59].mm45) * 100;
                mmEvol.evol_60p_mm60 = ((data[0].mm60 - data[59].mm60) / data[59].mm60) * 100;
                mmEvol.evol_60p_mm75 = ((data[0].mm75 - data[59].mm75) / data[59].mm75) * 100;
                mmEvol.evol_60p_mm90 = ((data[0].mm90 - data[59].mm90) / data[59].mm90) * 100;
                mmEvol.evol_60p_mm105 = ((data[0].mm105 - data[59].mm105) / data[59].mm105) * 100;
                mmEvol.evol_60p_mm120 = ((data[0].mm120 - data[59].mm120) / data[59].mm120) * 100;
                mmEvol.evol_60p_mm180 = ((data[0].mm180 - data[59].mm180) / data[59].mm180) * 100;
                mmEvol.evol_60p_mm360 = ((data[0].mm360 - data[59].mm360) / data[59].mm360) * 100;
                mmEvol.evol_60p_mm540 = ((data[0].mm540 - data[59].mm540) / data[59].mm540) * 100;
                mmEvol.evol_60p_mm720 = ((data[0].mm720 - data[95].mm720) / data[59].mm720) * 100;
                mmEvol.evol_60p_mm1440 = ((data[0].mm1440 - data[59].mm1440) / data[59].mm1440) * 100;
            }
            if(count >= 75) {
                mmEvol.evol_75p_mm5 = ((data[0].mm5 - data[74].mm5) / data[74].mm5) * 100;
                mmEvol.evol_75p_mm15 = ((data[0].mm15 - data[74].mm15) / data[74].mm15) * 100;
                mmEvol.evol_75p_mm30 = ((data[0].mm30 - data[74].mm30) / data[74].mm30) * 100;
                mmEvol.evol_75p_mm45 = ((data[0].mm45 - data[74].mm45) / data[74].mm45) * 100;
                mmEvol.evol_75p_mm60 = ((data[0].mm60 - data[74].mm60) / data[74].mm60) * 100;
                mmEvol.evol_75p_mm75 = ((data[0].mm75 - data[74].mm75) / data[74].mm75) * 100;
                mmEvol.evol_75p_mm90 = ((data[0].mm90 - data[74].mm90) / data[74].mm90) * 100;
                mmEvol.evol_75p_mm105 = ((data[0].mm105 - data[74].mm105) / data[74].mm105) * 100;
                mmEvol.evol_75p_mm120 = ((data[0].mm120 - data[74].mm120) / data[74].mm120) * 100;
                mmEvol.evol_75p_mm180 = ((data[0].mm180 - data[74].mm180) / data[74].mm180) * 100;
                mmEvol.evol_75p_mm360 = ((data[0].mm360 - data[74].mm360) / data[74].mm360) * 100;
                mmEvol.evol_75p_mm540 = ((data[0].mm540 - data[74].mm540) / data[74].mm540) * 100;
                mmEvol.evol_75p_mm720 = ((data[0].mm720 - data[74].mm720) / data[74].mm720) * 100;
                mmEvol.evol_75p_mm1440 = ((data[0].mm1440 - data[74].mm1440) / data[74].mm1440) * 100;
            }
            if(count >= 90) {
                mmEvol.evol_90p_mm5 = ((data[0].mm5 - data[89].mm5) / data[89].mm5) * 100;
                mmEvol.evol_90p_mm15 = ((data[0].mm15 - data[89].mm15) / data[89].mm15) * 100;
                mmEvol.evol_90p_mm30 = ((data[0].mm30 - data[89].mm30) / data[89].mm30) * 100;
                mmEvol.evol_90p_mm45 = ((data[0].mm45 - data[89].mm45) / data[89].mm45) * 100;
                mmEvol.evol_90p_mm60 = ((data[0].mm60 - data[89].mm60) / data[89].mm60) * 100;
                mmEvol.evol_90p_mm75 = ((data[0].mm75 - data[89].mm75) / data[89].mm75) * 100;
                mmEvol.evol_90p_mm90 = ((data[0].mm90 - data[89].mm90) / data[89].mm90) * 100;
                mmEvol.evol_90p_mm105 = ((data[0].mm105 - data[89].mm105) / data[89].mm105) * 100;
                mmEvol.evol_90p_mm120 = ((data[0].mm120 - data[89].mm120) / data[89].mm120) * 100;
                mmEvol.evol_90p_mm180 = ((data[0].mm180 - data[89].mm180) / data[89].mm180) * 100;
                mmEvol.evol_90p_mm360 = ((data[0].mm360 - data[89].mm360) / data[98].mm360) * 100;
                mmEvol.evol_90p_mm540 = ((data[0].mm540 - data[89].mm540) / data[89].mm540) * 100;
                mmEvol.evol_90p_mm720 = ((data[0].mm720 - data[89].mm720) / data[89].mm720) * 100;
                mmEvol.evol_90p_mm1440 = ((data[0].mm1440 - data[89].mm1440) / data[89].mm1440) * 100;
            }
            if(count >= 105) {
                mmEvol.evol_105p_mm5 = ((data[0].mm5 - data[104].mm5) / data[104].mm5) * 100;
                mmEvol.evol_105p_mm15 = ((data[0].mm15 - data[104].mm15) / data[104].mm15) * 100;
                mmEvol.evol_105p_mm30 = ((data[0].mm30 - data[104].mm30) / data[104].mm30) * 100;
                mmEvol.evol_105p_mm45 = ((data[0].mm45 - data[104].mm45) / data[104].mm45) * 100;
                mmEvol.evol_105p_mm60 = ((data[0].mm60 - data[104].mm60) / data[104].mm60) * 100;
                mmEvol.evol_105p_mm75 = ((data[0].mm75 - data[104].mm75) / data[104].mm75) * 100;
                mmEvol.evol_105p_mm90 = ((data[0].mm90 - data[104].mm90) / data[104].mm90) * 100;
                mmEvol.evol_105p_mm105 = ((data[0].mm105 - data[104].mm105) / data[104].mm105) * 100;
                mmEvol.evol_105p_mm120 = ((data[0].mm120 - data[104].mm120) / data[104].mm120) * 100;
                mmEvol.evol_105p_mm180 = ((data[0].mm180 - data[104].mm180) / data[104].mm180) * 100;
                mmEvol.evol_105p_mm360 = ((data[0].mm360 - data[104].mm360) / data[104].mm360) * 100;
                mmEvol.evol_105p_mm540 = ((data[0].mm540 - data[104].mm540) / data[104].mm540) * 100;
                mmEvol.evol_105p_mm720 = ((data[0].mm720 - data[104].mm720) / data[104].mm720) * 100;
                mmEvol.evol_105p_mm1440 = ((data[0].mm1440 - data[104].mm1440) / data[104].mm1440) * 100;
            }
            if(count >= 120) {
                mmEvol.evol_120p_mm5 = ((data[0].mm5 - data[119].mm5) / data[119].mm5) * 100;
                mmEvol.evol_120p_mm15 = ((data[0].mm15 - data[119].mm15) / data[119].mm15) * 100;
                mmEvol.evol_120p_mm30 = ((data[0].mm30 - data[119].mm30) / data[119].mm30) * 100;
                mmEvol.evol_120p_mm45 = ((data[0].mm45 - data[119].mm45) / data[119].mm45) * 100;
                mmEvol.evol_120p_mm60 = ((data[0].mm60 - data[119].mm60) / data[119].mm60) * 100;
                mmEvol.evol_120p_mm75 = ((data[0].mm75 - data[119].mm75) / data[119].mm75) * 100;
                mmEvol.evol_120p_mm90 = ((data[0].mm90 - data[119].mm90) / data[119].mm90) * 100;
                mmEvol.evol_120p_mm105 = ((data[0].mm105 - data[119].mm105) / data[119].mm105) * 100;
                mmEvol.evol_120p_mm120 = ((data[0].mm120 - data[119].mm120) / data[119].mm120) * 100;
                mmEvol.evol_120p_mm180 = ((data[0].mm180 - data[119].mm180) / data[119].mm180) * 100;
                mmEvol.evol_120p_mm360 = ((data[0].mm360 - data[119].mm360) / data[119].mm360) * 100;
                mmEvol.evol_120p_mm540 = ((data[0].mm540 - data[119].mm540) / data[119].mm540) * 100;
                mmEvol.evol_120p_mm720 = ((data[0].mm720 - data[119].mm720) / data[119].mm720) * 100;
                mmEvol.evol_120p_mm1440 = ((data[0].mm1440 - data[119].mm1440) / data[119].mm1440) * 100;
            }
            if(count >= 180) {
                mmEvol.evol_180p_mm5 = ((data[0].mm5 - data[179].mm5) / data[179].mm5) * 100;
                mmEvol.evol_180p_mm15 = ((data[0].mm15 - data[179].mm15) / data[179].mm15) * 100;
                mmEvol.evol_180p_mm30 = ((data[0].mm30 - data[179].mm30) / data[179].mm30) * 100;
                mmEvol.evol_180p_mm45 = ((data[0].mm45 - data[179].mm45) / data[179].mm45) * 100;
                mmEvol.evol_180p_mm60 = ((data[0].mm60 - data[179].mm60) / data[179].mm60) * 100;
                mmEvol.evol_180p_mm75 = ((data[0].mm75 - data[179].mm75) / data[179].mm75) * 100;
                mmEvol.evol_180p_mm90 = ((data[0].mm90 - data[179].mm90) / data[179].mm90) * 100;
                mmEvol.evol_180p_mm105 = ((data[0].mm105 - data[179].mm105) / data[179].mm105) * 100;
                mmEvol.evol_180p_mm120 = ((data[0].mm120 - data[179].mm120) / data[179].mm120) * 100;
                mmEvol.evol_180p_mm180 = ((data[0].mm180 - data[179].mm180) / data[179].mm180) * 100;
                mmEvol.evol_180p_mm360 = ((data[0].mm360 - data[179].mm360) / data[179].mm360) * 100;
                mmEvol.evol_180p_mm540 = ((data[0].mm540 - data[179].mm540) / data[179].mm540) * 100;
                mmEvol.evol_180p_mm720 = ((data[0].mm720 - data[179].mm720) / data[179].mm720) * 100;
                mmEvol.evol_180p_mm1440 = ((data[0].mm1440 - data[179].mm1440) / data[179].mm1440) * 100;
            }
            if(count >= 360) {
                mmEvol.evol_360p_mm5 = ((data[0].mm5 - data[359].mm5) / data[359].mm5) * 100;
                mmEvol.evol_360p_mm15 = ((data[0].mm15 - data[359].mm15) / data[359].mm15) * 100;
                mmEvol.evol_360p_mm30 = ((data[0].mm30 - data[359].mm30) / data[359].mm30) * 100;
                mmEvol.evol_360p_mm45 = ((data[0].mm45 - data[359].mm45) / data[359].mm45) * 100;
                mmEvol.evol_360p_mm60 = ((data[0].mm60 - data[359].mm60) / data[359].mm60) * 100;
                mmEvol.evol_360p_mm75 = ((data[0].mm75 - data[359].mm75) / data[359].mm75) * 100;
                mmEvol.evol_360p_mm90 = ((data[0].mm90 - data[359].mm90) / data[359].mm90) * 100;
                mmEvol.evol_360p_mm105 = ((data[0].mm105 - data[359].mm105) / data[359].mm105) * 100;
                mmEvol.evol_360p_mm120 = ((data[0].mm120 - data[359].mm120) / data[359].mm120) * 100;
                mmEvol.evol_360p_mm180 = ((data[0].mm180 - data[359].mm180) / data[359].mm180) * 100;
                mmEvol.evol_360p_mm360 = ((data[0].mm360 - data[359].mm360) / data[359].mm360) * 100;
                mmEvol.evol_360p_mm540 = ((data[0].mm540 - data[359].mm540) / data[359].mm540) * 100;
                mmEvol.evol_360p_mm720 = ((data[0].mm720 - data[359].mm720) / data[359].mm720) * 100;
                mmEvol.evol_360p_mm1440 = ((data[0].mm1440 - data[359].mm1440) / data[359].mm1440) * 100;
            }
            if(count >= 540) {
                mmEvol.evol_540p_mm5 = ((data[0].mm5 - data[543].mm5) / data[539].mm5) * 100;
                mmEvol.evol_540p_mm15 = ((data[0].mm15 - data[539].mm15) / data[539].mm15) * 100;
                mmEvol.evol_540p_mm30 = ((data[0].mm30 - data[539].mm30) / data[539].mm30) * 100;
                mmEvol.evol_540p_mm45 = ((data[0].mm45 - data[539].mm45) / data[539].mm45) * 100;
                mmEvol.evol_540p_mm60 = ((data[0].mm60 - data[539].mm60) / data[539].mm60) * 100;
                mmEvol.evol_540p_mm75 = ((data[0].mm75 - data[539].mm75) / data[539].mm75) * 100;
                mmEvol.evol_540p_mm90 = ((data[0].mm90 - data[539].mm90) / data[539].mm90) * 100;
                mmEvol.evol_540p_mm105 = ((data[0].mm105 - data[539].mm105) / data[539].mm105) * 100;
                mmEvol.evol_540p_mm120 = ((data[0].mm120 - data[539].mm120) / data[539].mm120) * 100;
                mmEvol.evol_540p_mm180 = ((data[0].mm180 - data[539].mm180) / data[539].mm180) * 100;
                mmEvol.evol_540p_mm360 = ((data[0].mm360 - data[539].mm360) / data[539].mm360) * 100;
                mmEvol.evol_540p_mm540 = ((data[0].mm540 - data[539].mm540) / data[539].mm540) * 100;
                mmEvol.evol_540p_mm720 = ((data[0].mm720 - data[539].mm720) / data[539].mm720) * 100;
                mmEvol.evol_540p_mm1440 = ((data[0].mm1440 - data[539].mm1440) / data[539].mm1440) * 100;
            }
            if(count >= 720) {
                mmEvol.evol_720p_mm5 = ((data[0].mm5 - data[719].mm5) / data[719].mm5) * 100;
                mmEvol.evol_720p_mm15 = ((data[0].mm15 - data[719].mm15) / data[719].mm15) * 100;
                mmEvol.evol_720p_mm30 = ((data[0].mm30 - data[719].mm30) / data[719].mm30) * 100;
                mmEvol.evol_720p_mm45 = ((data[0].mm45 - data[719].mm45) / data[719].mm45) * 100;
                mmEvol.evol_720p_mm60 = ((data[0].mm60 - data[719].mm60) / data[719].mm60) * 100;
                mmEvol.evol_720p_mm75 = ((data[0].mm75 - data[719].mm75) / data[719].mm75) * 100;
                mmEvol.evol_720p_mm90 = ((data[0].mm90 - data[719].mm90) / data[719].mm90) * 100;
                mmEvol.evol_720p_mm105 = ((data[0].mm105 - data[719].mm105) / data[719].mm105) * 100;
                mmEvol.evol_720p_mm120 = ((data[0].mm120 - data[719].mm120) / data[719].mm120) * 100;
                mmEvol.evol_720p_mm180 = ((data[0].mm180 - data[719].mm180) / data[719].mm180) * 100;
                mmEvol.evol_720p_mm360 = ((data[0].mm360 - data[719].mm360) / data[719].mm360) * 100;
                mmEvol.evol_720p_mm540 = ((data[0].mm540 - data[719].mm540) / data[719].mm540) * 100;
                mmEvol.evol_720p_mm720 = ((data[0].mm720 - data[719].mm720) / data[719].mm720) * 100;
                mmEvol.evol_720p_mm1440 = ((data[0].mm1440 - data[719].mm1440) / data[719].mm1440) * 100;
            }
            if(count >= 720) {
                mmEvol.evol_1440p_mm5 = ((data[0].mm5 - data[1439].mm5) / data[1439].mm5) * 100;
                mmEvol.evol_1440p_mm15 = ((data[0].mm15 - data[1439].mm15) / data[1439].mm15) * 100;
                mmEvol.evol_1440p_mm30 = ((data[0].mm30 - data[1439].mm30) / data[1439].mm30) * 100;
                mmEvol.evol_1440p_mm45 = ((data[0].mm45 - data[1439].mm45) / data[1439].mm45) * 100;
                mmEvol.evol_1440p_mm60 = ((data[0].mm60 - data[1439].mm60) / data[1439].mm60) * 100;
                mmEvol.evol_1440p_mm75 = ((data[0].mm75 - data[1439].mm75) / data[1439].mm75) * 100;
                mmEvol.evol_1440p_mm90 = ((data[0].mm90 - data[1439].mm90) / data[1439].mm90) * 100;
                mmEvol.evol_1440p_mm105 = ((data[0].mm105 - data[1439].mm105) / data[1439].mm105) * 100;
                mmEvol.evol_1440p_mm120 = ((data[0].mm120 - data[1439].mm120) / data[1439].mm120) * 100;
                mmEvol.evol_1440p_mm180 = ((data[0].mm180 - data[1439].mm180) / data[1439].mm180) * 100;
                mmEvol.evol_1440p_mm360 = ((data[0].mm360 - data[1439].mm360) / data[1439].mm360) * 100;
                mmEvol.evol_1440p_mm540 = ((data[0].mm540 - data[1439].mm540) / data[1439].mm540) * 100;
                mmEvol.evol_1440p_mm720 = ((data[0].mm720 - data[1439].mm720) / data[1439].mm720) * 100;
                mmEvol.evol_1440p_mm1440 = ((data[0].mm1440 - data[1439].mm1440) / data[1439].mm1440) * 100;
            }

            resolve(mmEvol);
        }).then(function(res){
            callback(null, res);
        }).catch(function(err) {
            err = 'Error during MMEvol calculation';
            callback(err, null);
        });
    }
};
