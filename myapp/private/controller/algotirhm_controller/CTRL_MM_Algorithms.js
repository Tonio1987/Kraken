// LOG SYSTEM
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

const async = require('async');
const moment = require('moment');

const CTRL_MMCalculation = require('./CTRL_MMCalculation');
const CTRL_MMEvolCalculation = require('./CTRL_MMEvolCalculation');
const CTRL_MMCompare = require('./CTRL_MMCompare');
const CTRL_MMIndicators = require('./CTRL_MMIndicators');

module.exports = {
    Launch_MM_Algorithms: function () {
        async.series([
            STEP_CTRL_MMEvolCalculation,
            STEP_CTRL_MMCompareCalculation,
            STEP_CTRL_MMIndicators,
            STEP_finish
        ], function (err, result) {
            // Nothing to do here
        });

        function STEP_CTRL_MMEvolCalculation() {
            logger.info('*** CONTROLLER *** ->  Processing MMEvolCalculation ...  [ RUNNING ]');
            CTRL_MMEvolCalculation.CalculateMMEvol(STEP_CTRL_MMCompareCalculation, STEP_finish);
        }
        function STEP_CTRL_MMCompareCalculation() {
            logger.info('*** CONTROLLER *** ->  Processing MMCompare ...  [ RUNNING ]');
            CTRL_MMCompare.CalculateMMCompare(STEP_CTRL_MMIndicators, STEP_finish);
        }
        function STEP_CTRL_MMIndicators() {
            logger.info('*** CONTROLLER *** ->  Processing MMIndicators ...  [ RUNNING ]');
            CTRL_MMIndicators.CalculateMMIndicators(STEP_finish, STEP_finish);
        }

        function STEP_finish(err) {
            if (err) {
                logger.error(err);
                logger.error('*** CONTROLLER *** ->  Process MM ... [ FAILED ]');

            }
            logger.info('*** CONTROLLER *** ->  Process MM  ... [ DONE ]');
        }
    }
};