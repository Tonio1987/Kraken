const moment = require('moment');
moment.locale('fr');

module.exports = {
    calculateMMCompare: function(callback, MM1440, date, hour, timestamp) {
        new Promise(function (resolve, reject) {
            if(MM1440.length > 0){
                // LAST MOVING AVERAGE COMPARAISON
                let last_mm5_upto_60 = MM1440[0].mm5_upto_60;
                let last_mm5_upto_180 = MM1440[0].mm5_upto_180;
                let last_mm5_upto_360 = MM1440[0].mm5_upto_360;
                let last_mm5_upto_540 = MM1440[0].mm5_upto_540;
                let last_mm5_upto_720 = MM1440[0].mm5_upto_720;
                let last_mm5_upto_1440 = MM1440[0].mm5_upto_1440;
                let last_mm60_upto_180 = MM1440[0].mm60_upto_180;
                let last_mm60_upto_360 = MM1440[0].mm60_upto_360;
                let last_mm60_upto_540 = MM1440[0].mm60_upto_540;
                let last_mm60_upto_720 = MM1440[0].mm60_upto_720;
                let last_mm60_upto_1440 = MM1440[0].mm60_upto_1440;
                let last_mm180_upto_360 = MM1440[0].mm180_upto_360;
                let last_mm180_upto_540 = MM1440[0].mm180_upto_540;
                let last_mm180_upto_720 = MM1440[0].mm180_upto_720;
                let last_mm180_upto_1440 = MM1440[0].mm180_upto_1440;
                let last_mm360_upto_540 = MM1440[0].mm360_upto_540;
                let last_mm360_upto_720 = MM1440[0].mm360_upto_720;
                let last_mm360_upto_1440 = MM1440[0].mm360_upto_1440;
                let last_mm540_upto_720 = MM1440[0].mm540_upto_720;
                let last_mm540_upto_1440 = MM1440[0].mm540_upto_1440;
                let last_mm720_upto_1440 = MM1440[0].mm720_upto_1440;

                // SINCE HOW MANY TIME MOVING AVERAGE ARE IN THIS SITUATUIB
                let mm5_upto_60_since = 0;
                let mm5_upto_180_since = 0;
                let mm5_upto_360_since = 0;
                let mm5_upto_540_since = 0;
                let mm5_upto_720_since = 0;
                let mm5_upto_1440_since = 0;
                let mm60_upto_180_since = 0;
                let mm60_upto_360_since = 0;
                let mm60_upto_540_since = 0;
                let mm60_upto_720_since = 0;
                let mm60_upto_1440_since = 0;
                let mm180_upto_360_since = 0;
                let mm180_upto_540_since = 0;
                let mm180_upto_720_since = 0;
                let mm180_upto_1440_since = 0;
                let mm360_upto_540_since = 0;
                let mm360_upto_720_since = 0;
                let mm360_upto_1440_since = 0;
                let mm540_upto_720_since = 0;
                let mm540_upto_1440_since = 0;
                let mm720_upto_1440_since = 0;

                // LAST TREND BETWEEN MOVING AVERAGE
                // 0 MEAN STABLE ; -1 MEANS MOVE CLOSE ; 1 MEANS MOVE AWAY
                let mm5_on_60_trend = "NO";
                let mm5_on_180_trend = "NO";
                let mm5_on_360_trend = "NO";
                let mm5_on_540_trend = "NO";
                let mm5_on_720_trend = "NO";
                let mm5_on_1440_trend = "NO";
                let mm60_on_180_trend = "NO";
                let mm60_on_360_trend = "NO";
                let mm60_on_540_trend = "NO";
                let mm60_on_720_trend = "NO";
                let mm60_on_1440_trend = "NO";
                let mm180_on_360_trend = "NO";
                let mm180_on_540_trend = "NO";
                let mm180_on_720_trend = "NO";
                let mm180_on_1440_trend = "NO";
                let mm360_on_540_trend = "NO";
                let mm360_on_720_trend = "NO";
                let mm360_on_1440_trend = "NO";
                let mm540_on_720_trend = "NO";
                let mm540_on_1440_trend = "NO";
                let mm720_on_1440_trend = "NO";

                // SINCE HOW MANY PERIODE THE LAST TREND BETWEEN MOVING AVERAGE HAPPENED
                let mm5_on_60_trend_since = 0;
                let mm5_on_180_trend_since = 0;
                let mm5_on_360_trend_since = 0;
                let mm5_on_540_trend_since = 0;
                let mm5_on_720_trend_since = 0;
                let mm5_on_1440_trend_since = 0;
                let mm60_on_180_trend_since = 0;
                let mm60_on_360_trend_since = 0;
                let mm60_on_540_trend_since = 0;
                let mm60_on_720_trend_since = 0;
                let mm60_on_1440_trend_since = 0;
                let mm180_on_360_trend_since = 0;
                let mm180_on_540_trend_since = 0;
                let mm180_on_720_trend_since = 0;
                let mm180_on_1440_trend_since = 0;
                let mm360_on_540_trend_since = 0;
                let mm360_on_720_trend_since = 0;
                let mm360_on_1440_trend_since = 0;
                let mm540_on_720_trend_since = 0;
                let mm540_on_1440_trend_since = 0;
                let mm720_on_1440_trend_since = 0;

                // LOOP FLAGS
                let mm5_upto_60_flag = true;
                let mm5_upto_180_flag = true;
                let mm5_upto_360_flag = true;
                let mm5_upto_540_flag = true;
                let mm5_upto_720_flag = true;
                let mm5_upto_1440_flag = true;
                let mm60_upto_180_flag = true;
                let mm60_upto_360_flag = true;
                let mm60_upto_540_flag = true;
                let mm60_upto_720_flag = true;
                let mm60_upto_1440_flag = true;
                let mm180_upto_360_flag = true;
                let mm180_upto_540_flag = true;
                let mm180_upto_720_flag = true;
                let mm180_upto_1440_flag = true;
                let mm360_upto_540_flag = true;
                let mm360_upto_720_flag = true;
                let mm360_upto_1440_flag = true;
                let mm540_upto_720_flag = true;
                let mm540_upto_1440_flag = true;
                let mm720_upto_1440_flag = true;

                let mm5_upto_60_trend_flag = true;
                let mm5_upto_180_trend_flag = true;
                let mm5_upto_360_trend_flag = true;
                let mm5_upto_540_trend_flag = true;
                let mm5_upto_720_trend_flag = true;
                let mm5_upto_1440_trend_flag = true;
                let mm60_upto_180_trend_flag = true;
                let mm60_upto_360_trend_flag = true;
                let mm60_upto_540_trend_flag = true;
                let mm60_upto_720_trend_flag = true;
                let mm60_upto_1440_trend_flag = true;
                let mm180_upto_360_trend_flag = true;
                let mm180_upto_540_trend_flag = true;
                let mm180_upto_720_trend_flag = true;
                let mm180_upto_1440_trend_flag = true;
                let mm360_upto_540_trend_flag = true;
                let mm360_upto_720_trend_flag = true;
                let mm360_upto_1440_trend_flag = true;
                let mm540_upto_720_trend_flag = true;
                let mm540_upto_1440_trend_flag = true;
                let mm720_upto_1440_trend_flag = true;

                for(let i = 0; i<MM1440.length; i++){
                    // COMPARE MM 5 TO HIGHER
                    if(last_mm5_upto_60 === true && mm5_upto_60_flag === true && MM1440[i].mm5_upto_60 === true){
                        mm5_upto_60_since++;
                        if(i > 0 && mm5_upto_60_trend_flag === true){
                            let oldest = MM1440[i].mm5 - MM1440[i].mm60;
                            let newest = MM1440[i-1].mm5 - MM1440[i-1].mm60;
                            // MOBILE AVERAGES IS MOVING AWAY
                            // WARNING ! THE FIRST PASS IN THE LOOP DETERMINES THE TREND DIRTECTION AN SO THE FLAG
                            if(newest >= oldest){
                                // MOBILE AVERAGES IS MOVING AWAY SINCE THE BEGINNING OF THE LOOP
                                if(mm5_on_60_trend === "NO" || mm5_on_60_trend === "UP"){
                                    mm5_on_60_trend = "UP";
                                    mm5_on_60_trend_since++;
                                }else{
                                    mm5_upto_60_trend_flag = false;
                                }
                            }else{
                                if(mm5_on_60_trend === "NO" || mm5_on_60_trend === "DOWN"){
                                    mm5_on_60_trend = "DOWN";
                                    mm5_on_60_trend_since++;
                                }else{
                                    mm5_upto_60_trend_flag = false;
                                }
                            }
                        }
                    }else{
                        mm5_upto_60_flag = false;
                    }

                    if(last_mm5_upto_180 === true && mm5_upto_180_flag === true && MM1440[i].mm5_upto_180 === true){
                        mm5_upto_180_since++;
                        if(i > 0 && mm5_upto_180_trend_flag === true){
                            let oldest = MM1440[i].mm5 - MM1440[i].mm180;
                            let newest = MM1440[i-1].mm5 - MM1440[i-1].mm180;
                            if(newest >= oldest){
                                if(mm5_on_180_trend === "NO" || mm5_on_180_trend === "UP"){
                                    mm5_on_180_trend = "UP";
                                    mm5_on_180_trend_since++;
                                }else{
                                    mm5_upto_180_trend_flag = false;
                                }
                            }else{
                                if(mm5_on_180_trend === "NO" || mm5_on_180_trend === "DOWN"){
                                    mm5_on_180_trend = "DOWN";
                                    mm5_on_180_trend_since++;
                                }else{
                                    mm5_upto_180_trend_flag = false;
                                }
                            }
                        }
                    }else{
                        mm5_upto_180_flag = false;
                    }

                    if(last_mm5_upto_360 === true && mm5_upto_360_flag === true && MM1440[i].mm5_upto_360 === true){
                        mm5_upto_360_since++;
                        if(i > 0 && mm5_upto_360_trend_flag === true){
                            let oldest = MM1440[i].mm5 - MM1440[i].mm360;
                            let newest = MM1440[i-1].mm5 - MM1440[i-1].mm360;
                            if(newest >= oldest){
                                if(mm5_on_360_trend === "NO" || mm5_on_360_trend === "UP"){
                                    mm5_on_360_trend = "UP";
                                    mm5_on_360_trend_since++;
                                }else{
                                    mm5_upto_360_trend_flag = false;
                                }
                            }else{
                                if(mm5_on_360_trend === "NO" || mm5_on_360_trend === "DOWN"){
                                    mm5_on_360_trend = "DOWN";
                                    mm5_on_360_trend_since++;
                                }else{
                                    mm5_upto_360_trend_flag = false;
                                }
                            }
                        }
                    }else{
                        mm5_upto_360_flag = false;
                    }

                    if(last_mm5_upto_540 === true && mm5_upto_540_flag === true && MM1440[i].mm5_upto_540 === true){
                        mm5_upto_540_since++;
                        if(i > 0 && mm5_upto_540_trend_flag === true){
                            let oldest = MM1440[i].mm5 - MM1440[i].mm540;
                            let newest = MM1440[i-1].mm5 - MM1440[i-1].mm540;
                            if(newest >= oldest){
                                if(mm5_on_540_trend === "NO" || mm5_on_540_trend === "UP"){
                                    mm5_on_540_trend = "UP";
                                    mm5_on_540_trend_since++;
                                }else{
                                    mm5_upto_540_trend_flag = false;
                                }
                            }else{
                                if(mm5_on_540_trend === "NO" || mm5_on_540_trend === "DOWN"){
                                    mm5_on_540_trend = "DOWN";
                                    mm5_on_540_trend_since++;
                                }else{
                                    mm5_upto_540_trend_flag = false;
                                }
                            }
                        }
                    }else{
                        mm5_upto_540_flag = false;
                    }

                    if(last_mm5_upto_720 === true && mm5_upto_720_flag === true && MM1440[i].mm5_upto_720 === true){
                        mm5_upto_720_since++;
                        if(i > 0 && mm5_upto_720_trend_flag === true){
                            let oldest = MM1440[i].mm5 - MM1440[i].mm720;
                            let newest = MM1440[i-1].mm5 - MM1440[i-1].mm720;
                            if(newest >= oldest){
                                if(mm5_on_720_trend === "NO" || mm5_on_720_trend === "UP"){
                                    mm5_on_720_trend = "UP";
                                    mm5_on_720_trend_since++;
                                }else{
                                    mm5_upto_720_trend_flag = false;
                                }
                            }else{
                                if(mm5_on_720_trend === "NO" || mm5_on_720_trend === "DOWN"){
                                    mm5_on_720_trend = "DOWN";
                                    mm5_on_720_trend_since++;
                                }else{
                                    mm5_upto_720_trend_flag = false;
                                }
                            }
                        }
                    }else{
                        mm5_upto_720_flag = false;
                    }

                    if(last_mm5_upto_1440 === true && mm5_upto_1440_flag === true && MM1440[i].mm5_upto_1440 === true){
                        mm5_upto_1440_since++;
                        if(i > 0 && mm5_upto_1440_trend_flag === true){
                            let oldest = MM1440[i].mm5 - MM1440[i].mm1440;
                            let newest = MM1440[i-1].mm5 - MM1440[i-1].mm1440;
                            if(newest >= oldest){
                                if(mm5_on_1440_trend === "NO" || mm5_on_1440_trend === "UP"){
                                    mm5_on_1440_trend = "UP";
                                    mm5_on_1440_trend_since++;
                                }else{
                                    mm5_upto_1440_trend_flag = false;
                                }
                            }else{
                                if(mm5_on_1440_trend === "NO" || mm5_on_1440_trend === "DOWN"){
                                    mm5_on_1440_trend = "DOWN";
                                    mm5_on_1440_trend_since++;
                                }else{
                                    mm5_upto_1440_trend_flag = false;
                                }
                            }
                        }
                    }else{
                        mm5_upto_1440_flag = false;
                    }

                    // COMPARE MM 60 TO HIGHER
                    if(last_mm60_upto_180 === true && mm60_upto_180_flag === true && MM1440[i].mm60_upto_180 === true){
                        mm60_upto_180_since++;
                        if(i > 0 && mm60_upto_180_trend_flag === true){
                            let oldest = MM1440[i].mm60 - MM1440[i].mm180;
                            let newest = MM1440[i-1].mm60 - MM1440[i-1].mm180;
                            if(newest >= oldest){
                                if(mm60_on_180_trend === "NO" || mm60_on_180_trend === "UP"){
                                    mm60_on_180_trend = "UP";
                                    mm60_on_180_trend_since++;
                                }else{
                                    mm60_upto_180_trend_flag = false;
                                }
                            }else{
                                if(mm60_on_180_trend === "NO" || mm60_on_180_trend === "DOWN"){
                                    mm60_on_180_trend = "DOWN";
                                    mm60_on_180_trend_since++;
                                }else{
                                    mm60_upto_180_trend_flag = false;
                                }
                            }
                        }
                    }else{
                        mm60_upto_180_flag = false;
                    }

                    if(last_mm60_upto_360 === true && mm60_upto_360_flag === true && MM1440[i].mm60_upto_360 === true){
                        mm60_upto_360_since++;
                        if(i > 0 && mm60_upto_360_trend_flag === true){
                            let oldest = MM1440[i].mm60 - MM1440[i].mm360;
                            let newest = MM1440[i-1].mm60 - MM1440[i-1].mm360;
                            if(newest >= oldest){
                                if(mm60_on_360_trend === "NO" || mm60_on_360_trend === "UP"){
                                    mm60_on_360_trend = "UP";
                                    mm60_on_360_trend_since++;
                                }else{
                                    mm60_upto_360_trend_flag = false;
                                }
                            }else{
                                if(mm60_on_360_trend === "NO" || mm60_on_360_trend === "DOWN"){
                                    mm60_on_360_trend = "DOWN";
                                    mm60_on_360_trend_since++;
                                }else{
                                    mm60_upto_360_trend_flag = false;
                                }
                            }
                        }
                    }else{
                        mm60_upto_360_flag = false;
                    }

                    if(last_mm60_upto_540 === true && mm60_upto_540_flag === true && MM1440[i].mm60_upto_540 === true){
                        mm60_upto_540_since++;
                        if(i > 0 && mm60_upto_540_trend_flag === true){
                            let oldest = MM1440[i].mm60 - MM1440[i].mm540;
                            let newest = MM1440[i-1].mm60 - MM1440[i-1].mm540;
                            if(newest >= oldest){
                                if(mm60_on_540_trend === "NO" || mm60_on_540_trend === "UP"){
                                    mm60_on_540_trend = "UP";
                                    mm60_on_540_trend_since++;
                                }else{
                                    mm60_upto_540_trend_flag = false;
                                }
                            }else{
                                if(mm60_on_540_trend === "NO" || mm60_on_540_trend === "DOWN"){
                                    mm60_on_540_trend = "DOWN";
                                    mm60_on_540_trend_since++;
                                }else{
                                    mm60_upto_540_trend_flag = false;
                                }
                            }
                        }
                    }else{
                        mm60_upto_540_flag = false;
                    }

                    if(last_mm60_upto_720 === true && mm60_upto_720_flag === true && MM1440[i].mm60_upto_720 === true){
                        mm60_upto_720_since++;
                        if(i > 0 && mm60_upto_720_trend_flag === true){
                            let oldest = MM1440[i].mm60 - MM1440[i].mm720;
                            let newest = MM1440[i-1].mm60 - MM1440[i-1].mm720;
                            if(newest >= oldest){
                                if(mm60_on_720_trend === "NO" || mm60_on_720_trend === "UP"){
                                    mm60_on_720_trend = "UP";
                                    mm60_on_720_trend_since++;
                                }else{
                                    mm60_upto_720_trend_flag = false;
                                }
                            }else{
                                if(mm60_on_720_trend === "NO" || mm60_on_720_trend === "DOWN"){
                                    mm60_on_720_trend = "DOWN";
                                    mm60_on_720_trend_since++;
                                }else{
                                    mm60_upto_720_trend_flag = false;
                                }
                            }
                        }
                    }else{
                        mm60_upto_720_flag = false;
                    }

                    if(last_mm60_upto_1440 === true && mm60_upto_1440_flag === true && MM1440[i].mm60_upto_1440 === true){
                        mm60_upto_1440_since++;
                        if(i > 0 && mm60_upto_1440_trend_flag === true){
                            let oldest = MM1440[i].mm60 - MM1440[i].mm1440;
                            let newest = MM1440[i-1].mm60 - MM1440[i-1].mm1440;
                            if(newest >= oldest){
                                if(mm60_on_1440_trend === "NO" || mm60_on_1440_trend === "UP"){
                                    mm60_on_1440_trend = "UP";
                                    mm60_on_1440_trend_since++;
                                }else{
                                    mm60_upto_1440_trend_flag = false;
                                }
                            }else{
                                if(mm60_on_1440_trend === "NO" || mm60_on_1440_trend === "DOWN"){
                                    mm60_on_1440_trend = "DOWN";
                                    mm60_on_1440_trend_since++;
                                }else{
                                    mm60_upto_1440_trend_flag = false;
                                }
                            }
                        }
                    }else{
                        mm60_upto_1440_flag = false;
                    }

                    // COMPARE MM 180 TO HIGHER
                    if(last_mm180_upto_360 === true && mm180_upto_360_flag === true && MM1440[i].mm180_upto_360 === true){
                        mm180_upto_360_since++;
                        if(i > 0 && mm180_upto_360_trend_flag === true){
                            let oldest = MM1440[i].mm180 - MM1440[i].mm360;
                            let newest = MM1440[i-1].mm180 - MM1440[i-1].mm360;
                            if(newest >= oldest){
                                if(mm180_on_360_trend === "NO" || mm180_on_360_trend === "UP"){
                                    mm180_on_360_trend = "UP";
                                    mm180_on_360_trend_since++;
                                }else{
                                    mm180_upto_360_trend_flag = false;
                                }
                            }else{
                                if(mm180_on_360_trend === "NO" || mm180_on_360_trend === "DOWN"){
                                    mm180_on_360_trend = "DOWN";
                                    mm180_on_360_trend_since++;
                                }else{
                                    mm180_upto_360_trend_flag = false;
                                }
                            }
                        }
                    }else{
                        mm180_upto_360_flag = false;
                    }

                    if(last_mm180_upto_540 === true && mm180_upto_540_flag === true && MM1440[i].mm180_upto_540 === true){
                        mm180_upto_540_since++;
                        if(i > 0 && mm180_upto_540_trend_flag === true){
                            let oldest = MM1440[i].mm180 - MM1440[i].mm540;
                            let newest = MM1440[i-1].mm180 - MM1440[i-1].mm540;
                            if(newest >= oldest){
                                if(mm180_on_540_trend === "NO" || mm180_on_540_trend === "UP"){
                                    mm180_on_540_trend = "UP";
                                    mm180_on_540_trend_since++;
                                }else{
                                    mm180_upto_540_trend_flag = false;
                                }
                            }else{
                                if(mm180_on_540_trend === "NO" || mm180_on_540_trend === "DOWN"){
                                    mm180_on_540_trend = "DOWN";
                                    mm180_on_540_trend_since++;
                                }else{
                                    mm180_upto_540_trend_flag = false;
                                }
                            }
                        }
                    }else{
                        mm180_upto_540_flag = false;
                    }

                    if(last_mm180_upto_720 === true && mm180_upto_720_flag === true && MM1440[i].mm180_upto_720 === true){
                        mm180_upto_720_since++;
                        if(i > 0 && mm180_upto_720_trend_flag === true){
                            let oldest = MM1440[i].mm180 - MM1440[i].mm720;
                            let newest = MM1440[i-1].mm180 - MM1440[i-1].mm720;
                            if(newest >= oldest){
                                if(mm180_on_720_trend === "NO" || mm180_on_720_trend === "UP"){
                                    mm180_on_720_trend = "UP";
                                    mm180_on_720_trend_since++;
                                }else{
                                    mm180_upto_720_trend_flag = false;
                                }
                            }else{
                                if(mm180_on_720_trend === "NO" || mm180_on_720_trend === "DOWN"){
                                    mm180_on_720_trend = "DOWN";
                                    mm180_on_720_trend_since++;
                                }else{
                                    mm180_upto_720_trend_flag = false;
                                }
                            }
                        }
                    }else{
                        mm180_upto_720_flag = false;
                    }

                    if(last_mm180_upto_1440 === true && mm180_upto_1440_flag === true && MM1440[i].mm180_upto_1440 === true){
                        mm180_upto_1440_since++;
                        if(i > 0 && mm180_upto_1440_trend_flag === true){
                            let oldest = MM1440[i].mm180 - MM1440[i].mm1440;
                            let newest = MM1440[i-1].mm180 - MM1440[i-1].mm1440;
                            if(newest >= oldest){
                                if(mm180_on_1440_trend === "NO" || mm180_on_1440_trend === "UP"){
                                    mm180_on_1440_trend = "UP";
                                    mm180_on_1440_trend_since++;
                                }else{
                                    mm180_upto_1440_trend_flag = false;
                                }
                            }else{
                                if(mm180_on_1440_trend === "NO" || mm180_on_1440_trend === "DOWN"){
                                    mm180_on_1440_trend = "DOWN";
                                    mm180_on_1440_trend_since++;
                                }else{
                                    mm180_upto_1440_trend_flag = false;
                                }
                            }
                        }
                    }else{
                        mm180_upto_1440_flag = false;
                    }

                    // COMPARE MM 360 TO HIGHER
                    if(last_mm360_upto_540 === true && mm360_upto_540_flag === true && MM1440[i].mm360_upto_540 === true){
                        mm360_upto_540_since++;
                        if(i > 0 && mm360_upto_540_trend_flag === true){
                            let oldest = MM1440[i].mm360 - MM1440[i].mm540;
                            let newest = MM1440[i-1].mm360 - MM1440[i-1].mm540;
                            if(newest >= oldest){
                                if(mm360_on_540_trend === "NO" || mm360_on_540_trend === "UP"){
                                    mm360_on_540_trend = "UP";
                                    mm360_on_540_trend_since++;
                                }else{
                                    mm360_upto_540_trend_flag = false;
                                }
                            }else{
                                if(mm360_on_540_trend === "NO" || mm360_on_540_trend === "DOWN"){
                                    mm360_on_540_trend = "DOWN";
                                    mm360_on_540_trend_since++;
                                }else{
                                    mm360_upto_540_trend_flag = false;
                                }
                            }
                        }
                    }else{
                        mm360_upto_540_flag = false;
                    }

                    if(last_mm360_upto_720 === true && mm360_upto_720_flag === true && MM1440[i].mm360_upto_720 === true){
                        mm360_upto_720_since++;
                        if(i > 0 && mm360_upto_720_trend_flag === true){
                            let oldest = MM1440[i].mm360 - MM1440[i].mm720;
                            let newest = MM1440[i-1].mm360 - MM1440[i-1].mm720;
                            if(newest >= oldest){
                                if(mm360_on_720_trend === "NO" || mm360_on_720_trend === "UP"){
                                    mm360_on_720_trend = "UP";
                                    mm360_on_720_trend_since++;
                                }else{
                                    mm360_upto_720_trend_flag = false;
                                }
                            }else{
                                if(mm360_on_720_trend === "NO" || mm360_on_720_trend === "DOWN"){
                                    mm360_on_720_trend = "DOWN";
                                    mm360_on_720_trend_since++;
                                }else{
                                    mm360_upto_720_trend_flag = false;
                                }
                            }
                        }
                    }else{
                        mm360_upto_720_flag = false;
                    }

                    if(last_mm360_upto_1440 === true && mm360_upto_1440_flag === true && MM1440[i].mm360_upto_1440 === true){
                        mm360_upto_1440_since++;
                        if(i > 0 && mm360_upto_1440_trend_flag === true){
                            let oldest = MM1440[i].mm360 - MM1440[i].mm1440;
                            let newest = MM1440[i-1].mm360 - MM1440[i-1].mm1440;
                            if(newest >= oldest){
                                if(mm360_on_1440_trend === "NO" || mm360_on_1440_trend === "UP"){
                                    mm360_on_1440_trend = "UP";
                                    mm360_on_1440_trend_since++;
                                }else{
                                    mm360_upto_1440_trend_flag = false;
                                }
                            }else{
                                if(mm360_on_1440_trend === "NO" || mm360_on_1440_trend === "DOWN"){
                                    mm360_on_1440_trend = "DOWN";
                                    mm360_on_1440_trend_since++;
                                }else{
                                    mm360_upto_1440_trend_flag = false;
                                }
                            }
                        }
                    }else{
                        mm360_upto_1440_flag = false;
                    }

                    // COMPARE MM 540 TO HIGHER
                    if(last_mm540_upto_720 === true && mm540_upto_720_flag === true && MM1440[i].mm540_upto_720 === true){
                        mm540_upto_720_since++;
                        if(i > 0 && mm540_upto_720_trend_flag === true){
                            let oldest = MM1440[i].mm540 - MM1440[i].mm720;
                            let newest = MM1440[i-1].mm540 - MM1440[i-1].mm720;
                            if(newest >= oldest){
                                if(mm540_on_720_trend === "NO" || mm540_on_720_trend === "UP"){
                                    mm540_on_720_trend = "UP";
                                    mm540_on_720_trend_since++;
                                }else{
                                    mm540_upto_720_trend_flag = false;
                                }
                            }else{
                                if(mm540_on_720_trend === "NO" || mm540_on_720_trend === "DOWN"){
                                    mm540_on_720_trend = "DOWN";
                                    mm540_on_720_trend_since++;
                                }else{
                                    mm540_upto_720_trend_flag = false;
                                }
                            }
                        }
                    }else{
                        mm540_upto_720_flag = false;
                    }

                    if(last_mm540_upto_1440 === true && mm540_upto_1440_flag === true && MM1440[i].mm540_upto_1440 === true){
                        mm540_upto_1440_since++;
                        if(i > 0 && mm540_upto_1440_trend_flag === true){
                            let oldest = MM1440[i].mm540 - MM1440[i].mm1440;
                            let newest = MM1440[i-1].mm540 - MM1440[i-1].mm1440;
                            if(newest >= oldest){
                                if(mm540_on_1440_trend === "NO" || mm540_on_1440_trend === "UP"){
                                    mm540_on_1440_trend = "UP";
                                    mm540_on_1440_trend_since++;
                                }else{
                                    mm540_upto_1440_trend_flag = false;
                                }
                            }else{
                                if(mm540_on_1440_trend === "NO" || mm540_on_1440_trend === "DOWN"){
                                    mm540_on_1440_trend = "DOWN";
                                    mm540_on_1440_trend_since++;
                                }else{
                                    mm540_upto_1440_trend_flag = false;
                                }
                            }
                        }
                    }else{
                        mm540_upto_1440_flag = false;
                    }

                    // COMPARE MM 720 TO HIGHER
                    if(last_mm720_upto_1440 === true && mm720_upto_1440_flag === true && MM1440[i].mm720_upto_1440 === true){
                        mm720_upto_1440_since++;
                        if(i > 0 && mm720_upto_1440_trend_flag === true){
                            let oldest = MM1440[i].mm720 - MM1440[i].mm1440;
                            let newest = MM1440[i-1].mm720 - MM1440[i-1].mm1440;
                            if(newest >= oldest){
                                if(mm720_on_1440_trend === "NO" || mm720_on_1440_trend === "UP"){
                                    mm720_on_1440_trend = "UP";
                                    mm720_on_1440_trend_since++;
                                }else{
                                    mm720_upto_1440_trend_flag = false;
                                }
                            }else{
                                if(mm720_on_1440_trend === "NO" || mm720_on_1440_trend === "DOWN"){
                                    mm720_on_1440_trend = "DOWN";
                                    mm720_on_1440_trend_since++;
                                }else{
                                    mm720_upto_1440_trend_flag = false;
                                }
                            }
                        }
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
                    mm5_on_60_trend: mm5_on_60_trend,
                    mm5_on_60_trend_since: mm5_on_60_trend_since,
                    mm5_upto_180_since: mm5_upto_180_since,
                    mm5_on_180_trend: mm5_on_180_trend,
                    mm5_on_180_trend_since: mm5_on_180_trend_since,
                    mm5_upto_360_since: mm5_upto_360_since,
                    mm5_on_360_trend: mm5_on_360_trend,
                    mm5_on_360_trend_since: mm5_on_360_trend_since,
                    mm5_upto_540_since: mm5_upto_540_since,
                    mm5_on_540_trend: mm5_on_540_trend,
                    mm5_on_540_trend_since: mm5_on_540_trend_since,
                    mm5_upto_720_since: mm5_upto_720_since,
                    mm5_on_720_trend: mm5_on_720_trend,
                    mm5_on_720_trend_since: mm5_on_720_trend_since,
                    mm5_upto_1440_since: mm5_upto_1440_since,
                    mm5_on_1440_trend: mm5_on_1440_trend,
                    mm5_on_1440_trend_since: mm5_on_1440_trend_since,
                    mm60_upto_180_since: mm60_upto_180_since,
                    mm60_on_180_trend: mm60_on_180_trend,
                    mm60_on_180_trend_since: mm60_on_180_trend_since,
                    mm60_upto_360_since: mm60_upto_360_since,
                    mm60_on_360_trend: mm60_on_360_trend,
                    mm60_on_360_trend_since: mm60_on_360_trend_since,
                    mm60_upto_540_since: mm60_upto_540_since,
                    mm60_on_540_trend: mm60_on_540_trend,
                    mm60_on_540_trend_since: mm60_on_540_trend_since,
                    mm60_upto_720_since: mm60_upto_720_since,
                    mm60_on_720_trend: mm60_on_720_trend,
                    mm60_on_720_trend_since: mm60_on_720_trend_since,
                    mm60_upto_1440_since: mm60_upto_1440_since,
                    mm60_on_1440_trend: mm60_on_1440_trend,
                    mm60_on_1440_trend_since: mm60_on_1440_trend_since,
                    mm180_upto_360_since: mm180_upto_360_since,
                    mm180_on_360_trend: mm180_on_360_trend,
                    mm180_on_360_trend_since: mm180_on_360_trend_since,
                    mm180_upto_540_since: mm180_upto_540_since,
                    mm180_on_540_trend: mm180_on_540_trend,
                    mm180_on_540_trend_since: mm180_on_540_trend_since,
                    mm180_upto_720_since: mm180_upto_720_since,
                    mm180_on_720_trend: mm180_on_720_trend,
                    mm180_on_720_trend_since: mm180_on_720_trend_since,
                    mm180_upto_1440_since: mm180_upto_1440_since,
                    mm180_on_1440_trend: mm180_on_1440_trend,
                    mm180_on_1440_trend_since: mm180_on_1440_trend_since,
                    mm360_upto_540_since: mm360_upto_540_since,
                    mm360_on_540_trend: mm360_on_540_trend,
                    mm360_on_540_trend_since: mm360_on_540_trend_since,
                    mm360_upto_720_since: mm360_upto_720_since,
                    mm360_on_720_trend: mm360_on_720_trend,
                    mm360_on_720_trend_since: mm360_on_720_trend_since,
                    mm360_upto_1440_since: mm360_upto_1440_since,
                    mm360_on_1440_trend: mm360_on_1440_trend,
                    mm360_on_1440_trend_since: mm360_on_1440_trend_since,
                    mm540_upto_720_since: mm540_upto_720_since,
                    mm540_on_720_trend: mm540_on_720_trend,
                    mm540_on_720_trend_since: mm540_on_720_trend_since,
                    mm540_upto_1440_since: mm540_upto_1440_since,
                    mm540_on_1440_trend: mm540_on_1440_trend,
                    mm540_on_1440_trend_since: mm540_on_1440_trend_since,
                    mm720_upto_1440_since: mm720_upto_1440_since,
                    mm720_on_1440_trend: mm720_on_1440_trend,
                    mm720_on_1440_trend_since: mm720_on_1440_trend_since
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
