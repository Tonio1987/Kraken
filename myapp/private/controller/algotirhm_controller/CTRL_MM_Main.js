var colors = require('colors/safe');
const async = require('async');
const moment = require('moment');

const CTRL_MMCalculation = require('./CTRL_MMCalculation');
const CTRL_MMEvolCalculation = require('./CTRL_MMEvolCalculation');
const CTRL_MMCompare = require('./CTRL_MMCompare');
const CTRL_MMIndicators = require('./CTRL_MMIndicators');

module.exports = {
    Launch_MM_Algorithms: function () {
        async.series([
            STEP_CTRL_MMCalculation,
            STEP_CTRL_MMAlgorithms,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_CTRL_MMCalculation() {
            console.log(colors.yellow(moment().format('L') + ' - ' + moment().format('LTS')), colors.cyan(' *** CONTROLER ***'), colors.white('- > Processing MM ... '));
            CTRL_MMCalculation.CalculateMM(STEP_CTRL_MMAlgorithms);
        }

        function STEP_CTRL_MMAlgorithms() {
            async.parallel([
                STEP_CTRL_MMEvolCalculation,
                STEP_CTRL_MMCompareCalculation,
                STEP_CTRL_MMIndicators
            ], function (err, result) {
                // Nothing to do here
            });

            function STEP_CTRL_MMEvolCalculation() {
                console.log(colors.yellow(moment().format('L') + ' - ' + moment().format('LTS')), colors.cyan(' *** CONTROLER ***'), colors.white('- > Processing MM Evol ... '));
                CTRL_MMEvolCalculation.CalculateMMEvol(STEP_finish, 'MMEvolCalculation');
            }
            function STEP_CTRL_MMCompareCalculation() {
                console.log(colors.yellow(moment().format('L') + ' - ' + moment().format('LTS')), colors.cyan(' *** CONTROLER ***'), colors.white('- > Processing MM Compare ... '));
                CTRL_MMCompare.CalculateMMCompare(STEP_finish, 'MMCompare');
            }
            function STEP_CTRL_MMIndicators() {
                console.log(colors.yellow(moment().format('L') + ' - ' + moment().format('LTS')), colors.cyan(' *** CONTROLER ***'), colors.white('- > Processing MM Indicators ... '));
                CTRL_MMIndicators.CalculateMMIndicators(STEP_finish, 'MMIndicators');
            }
        }

        function STEP_finish(err, step) {
            if (err) {
                console.log(err);
                console.log(colors.yellow(moment().format('L') + ' - ' + moment().format('LTS')), colors.cyan(' *** CONTROLER ***'), colors.white('- > Process MM : '+step+' '), colors.brightRed('[ FAILED ]'));
            }
            console.log(colors.yellow(moment().format('L') + ' - ' + moment().format('LTS')), colors.cyan(' *** CONTROLER ***'), colors.white('- > Process MM : '+step+' '), colors.brightGreen('[ DONE ]'));
        }
    }
};