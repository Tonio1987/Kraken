const moment = require('moment');
moment.locale('fr');

module.exports = {
    calculateMMCompare: function(callback, pair, MM, MMC, date, hour, timestam) {
        new Promise(function (resolve, reject) {

            // INDICATOR 1
            let mms_on_mml_weigth_global = 0;
            let mms_on_mml_weigth_ct = 0;
            let mms_on_mml_weigth_mt = 0;
            let mms_on_mml_weigth_lt = 0;
            // INDICATOR 2
            let mms_on_mml_since_weigth_global = 0;
            let mms_on_mml_since_weigth_ct = 0;
            let mms_on_mml_since_weigth_mt = 0;
            let mms_on_mml_since_weigth_lt = 0;
            // INDICATOR 3
            let mms_on_mml_trend_weigth_global = 0;
            let mms_on_mml_trend_weigth_ct = 0;
            let mms_on_mml_trend_weigth_mt = 0;
            let mms_on_mml_trend_weigth_lt = 0;
            // INDICATOR 4
            let mms_on_mml_trend_since_weigth_global = 0;
            let mms_on_mml_trend_since_weigth_ct = 0;
            let mms_on_mml_trend_since_weigth_mt = 0;
            let mms_on_mml_trend_since_weigth_lt = 0;

            // COEF
            let coef_indicator_1 = 1;
            let coef_indicator_2 = 5;
            let coef_indicator_3 = 10;
            let coef_indicator_4 = 15;

            // PAIR RATING
            let pair_mm_rating_global = 0;
            let pair_mm_rating_ct = 0;
            let pair_mm_rating_mt = 0;
            let pair_mm_rating_lt = 0;


            // GLOBAL RATE
            let mm5_on_mm60_weight = 0.0455;
            let mm60_on_mm180_weight = 0.1364;
            let mm60_on_mm360_weight = 0.0909;

            let mm180_on_mm360_weight = 0.1818;
            let mm180_on_mm540_weight = 0.1364;
            let mm360_on_mm540_weight = 0.1364;
            let mm360_on_mm720_weight = 0.0909;

            let mm540_on_mm720_weight = 0.0909;
            let mm540_on_mm1440_weight = 0.0455;
            let mm720_on_mm1440_weight = 0.0455;

            // CT RATE
            let mm5_on_mm60_weight_ct = 0.40;
            let mm60_on_mm180_weight_ct = 0.40;
            let mm60_on_mm360_weight_ct = 0.20;
            // MT RATE
            let mm180_on_mm360_weight_mt = 0.3;
            let mm180_on_mm540_weight_mt = 0.2;
            let mm360_on_mm540_weight_mt = 0.3;
            let mm360_on_mm720_weight_mt = 0.2;
            // LT RATE
            let mm540_on_mm720_weight_lt = 0.4;
            let mm540_on_mm1440_weight_lt = 0.4;
            let mm720_on_mm1440_weight_lt = 0.3;

            // CT
            if(MM.mm5 > MM.mm60){
                mms_on_mml_weigth_global = mms_on_mml_weigth_global + mm5_on_mm60_weight;
                mms_on_mml_since_weigth_global = mms_on_mml_since_weigth_global + (MMC.mm5_upto_60_since * mm5_on_mm60_weight);

                mms_on_mml_weigth_ct = mms_on_mml_weigth_ct + mm5_on_mm60_weight_ct;
                mms_on_mml_since_weigth_ct = mms_on_mml_since_weigth_ct + (MMC.mm5_upto_60_since * mm5_on_mm60_weight_ct);

                if(MMC.MMC.mm5_upto_60 === "UP"){
                    mms_on_mml_trend_weigth_global = mms_on_mml_trend_weigth_global + mm5_on_mm60_weight;
                    mms_on_mml_trend_since_weigth_global = mms_on_mml_trend_since_weigth_global + (MMC.mm5_upto_60_trend_since * mm5_on_mm60_weight);

                    mms_on_mml_trend_weigth_ct = mms_on_mml_trend_weigth_ct + mm5_on_mm60_weight_ct;
                    mms_on_mml_trend_since_weigth_ct = mms_on_mml_trend_since_weigth_global_ct + (MMC.mm5_upto_60_trend_since * mm5_on_mm60_weight_ct);

                }else{
                    mms_on_mml_trend_weigth_global = mms_on_mml_trend_weigth_global + (0.25*mm5_on_mm60_weight);
                    mms_on_mml_trend_since_weigth_global = mms_on_mml_trend_since_weigth_global + (0.25 * MMC.mm5_upto_60_trend_since * mm5_on_mm60_weight);

                    mms_on_mml_trend_weigth_ct = mms_on_mml_trend_weigth_ct + (0.25*mm5_on_mm60_weight_ct);
                    mms_on_mml_trend_since_weigth_ct = mms_on_mml_trend_since_weigth_global_ct + (0.25 * MMC.mm5_upto_60_trend_since * mm5_on_mm60_weight_ct);
                }
            }

            if(MM.mm60 > MM.mm180){
                mms_on_mml_weigth_global = mms_on_mml_weigth_global + mm60_on_mm180_weight;
                mms_on_mml_since_weigth_global = mms_on_mml_since_weigth_global + (MMC.mm60_upto_180_since * mm60_on_mm180_weight);

                mms_on_mml_weigth_ct = mms_on_mml_weigth_ct + mm60_on_mm180_weight_ct;
                mms_on_mml_since_weigth_ct = mms_on_mml_since_weigth_ct + (MMC.mm60_upto_180_since * mm60_on_mm180_weight_ct);

                if(MMC.MMC.mm60_upto_180 === "UP"){
                    mms_on_mml_trend_weigth_global = mms_on_mml_trend_weigth_global + mm60_on_mm180_weight;
                    mms_on_mml_trend_since_weigth_global = mms_on_mml_trend_since_weigth_global + (MMC.mm60_upto_180_trend_since * mm60_on_mm180_weight);

                    mms_on_mml_trend_weigth_ct = mms_on_mml_trend_weigth_ct + mm60_on_mm180_weight_ct;
                    mms_on_mml_trend_since_weigth_ct = mms_on_mml_trend_since_weigth_global_ct + (MMC.mm60_upto_180_trend_since * mm60_on_mm180_weight_ct);

                }else{
                    mms_on_mml_trend_weigth_global = mms_on_mml_trend_weigth_global + (0.25*mm60_on_mm180_weight);
                    mms_on_mml_trend_since_weigth_global = mms_on_mml_trend_since_weigth_global + (0.25 * MMC.mm60_upto_180_trend_since * mm60_on_mm180_weight);

                    mms_on_mml_trend_weigth_ct = mms_on_mml_trend_weigth_ct + (0.25*mm60_on_mm180_weight_ct);
                    mms_on_mml_trend_since_weigth_ct = mms_on_mml_trend_since_weigth_global_ct + (0.25 * MMC.mm60_upto_180_trend_since * mm60_on_mm180_weight_ct);
                }
            }
            if(MM.mm60 > MM.mm360){
                mms_on_mml_weigth_global = mms_on_mml_weigth_global + mm60_on_mm360_weight;
                mms_on_mml_since_weigth_global = mms_on_mml_since_weigth_global + (MMC.mm60_upto_360_since * mm60_on_mm360_weight);

                mms_on_mml_weigth_ct = mms_on_mml_weigth_ct + mm60_on_mm360_weight_ct;
                mms_on_mml_since_weigth_ct = mms_on_mml_since_weigth_ct + (MMC.mm60_upto_360_since * mm60_on_mm360_weight_ct);

                if(MMC.MMC.mm60_upto_360 === "UP"){
                    mms_on_mml_trend_weigth_global = mms_on_mml_trend_weigth_global + mm60_on_mm360_weight;
                    mms_on_mml_trend_since_weigth_global = mms_on_mml_trend_since_weigth_global + (MMC.mm60_upto_360_trend_since * mm60_on_mm360_weight);

                    mms_on_mml_trend_weigth_ct = mms_on_mml_trend_weigth_ct + mm60_on_mm360_weight_ct;
                    mms_on_mml_trend_since_weigth_ct = mms_on_mml_trend_since_weigth_global_ct + (MMC.mm60_upto_360_trend_since * mm60_on_mm360_weight_ct);

                }else{
                    mms_on_mml_trend_weigth_global = mms_on_mml_trend_weigth_global + (0.25*mm60_on_mm360_weight);
                    mms_on_mml_trend_since_weigth_global = mms_on_mml_trend_since_weigth_global + (0.25 * MMC.mm60_upto_360_trend_since * mm60_on_mm360_weight);

                    mms_on_mml_trend_weigth_ct = mms_on_mml_trend_weigth_ct + (0.25*mm60_on_mm360_weight_ct);
                    mms_on_mml_trend_since_weigth_ct = mms_on_mml_trend_since_weigth_global_ct + (0.25 * MMC.mm60_upto_360_trend_since * mm60_on_mm360_weight_ct);
                }
            }

            // MT
            if(MM.mm180 > MM.mm360){
                mms_on_mml_weigth_global = mms_on_mml_weigth_global + mm180_on_mm360_weight;
                mms_on_mml_since_weigth_global = mms_on_mml_since_weigth_global + (MMC.mm180_upto_360_since * mm180_on_mm360_weight);

                mms_on_mml_weigth_mt = mms_on_mml_weigth_mt + mm180_on_mm360_weight_mt;
                mms_on_mml_since_weigth_mt = mms_on_mml_since_weigth_mt + (MMC.mm180_upto_360_since * mm180_on_mm360_weight_mt);

                if(MMC.MMC.mm180_upto_360 === "UP"){
                    mms_on_mml_trend_weigth_global = mms_on_mml_trend_weigth_global + mm180_on_mm360_weight;
                    mms_on_mml_trend_since_weigth_global = mms_on_mml_trend_since_weigth_global + (MMC.mm180_upto_360_trend_since * mm180_on_mm360_weight);

                    mms_on_mml_trend_weigth_mt = mms_on_mml_trend_weigth_mt + mm180_on_mm360_weight_mt;
                    mms_on_mml_trend_since_weigth_mt = mms_on_mml_trend_since_weigth_mt + (MMC.mm180_upto_360_trend_since * mm180_on_mm360_weight_mt);

                }else{
                    mms_on_mml_trend_weigth_global = mms_on_mml_trend_weigth_global + (0.25*mm180_on_mm360_weight);
                    mms_on_mml_trend_since_weigth_global = mms_on_mml_trend_since_weigth_global + (0.25 * MMC.mm180_upto_360_trend_since * mm180_on_mm360_weight);

                    mms_on_mml_trend_weigth_mt = mms_on_mml_trend_weigth_mt + (0.25*mm180_on_mm360_weight_mt);
                    mms_on_mml_trend_since_weigth_mt = mms_on_mml_trend_since_weigth_mt + (0.25 * MMC.mm180_upto_360_trend_since * mm180_on_mm360_weight_mt);
                 }
            }
            if(MM.mm180 > MM.mm540){
                mms_on_mml_weigth_global = mms_on_mml_weigth_global + mm180_on_mm540_weight;
                mms_on_mml_since_weigth_global = mms_on_mml_since_weigth_global + (MMC.mm180_upto_540_since * mm180_on_mm540_weight);

                mms_on_mml_weigth_mt = mms_on_mml_weigth_mt + mm180_on_mm540_weight_mt;
                mms_on_mml_since_weigth_mt = mms_on_mml_since_weigth_mt + (MMC.mm180_upto_540_since * mm180_on_mm540_weight_mt);

                if(MMC.MMC.mm180_upto_540 === "UP"){
                    mms_on_mml_trend_weigth_global = mms_on_mml_trend_weigth_global + mm180_on_mm540_weight;
                    mms_on_mml_trend_since_weigth_global = mms_on_mml_trend_since_weigth_global + (MMC.mm180_upto_540_trend_since * mm180_on_mm540_weight);

                    mms_on_mml_trend_weigth_mt = mms_on_mml_trend_weigth_mt + mm180_on_mm540_weight_mt;
                    mms_on_mml_trend_since_weigth_mt = mms_on_mml_trend_since_weigth_mt + (MMC.mm180_upto_540_trend_since * mm180_on_mm540_weight_mt);

                }else{
                    mms_on_mml_trend_weigth_global = mms_on_mml_trend_weigth_global + (0.25*mm180_on_mm540_weight);
                    mms_on_mml_trend_since_weigth_global = mms_on_mml_trend_since_weigth_global + (0.25 * MMC.mm180_upto_540_trend_since * mm180_on_mm540_weight);

                    mms_on_mml_trend_weigth_mt = mms_on_mml_trend_weigth_mt + (0.25*mm180_on_mm540_weight_mt);
                    mms_on_mml_trend_since_weigth_mt = mms_on_mml_trend_since_weigth_mt + (0.25 * MMC.mm180_upto_540_trend_since * mm180_on_mm540_weight_mt);
                }
            }
            if(MM.mm360 > MM.mm540){
                mms_on_mml_weigth_global = mms_on_mml_weigth_global + mm360_on_mm540_weight;
                mms_on_mml_since_weigth_global = mms_on_mml_since_weigth_global + (MMC.mm360_upto_540_since * mm360_on_mm540_weight);

                mms_on_mml_weigth_mt = mms_on_mml_weigth_mt + mm360_on_mm540_weight_mt;
                mms_on_mml_since_weigth_mt = mms_on_mml_since_weigth_mt + (MMC.mm360_upto_540_since * mm360_on_mm540_weight_mt);

                if(MMC.MMC.mm360_upto_540 === "UP"){
                    mms_on_mml_trend_weigth_global = mms_on_mml_trend_weigth_global + mm360_on_mm540_weight;
                    mms_on_mml_trend_since_weigth_global = mms_on_mml_trend_since_weigth_global + (MMC.mm360_upto_540_trend_since * mm360_on_mm540_weight);

                    mms_on_mml_trend_weigth_mt = mms_on_mml_trend_weigth_mt + mm360_on_mm540_weight_mt;
                    mms_on_mml_trend_since_weigth_mt = mms_on_mml_trend_since_weigth_mt + (MMC.mm360_upto_540_trend_since * mm360_on_mm540_weight_mt);

                }else{
                    mms_on_mml_trend_weigth_global = mms_on_mml_trend_weigth_global + (0.25*mm360_on_mm540_weight);
                    mms_on_mml_trend_since_weigth_global = mms_on_mml_trend_since_weigth_global + (0.25 * MMC.mm360_upto_540_trend_since * mm360_on_mm540_weight);

                    mms_on_mml_trend_weigth_mt = mms_on_mml_trend_weigth_mt + (0.25*mm360_on_mm540_weight_mt);
                    mms_on_mml_trend_since_weigth_mt = mms_on_mml_trend_since_weigth_mt + (0.25 * MMC.mm360_upto_540_trend_since * mm360_on_mm540_weight_mt);
                }
            }
            if(MM.mm360 > MM.mm720){
                mms_on_mml_weigth_global = mms_on_mml_weigth_global + mm360_on_mm720_weight;
                mms_on_mml_since_weigth_global = mms_on_mml_since_weigth_global + (MMC.mm360_upto_720_since * mm360_on_mm720_weight);

                mms_on_mml_weigth_mt = mms_on_mml_weigth_mt + mm360_on_mm720_weight_mt;
                mms_on_mml_since_weigth_mt = mms_on_mml_since_weigth_mt + (MMC.mm360_upto_720_since * mm360_on_mm720_weight_mt);

                if(MMC.MMC.mm360_upto_720 === "UP"){
                    mms_on_mml_trend_weigth_global = mms_on_mml_trend_weigth_global + mm360_on_mm720_weight;
                    mms_on_mml_trend_since_weigth_global = mms_on_mml_trend_since_weigth_global + (MMC.mm360_upto_720_trend_since * mm360_on_mm720_weight);

                    mms_on_mml_trend_weigth_mt = mms_on_mml_trend_weigth_mt + mm360_on_mm720_weight_mt;
                    mms_on_mml_trend_since_weigth_mt = mms_on_mml_trend_since_weigth_mt + (MMC.mm360_upto_720_trend_since * mm360_on_mm720_weight_mt);

                }else{
                    mms_on_mml_trend_weigth_global = mms_on_mml_trend_weigth_global + (0.25*mm360_on_mm720_weight);
                    mms_on_mml_trend_since_weigth_global = mms_on_mml_trend_since_weigth_global + (0.25 * MMC.mm360_upto_720_trend_since * mm360_on_mm720_weight);

                    mms_on_mml_trend_weigth_mt = mms_on_mml_trend_weigth_mt + (0.25*mm360_on_mm720_weight_mt);
                    mms_on_mml_trend_since_weigth_mt = mms_on_mml_trend_since_weigth_mt + (0.25 * MMC.mm360_upto_720_trend_since * mm360_on_mm720_weight_mt);
                }
            }

            // LT
            if(MM.mm540 > MM.mm720){
                mms_on_mml_weigth_global = mms_on_mml_weigth_global + mm540_on_mm720_weight;
                mms_on_mml_since_weigth_global = mms_on_mml_since_weigth_global + (MMC.mm540_upto_720_since * mm540_on_mm720_weight);

                mms_on_mml_weigth_lt = mms_on_mml_weigth_lt + mm540_on_mm720_weight_lt;
                mms_on_mml_since_weigth_lt = mms_on_mml_since_weigth_lt + (MMC.mm540_upto_720_since * mm540_on_mm720_weight_lt);

                if(MMC.MMC.mm540_upto_720 === "UP"){
                    mms_on_mml_trend_weigth_global = mms_on_mml_trend_weigth_global + mm540_on_mm720_weight;
                    mms_on_mml_trend_since_weigth_global = mms_on_mml_trend_since_weigth_global + (MMC.mm540_upto_720_trend_since * mm540_on_mm720_weight);

                    mms_on_mml_trend_weigth_lt = mms_on_mml_trend_weigth_lt + mm540_on_mm720_weight_lt;
                    mms_on_mml_trend_since_weigth_lt = mms_on_mml_trend_since_weigth_lt + (MMC.mm540_upto_720_trend_since * mm540_on_mm720_weight_lt);

                }else{
                    mms_on_mml_trend_weigth_global = mms_on_mml_trend_weigth_global + (0.25*mm540_on_mm720_weight);
                    mms_on_mml_trend_since_weigth_global = mms_on_mml_trend_since_weigth_global + (0.25 * MMC.mm540_upto_720_trend_since * mm540_on_mm720_weight);

                    mms_on_mml_trend_weigth_lt = mms_on_mml_trend_weigth_lt + (0.25*mm540_on_mm720_weight_lt);
                    mms_on_mml_trend_since_weigth_lt = mms_on_mml_trend_since_weigth_lt + (0.25 * MMC.mm540_upto_720_trend_since * mm540_on_mm720_weight_lt);
                }
            }
            if(MM.mm540 > MM.mm1440){
                mms_on_mml_weigth_global = mms_on_mml_weigth_global + mm540_on_mm1440_weight;
                mms_on_mml_since_weigth_global = mms_on_mml_since_weigth_global + (MMC.mm540_upto_1440_since * mm540_on_mm1440_weight);

                mms_on_mml_weigth_lt = mms_on_mml_weigth_lt + mm540_on_mm1440_weight_lt;
                mms_on_mml_since_weigth_lt = mms_on_mml_since_weigth_lt + (MMC.mm540_upto_1440_since * mm540_on_mm1440_weight_lt);
                if(MMC.MMC.mm540_upto_1440 === "UP"){
                    mms_on_mml_trend_weigth_global = mms_on_mml_trend_weigth_global + mm540_on_mm1440_weight;
                    mms_on_mml_trend_since_weigth_global = mms_on_mml_trend_since_weigth_global + (MMC.mm540_upto_1440_trend_since * mm540_on_mm1440_weight);

                    mms_on_mml_trend_weigth_lt = mms_on_mml_trend_weigth_lt + mm540_on_mm1440_weight_lt;
                    mms_on_mml_trend_since_weigth_lt = mms_on_mml_trend_since_weigth_lt + (MMC.mm540_upto_1440_trend_since * mm540_on_mm1440_weight_lt);

                }else{
                    mms_on_mml_trend_weigth_global = mms_on_mml_trend_weigth_global + (0.25*mm540_on_mm1440_weight);
                    mms_on_mml_trend_since_weigth_global = mms_on_mml_trend_since_weigth_global + (0.25 * MMC.mm540_upto_1440_trend_since * mm540_on_mm1440_weight);

                    mms_on_mml_trend_weigth_lt = mms_on_mml_trend_weigth_lt + (0.25*mm540_on_mm1440_weight_lt);
                    mms_on_mml_trend_since_weigth_lt = mms_on_mml_trend_since_weigth_lt + (0.25 * MMC.mm540_upto_1440_trend_since * mm540_on_mm1440_weight_lt);
                }
            }
            if(MM.mm720 > MM.mm1440){
                mms_on_mml_weigth_global = mms_on_mml_weigth_global + mm720_on_mm1440_weight;
                mms_on_mml_since_weigth_global = mms_on_mml_since_weigth_global + (MMC.mm720_upto_1440_since * mm720_on_mm1440_weight);

                mms_on_mml_weigth_lt = mms_on_mml_weigth_lt + mm720_on_mm1440_weight_lt;
                mms_on_mml_since_weigth_lt = mms_on_mml_since_weigth_lt + (MMC.mm720_upto_1440_since * mm720_on_mm1440_weight_lt);

                if(MMC.MMC.mm720_upto_1440 === "UP"){
                    mms_on_mml_trend_weigth_global = mms_on_mml_trend_weigth_global + mm720_on_mm1440_weight;
                    mms_on_mml_trend_since_weigth_global = mms_on_mml_trend_since_weigth_global + (MMC.mm720_upto_1440_trend_since * mm720_on_mm1440_weight);

                    mms_on_mml_trend_weigth_lt = mms_on_mml_trend_weigth_lt + mm720_on_mm1440_weight_lt;
                    mms_on_mml_trend_since_weigth_lt = mms_on_mml_trend_since_weigth_lt + (MMC.mm720_upto_1440_trend_since * mm720_on_mm1440_weight_lt);

                }else{
                    mms_on_mml_trend_weigth_global = mms_on_mml_trend_weigth_global + (0.25*mm720_on_mm1440_weight);
                    mms_on_mml_trend_since_weigth_global = mms_on_mml_trend_since_weigth_global + (0.25 * MMC.mm720_upto_1440_trend_since * mm720_on_mm1440_weight);

                    mms_on_mml_trend_weigth_lt = mms_on_mml_trend_weigth_lt + (0.25*mm720_on_mm1440_weight_lt);
                    mms_on_mml_trend_since_weigth_lt = mms_on_mml_trend_since_weigth_lt + (0.25 * MMC.mm720_upto_1440_trend_since * mm720_on_mm1440_weight_lt);
                }
            }

            pair_mm_rating_global = (coef_indicator_1*mms_on_mml_weigth_global) + (coef_indicator_2*mms_on_mml_since_weigth_global) + (coef_indicator_3*mms_on_mml_trend_weigth_global) + (coef_indicator_4*mms_on_mml_trend_since_weigth_global);
            pair_mm_rating_ct = (coef_indicator_1*mms_on_mml_weigth_ct) + (coef_indicator_2*mms_on_mml_since_weigth_ct) + (coef_indicator_3*mms_on_mml_trend_weigth_ct) + (coef_indicator_4*mms_on_mml_trend_since_weigth_ct);
            pair_mm_rating_mt = (coef_indicator_1*mms_on_mml_weigth_mt) + (coef_indicator_2*mms_on_mml_since_weigth_mt) + (coef_indicator_3*mms_on_mml_trend_weigth_mt) + (coef_indicator_4*mms_on_mml_trend_since_weigth_mt);
            pair_mm_rating_lt = (coef_indicator_1*mms_on_mml_weigth_lt) + (coef_indicator_2*mms_on_mml_since_weigth_lt) + (coef_indicator_3*mms_on_mml_trend_weigth_lt) + (coef_indicator_4*mms_on_mml_trend_since_weigth_lt);

            let mmIndicator = {
                insert_date: date,
                insert_hour: hour,
                insert_timestamp: timestamp,
                pair: pair,
                mms_on_mml_weigth_global: mms_on_mml_weigth_global,
                mms_on_mml_weigth_ct: mms_on_mml_weigth_ct,
                mms_on_mml_weigth_mt: mms_on_mml_weigth_mt,
                mms_on_mml_weigth_lt: mms_on_mml_weigth_lt,
                mms_on_mml_since_weigth_global: mms_on_mml_since_weigth_global,
                mms_on_mml_since_weigth_ct: mms_on_mml_since_weigth_ct,
                mms_on_mml_since_weigth_mt: mms_on_mml_since_weigth_mt,
                mms_on_mml_since_weigth_lt: mms_on_mml_since_weigth_lt,
                mms_on_mml_trend_weigth_global: mms_on_mml_trend_weigth_global,
                mms_on_mml_trend_weigth_ct: mms_on_mml_trend_weigth_ct,
                mms_on_mml_trend_weigth_mt: mms_on_mml_trend_weigth_mt,
                mms_on_mml_trend_weigth_lt: mms_on_mml_trend_weigth_lt,
                mms_on_mml_trend_since_weigth_global: mms_on_mml_trend_since_weigth_global,
                mms_on_mml_trend_since_weigth_ct: mms_on_mml_trend_since_weigth_ct,
                mms_on_mml_trend_since_weigth_mt: mms_on_mml_trend_since_weigth_mt,
                mms_on_mml_trend_since_weigth_lt: mms_on_mml_trend_since_weigth_lt

            }
            resolve(mmIndicator);
        }).then(function(mmIndicator){
            callback(null, mmIndicator);
        }).catch(function(err) {
            callback(err, null);
        });
    }
};
