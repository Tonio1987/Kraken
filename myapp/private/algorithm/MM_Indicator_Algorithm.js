const moment = require('moment');
moment.locale('fr');

module.exports = {
    calculateMMIndicators: function(callback, pair, MM, MMC, date, hour, timestamp) {
        new Promise(function (resolve, reject) {

            // INDICATOR 1
            var mms_on_mml_weigth_global = 0;
            var mms_on_mml_weigth_ct = 0;
            var mms_on_mml_weigth_mt = 0;
            var mms_on_mml_weigth_lt = 0;
            // INDICATOR 2
            var mms_on_mml_since_weigth_global = 0;
            var mms_on_mml_since_weigth_ct = 0;
            var mms_on_mml_since_weigth_mt = 0;
            var mms_on_mml_since_weigth_lt = 0;
            // INDICATOR 3
            var mms_on_mml_trend_weigth_global = 0;
            var mms_on_mml_trend_weigth_ct = 0;
            var mms_on_mml_trend_weigth_mt = 0;
            var mms_on_mml_trend_weigth_lt = 0;
            // INDICATOR 4
            var mms_on_mml_trend_since_weigth_global = 0;
            var mms_on_mml_trend_since_weigth_ct = 0;
            var mms_on_mml_trend_since_weigth_mt = 0;
            var mms_on_mml_trend_since_weigth_lt = 0;

            // COEF
            var coef_indicator_1 = 1;
            var coef_indicator_2 = 5;
            var coef_indicator_3 = 10;
            var coef_indicator_4 = 15;
            var sum_coef = 31;

            // PAIR RATING
            var pair_mm_rating_global = 0;
            var pair_mm_rating_ct = 0;
            var pair_mm_rating_mt = 0;
            var pair_mm_rating_lt = 0;


            // GLOBAL RATE
            var mm5_on_mm60_weight = 0.0455;
            var mm60_on_mm180_weight = 0.1364;
            var mm60_on_mm360_weight = 0.0909;

            var mm180_on_mm360_weight = 0.1818;
            var mm180_on_mm540_weight = 0.1364;
            var mm360_on_mm540_weight = 0.1364;
            var mm360_on_mm720_weight = 0.0909;

            var mm540_on_mm720_weight = 0.0909;
            var mm540_on_mm1440_weight = 0.0455;
            var mm720_on_mm1440_weight = 0.0455;

            // CT RATE
            var mm5_on_mm60_weight_ct = 0.40;
            var mm60_on_mm180_weight_ct = 0.40;
            var mm60_on_mm360_weight_ct = 0.20;
            // MT RATE
            var mm180_on_mm360_weight_mt = 0.3;
            var mm180_on_mm540_weight_mt = 0.2;
            var mm360_on_mm540_weight_mt = 0.3;
            var mm360_on_mm720_weight_mt = 0.2;
            // LT RATE
            var mm540_on_mm720_weight_lt = 0.4;
            var mm540_on_mm1440_weight_lt = 0.4;
            var mm720_on_mm1440_weight_lt = 0.3;

            // CT
            if(MMC[0].mm5_upto_60_since > 0){
                mms_on_mml_weigth_global = mms_on_mml_weigth_global + mm5_on_mm60_weight;
                mms_on_mml_since_weigth_global = mms_on_mml_since_weigth_global + (MMC[0].mm5_upto_60_since * mm5_on_mm60_weight);

                mms_on_mml_weigth_ct = mms_on_mml_weigth_ct + mm5_on_mm60_weight_ct;
                mms_on_mml_since_weigth_ct = mms_on_mml_since_weigth_ct + (MMC[0].mm5_upto_60_since * mm5_on_mm60_weight_ct);

                if(MMC[0].mm5_on_60_trend === "UP"){
                    mms_on_mml_trend_weigth_global = mms_on_mml_trend_weigth_global + mm5_on_mm60_weight;
                    mms_on_mml_trend_since_weigth_global = mms_on_mml_trend_since_weigth_global + (MMC[0].mm5_on_60_trend_since * mm5_on_mm60_weight);

                    mms_on_mml_trend_weigth_ct = mms_on_mml_trend_weigth_ct + mm5_on_mm60_weight_ct;
                    mms_on_mml_trend_since_weigth_ct = mms_on_mml_trend_since_weigth_ct + (MMC[0].mm5_on_60_trend_since * mm5_on_mm60_weight_ct);

                }else{
                    mms_on_mml_trend_weigth_global = mms_on_mml_trend_weigth_global + (0.25*mm5_on_mm60_weight);
                    mms_on_mml_trend_since_weigth_global = mms_on_mml_trend_since_weigth_global + (0.25 * MMC[0].mm5_on_60_trend_since * mm5_on_mm60_weight);

                    mms_on_mml_trend_weigth_ct = mms_on_mml_trend_weigth_ct + (0.25*mm5_on_mm60_weight_ct);
                    mms_on_mml_trend_since_weigth_ct = mms_on_mml_trend_since_weigth_ct + (0.25 * MMC[0].mm5_on_60_trend_since * mm5_on_mm60_weight_ct);
                }
            }

            if(MMC[0].mm60_upto_180_since > 0){
                mms_on_mml_weigth_global = mms_on_mml_weigth_global + mm60_on_mm180_weight;
                mms_on_mml_since_weigth_global = mms_on_mml_since_weigth_global + (MMC[0].mm60_upto_180_since * mm60_on_mm180_weight);

                mms_on_mml_weigth_ct = mms_on_mml_weigth_ct + mm60_on_mm180_weight_ct;
                mms_on_mml_since_weigth_ct = mms_on_mml_since_weigth_ct + (MMC[0].mm60_upto_180_since * mm60_on_mm180_weight_ct);

                if(MMC[0].mm60_on_180_trend === "UP"){
                    mms_on_mml_trend_weigth_global = mms_on_mml_trend_weigth_global + mm60_on_mm180_weight;
                    mms_on_mml_trend_since_weigth_global = mms_on_mml_trend_since_weigth_global + (MMC[0].mm60_on_180_trend_since * mm60_on_mm180_weight);

                    mms_on_mml_trend_weigth_ct = mms_on_mml_trend_weigth_ct + mm60_on_mm180_weight_ct;
                    mms_on_mml_trend_since_weigth_ct = mms_on_mml_trend_since_weigth_ct + (MMC[0].mm60_on_180_trend_since * mm60_on_mm180_weight_ct);

                }else{
                    mms_on_mml_trend_weigth_global = mms_on_mml_trend_weigth_global + (0.25*mm60_on_mm180_weight);
                    mms_on_mml_trend_since_weigth_global = mms_on_mml_trend_since_weigth_global + (0.25 * MMC[0].mm60_on_180_trend_since * mm60_on_mm180_weight);

                    mms_on_mml_trend_weigth_ct = mms_on_mml_trend_weigth_ct + (0.25*mm60_on_mm180_weight_ct);
                    mms_on_mml_trend_since_weigth_ct = mms_on_mml_trend_since_weigth_ct + (0.25 * MMC[0].mm60_on_180_trend_since * mm60_on_mm180_weight_ct);
                }
            }
            if(MMC[0].mm60_upto_360_since > 0){
                mms_on_mml_weigth_global = mms_on_mml_weigth_global + mm60_on_mm360_weight;
                mms_on_mml_since_weigth_global = mms_on_mml_since_weigth_global + (MMC[0].mm60_upto_360_since * mm60_on_mm360_weight);

                mms_on_mml_weigth_ct = mms_on_mml_weigth_ct + mm60_on_mm360_weight_ct;
                mms_on_mml_since_weigth_ct = mms_on_mml_since_weigth_ct + (MMC[0].mm60_upto_360_since * mm60_on_mm360_weight_ct);

                if(MMC[0].mm60_on_360_trend === "UP"){
                    mms_on_mml_trend_weigth_global = mms_on_mml_trend_weigth_global + mm60_on_mm360_weight;
                    mms_on_mml_trend_since_weigth_global = mms_on_mml_trend_since_weigth_global + (MMC[0].mm60_on_360_trend_since * mm60_on_mm360_weight);

                    mms_on_mml_trend_weigth_ct = mms_on_mml_trend_weigth_ct + mm60_on_mm360_weight_ct;
                    mms_on_mml_trend_since_weigth_ct = mms_on_mml_trend_since_weigth_ct + (MMC[0].mm60_on_360_trend_since * mm60_on_mm360_weight_ct);

                }else{
                    mms_on_mml_trend_weigth_global = mms_on_mml_trend_weigth_global + (0.25*mm60_on_mm360_weight);
                    mms_on_mml_trend_since_weigth_global = mms_on_mml_trend_since_weigth_global + (0.25 * MMC[0].mm60_on_360_trend_since * mm60_on_mm360_weight);

                    mms_on_mml_trend_weigth_ct = mms_on_mml_trend_weigth_ct + (0.25*mm60_on_mm360_weight_ct);
                    mms_on_mml_trend_since_weigth_ct = mms_on_mml_trend_since_weigth_ct + (0.25 * MMC[0].mm60_on_360_trend_since * mm60_on_mm360_weight_ct);
                }
            }

            // MT
            if(MMC[0].mm180_upto_360_since > 0){
                mms_on_mml_weigth_global = mms_on_mml_weigth_global + mm180_on_mm360_weight;
                mms_on_mml_since_weigth_global = mms_on_mml_since_weigth_global + (MMC[0].mm180_upto_360_since * mm180_on_mm360_weight);

                mms_on_mml_weigth_mt = mms_on_mml_weigth_mt + mm180_on_mm360_weight_mt;
                mms_on_mml_since_weigth_mt = mms_on_mml_since_weigth_mt + (MMC[0].mm180_upto_360_since * mm180_on_mm360_weight_mt);

                if(MMC[0].mm180_on_360_trend === "UP"){
                    mms_on_mml_trend_weigth_global = mms_on_mml_trend_weigth_global + mm180_on_mm360_weight;
                    mms_on_mml_trend_since_weigth_global = mms_on_mml_trend_since_weigth_global + (MMC[0].mm180_on_360_trend_since * mm180_on_mm360_weight);

                    mms_on_mml_trend_weigth_mt = mms_on_mml_trend_weigth_mt + mm180_on_mm360_weight_mt;
                    mms_on_mml_trend_since_weigth_mt = mms_on_mml_trend_since_weigth_mt + (MMC[0].mm180_on_360_trend_since * mm180_on_mm360_weight_mt);

                }else{
                    mms_on_mml_trend_weigth_global = mms_on_mml_trend_weigth_global + (0.25*mm180_on_mm360_weight);
                    mms_on_mml_trend_since_weigth_global = mms_on_mml_trend_since_weigth_global + (0.25 * MMC[0].mm180_on_360_trend_since * mm180_on_mm360_weight);

                    mms_on_mml_trend_weigth_mt = mms_on_mml_trend_weigth_mt + (0.25*mm180_on_mm360_weight_mt);
                    mms_on_mml_trend_since_weigth_mt = mms_on_mml_trend_since_weigth_mt + (0.25 * MMC[0].mm180_on_360_trend_since * mm180_on_mm360_weight_mt);
                }
            }
            if(MMC[0].mm180_upto_540_since > 0){
                mms_on_mml_weigth_global = mms_on_mml_weigth_global + mm180_on_mm540_weight;
                mms_on_mml_since_weigth_global = mms_on_mml_since_weigth_global + (MMC[0].mm180_upto_540_since * mm180_on_mm540_weight);

                mms_on_mml_weigth_mt = mms_on_mml_weigth_mt + mm180_on_mm540_weight_mt;
                mms_on_mml_since_weigth_mt = mms_on_mml_since_weigth_mt + (MMC[0].mm180_upto_540_since * mm180_on_mm540_weight_mt);

                if(MMC[0].mm180_on_540_trend === "UP"){
                    mms_on_mml_trend_weigth_global = mms_on_mml_trend_weigth_global + mm180_on_mm540_weight;
                    mms_on_mml_trend_since_weigth_global = mms_on_mml_trend_since_weigth_global + (MMC[0].mm180_on_540_trend_since * mm180_on_mm540_weight);

                    mms_on_mml_trend_weigth_mt = mms_on_mml_trend_weigth_mt + mm180_on_mm540_weight_mt;
                    mms_on_mml_trend_since_weigth_mt = mms_on_mml_trend_since_weigth_mt + (MMC[0].mm180_on_540_trend_since * mm180_on_mm540_weight_mt);

                }else{
                    mms_on_mml_trend_weigth_global = mms_on_mml_trend_weigth_global + (0.25*mm180_on_mm540_weight);
                    mms_on_mml_trend_since_weigth_global = mms_on_mml_trend_since_weigth_global + (0.25 * MMC[0].mm180_on_540_trend_since * mm180_on_mm540_weight);

                    mms_on_mml_trend_weigth_mt = mms_on_mml_trend_weigth_mt + (0.25*mm180_on_mm540_weight_mt);
                    mms_on_mml_trend_since_weigth_mt = mms_on_mml_trend_since_weigth_mt + (0.25 * MMC[0].mm180_on_540_trend_since * mm180_on_mm540_weight_mt);
                }
            }
            if(MMC[0].mm360_upto_540_since > 0){
                mms_on_mml_weigth_global = mms_on_mml_weigth_global + mm360_on_mm540_weight;
                mms_on_mml_since_weigth_global = mms_on_mml_since_weigth_global + (MMC[0].mm360_upto_540_since * mm360_on_mm540_weight);

                mms_on_mml_weigth_mt = mms_on_mml_weigth_mt + mm360_on_mm540_weight_mt;
                mms_on_mml_since_weigth_mt = mms_on_mml_since_weigth_mt + (MMC[0].mm360_upto_540_since * mm360_on_mm540_weight_mt);

                if(MMC[0].mm360_on_540_trend === "UP"){
                    mms_on_mml_trend_weigth_global = mms_on_mml_trend_weigth_global + mm360_on_mm540_weight;
                    mms_on_mml_trend_since_weigth_global = mms_on_mml_trend_since_weigth_global + (MMC[0].mm360_on_540_trend_since * mm360_on_mm540_weight);

                    mms_on_mml_trend_weigth_mt = mms_on_mml_trend_weigth_mt + mm360_on_mm540_weight_mt;
                    mms_on_mml_trend_since_weigth_mt = mms_on_mml_trend_since_weigth_mt + (MMC[0].mm360_on_540_trend_since * mm360_on_mm540_weight_mt);

                }else{
                    mms_on_mml_trend_weigth_global = mms_on_mml_trend_weigth_global + (0.25*mm360_on_mm540_weight);
                    mms_on_mml_trend_since_weigth_global = mms_on_mml_trend_since_weigth_global + (0.25 * MMC[0].mm360_on_540_trend_since * mm360_on_mm540_weight);

                    mms_on_mml_trend_weigth_mt = mms_on_mml_trend_weigth_mt + (0.25*mm360_on_mm540_weight_mt);
                    mms_on_mml_trend_since_weigth_mt = mms_on_mml_trend_since_weigth_mt + (0.25 * MMC[0].mm360_on_540_trend_since * mm360_on_mm540_weight_mt);
                }
            }
            if(MMC[0].mm360_upto_720_since > 0){
                mms_on_mml_weigth_global = mms_on_mml_weigth_global + mm360_on_mm720_weight;
                mms_on_mml_since_weigth_global = mms_on_mml_since_weigth_global + (MMC[0].mm360_upto_720_since * mm360_on_mm720_weight);

                mms_on_mml_weigth_mt = mms_on_mml_weigth_mt + mm360_on_mm720_weight_mt;
                mms_on_mml_since_weigth_mt = mms_on_mml_since_weigth_mt + (MMC[0].mm360_upto_720_since * mm360_on_mm720_weight_mt);

                if(MMC[0].mm360_on_720_trend === "UP"){
                    mms_on_mml_trend_weigth_global = mms_on_mml_trend_weigth_global + mm360_on_mm720_weight;
                    mms_on_mml_trend_since_weigth_global = mms_on_mml_trend_since_weigth_global + (MMC[0].mm360_on_720_trend_since * mm360_on_mm720_weight);

                    mms_on_mml_trend_weigth_mt = mms_on_mml_trend_weigth_mt + mm360_on_mm720_weight_mt;
                    mms_on_mml_trend_since_weigth_mt = mms_on_mml_trend_since_weigth_mt + (MMC[0].mm360_on_720_trend_since * mm360_on_mm720_weight_mt);

                }else{
                    mms_on_mml_trend_weigth_global = mms_on_mml_trend_weigth_global + (0.25*mm360_on_mm720_weight);
                    mms_on_mml_trend_since_weigth_global = mms_on_mml_trend_since_weigth_global + (0.25 * MMC[0].mm360_on_720_trend_since * mm360_on_mm720_weight);

                    mms_on_mml_trend_weigth_mt = mms_on_mml_trend_weigth_mt + (0.25*mm360_on_mm720_weight_mt);
                    mms_on_mml_trend_since_weigth_mt = mms_on_mml_trend_since_weigth_mt + (0.25 * MMC[0].mm360_on_720_trend_since * mm360_on_mm720_weight_mt);
                }
            }

            // LT
            if(MMC[0].mm540_upto_720_since > 0){
                mms_on_mml_weigth_global = mms_on_mml_weigth_global + mm540_on_mm720_weight;
                mms_on_mml_since_weigth_global = mms_on_mml_since_weigth_global + (MMC[0].mm540_upto_720_since * mm540_on_mm720_weight);

                mms_on_mml_weigth_lt = mms_on_mml_weigth_lt + mm540_on_mm720_weight_lt;
                mms_on_mml_since_weigth_lt = mms_on_mml_since_weigth_lt + (MMC[0].mm540_upto_720_since * mm540_on_mm720_weight_lt);

                if(MMC[0].mm540_on_720_trend === "UP"){
                    mms_on_mml_trend_weigth_global = mms_on_mml_trend_weigth_global + mm540_on_mm720_weight;
                    mms_on_mml_trend_since_weigth_global = mms_on_mml_trend_since_weigth_global + (MMC[0].mm540_on_720_trend_since * mm540_on_mm720_weight);

                    mms_on_mml_trend_weigth_lt = mms_on_mml_trend_weigth_lt + mm540_on_mm720_weight_lt;
                    mms_on_mml_trend_since_weigth_lt = mms_on_mml_trend_since_weigth_lt + (MMC[0].mm540_on_720_trend_since * mm540_on_mm720_weight_lt);

                }else{
                    mms_on_mml_trend_weigth_global = mms_on_mml_trend_weigth_global + (0.25*mm540_on_mm720_weight);
                    mms_on_mml_trend_since_weigth_global = mms_on_mml_trend_since_weigth_global + (0.25 * MMC[0].mm540_on_720_trend_since * mm540_on_mm720_weight);

                    mms_on_mml_trend_weigth_lt = mms_on_mml_trend_weigth_lt + (0.25*mm540_on_mm720_weight_lt);
                    mms_on_mml_trend_since_weigth_lt = mms_on_mml_trend_since_weigth_lt + (0.25 * MMC[0].mm540_on_720_trend_since * mm540_on_mm720_weight_lt);
                }
            }
            if(MMC[0].mm540_upto_1440_since > 0){
                mms_on_mml_weigth_global = mms_on_mml_weigth_global + mm540_on_mm1440_weight;
                mms_on_mml_since_weigth_global = mms_on_mml_since_weigth_global + (MMC[0].mm540_upto_1440_since * mm540_on_mm1440_weight);

                mms_on_mml_weigth_lt = mms_on_mml_weigth_lt + mm540_on_mm1440_weight_lt;
                mms_on_mml_since_weigth_lt = mms_on_mml_since_weigth_lt + (MMC[0].mm540_upto_1440_since * mm540_on_mm1440_weight_lt);
                if(MMC[0].mm540_on_1440_trend === "UP"){
                    mms_on_mml_trend_weigth_global = mms_on_mml_trend_weigth_global + mm540_on_mm1440_weight;
                    mms_on_mml_trend_since_weigth_global = mms_on_mml_trend_since_weigth_global + (MMC[0].mm540_on_1440_trend_since * mm540_on_mm1440_weight);

                    mms_on_mml_trend_weigth_lt = mms_on_mml_trend_weigth_lt + mm540_on_mm1440_weight_lt;
                    mms_on_mml_trend_since_weigth_lt = mms_on_mml_trend_since_weigth_lt + (MMC[0].mm540_on_1440_trend_since * mm540_on_mm1440_weight_lt);

                }else{
                    mms_on_mml_trend_weigth_global = mms_on_mml_trend_weigth_global + (0.25*mm540_on_mm1440_weight);
                    mms_on_mml_trend_since_weigth_global = mms_on_mml_trend_since_weigth_global + (0.25 * MMC[0].mm540_on_1440_trend_since * mm540_on_mm1440_weight);

                    mms_on_mml_trend_weigth_lt = mms_on_mml_trend_weigth_lt + (0.25*mm540_on_mm1440_weight_lt);
                    mms_on_mml_trend_since_weigth_lt = mms_on_mml_trend_since_weigth_lt + (0.25 * MMC[0].mm540_on_1440_trend_since * mm540_on_mm1440_weight_lt);
                }
            }
            if(MMC[0].mm720_upto_1440_since > 0){
                mms_on_mml_weigth_global = mms_on_mml_weigth_global + mm720_on_mm1440_weight;
                mms_on_mml_since_weigth_global = mms_on_mml_since_weigth_global + (MMC[0].mm720_upto_1440_since * mm720_on_mm1440_weight);

                mms_on_mml_weigth_lt = mms_on_mml_weigth_lt + mm720_on_mm1440_weight_lt;
                mms_on_mml_since_weigth_lt = mms_on_mml_since_weigth_lt + (MMC[0].mm720_upto_1440_since * mm720_on_mm1440_weight_lt);

                if(MMC[0].mm720_on_1440_trend === "UP"){
                    mms_on_mml_trend_weigth_global = mms_on_mml_trend_weigth_global + mm720_on_mm1440_weight;
                    mms_on_mml_trend_since_weigth_global = mms_on_mml_trend_since_weigth_global + (MMC[0].mm720_on_1440_trend_since * mm720_on_mm1440_weight);

                    mms_on_mml_trend_weigth_lt = mms_on_mml_trend_weigth_lt + mm720_on_mm1440_weight_lt;
                    mms_on_mml_trend_since_weigth_lt = mms_on_mml_trend_since_weigth_lt + (MMC[0].mm720_on_1440_trend_since * mm720_on_mm1440_weight_lt);

                }else{
                    mms_on_mml_trend_weigth_global = mms_on_mml_trend_weigth_global + (0.25*mm720_on_mm1440_weight);
                    mms_on_mml_trend_since_weigth_global = mms_on_mml_trend_since_weigth_global + (0.25 * MMC[0].mm720_on_1440_trend_since * mm720_on_mm1440_weight);

                    mms_on_mml_trend_weigth_lt = mms_on_mml_trend_weigth_lt + (0.25*mm720_on_mm1440_weight_lt);
                    mms_on_mml_trend_since_weigth_lt = mms_on_mml_trend_since_weigth_lt + (0.25 * MMC[0].mm720_on_1440_trend_since * mm720_on_mm1440_weight_lt);
                }
            }

            mms_on_mml_since_weigth_global = mms_on_mml_since_weigth_global / 1440;
            mms_on_mml_since_weigth_ct = mms_on_mml_since_weigth_ct / 1440;
            mms_on_mml_since_weigth_mt = mms_on_mml_since_weigth_mt / 1440;
            mms_on_mml_since_weigth_lt = mms_on_mml_since_weigth_lt / 1440;

            mms_on_mml_trend_since_weigth_global = mms_on_mml_trend_since_weigth_global / 1440;
            mms_on_mml_trend_since_weigth_ct = mms_on_mml_trend_since_weigth_ct / 1440;
            mms_on_mml_trend_since_weigth_mt = mms_on_mml_trend_since_weigth_mt / 1440;
            mms_on_mml_trend_since_weigth_lt = mms_on_mml_trend_since_weigth_lt / 1440;

            pair_mm_rating_global = ((coef_indicator_1*mms_on_mml_weigth_global) + (coef_indicator_2*mms_on_mml_since_weigth_global) + (coef_indicator_3*mms_on_mml_trend_weigth_global) + (coef_indicator_4*mms_on_mml_trend_since_weigth_global))/sum_coef;
            pair_mm_rating_ct = ((coef_indicator_1*mms_on_mml_weigth_ct) + (coef_indicator_2*mms_on_mml_since_weigth_ct) + (coef_indicator_3*mms_on_mml_trend_weigth_ct) + (coef_indicator_4*mms_on_mml_trend_since_weigth_ct))/sum_coef;
            pair_mm_rating_mt = ((coef_indicator_1*mms_on_mml_weigth_mt) + (coef_indicator_2*mms_on_mml_since_weigth_mt) + (coef_indicator_3*mms_on_mml_trend_weigth_mt) + (coef_indicator_4*mms_on_mml_trend_since_weigth_mt))/sum_coef;
            pair_mm_rating_lt = ((coef_indicator_1*mms_on_mml_weigth_lt) + (coef_indicator_2*mms_on_mml_since_weigth_lt) + (coef_indicator_3*mms_on_mml_trend_weigth_lt) + (coef_indicator_4*mms_on_mml_trend_since_weigth_lt))/sum_coef;

            var mmIndicator = {
                insert_date: date,
                insert_hour: hour,
                insert_timestamp: timestamp,
                pair: pair,
                pair_mm_rating_global:pair_mm_rating_global,
                pair_mm_rating_ct:pair_mm_rating_ct,
                pair_mm_rating_mt:pair_mm_rating_mt,
                pair_mm_rating_lt:pair_mm_rating_lt,
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
