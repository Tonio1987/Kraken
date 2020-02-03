// SET ENV VARIABLES
// LOG SYSTEM
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

// NODE MODULE CALL
const moment = require('moment');
const cron = require('node-cron');

// START
logger.info('************************************************************************');
logger.info('*****************            - FonZzTonio -            *****************');
logger.info('********************      --------------------      ********************');
logger.info('************************  KRAKEN TRADING ROBOT  ************************');
logger.info('********************      --------------------      ********************');
logger.info('*****************               2019 (c)               *****************');
logger.info('************************************************************************');
logger.info('------> Starting server ...  ');

logger.info('-------> Scheduler initialization ...  ');
const CTRL_CronScheduler = require('./controller/cron_controller/CTRL_CronScheduler');
CTRL_CronScheduler.Init_CronScheduler();

logger.info('-------> Main Scheduler initialization ...  ');
cron.schedule('*/10 * * * * *', () => {
    CTRL_CronScheduler.Reload_CronScheduler();
});

logger.info('-------> Server started !');

