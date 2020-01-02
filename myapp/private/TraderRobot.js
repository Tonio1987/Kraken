// SET ENV VARIABLES


// NODE MODULE CALL
const moment = require('moment');
const cron = require('node-cron');

// START
console.log('************************************************************************');
console.log('*****************            - FonZzTonio -            *****************');
console.log('********************      --------------------      ********************');
console.log('************************  KRAKEN TRADING ROBOT  ************************');
console.log('********************      --------------------      ********************');
console.log('*****************               2019 (c)               *****************');
console.log('************************************************************************');
console.log('------> Starting server ...  ');

console.log('-------> Scheduler initialization ...  ');
const CTRL_CronScheduler = require('./controller/cron_controller/CTRL_CronScheduler');
CTRL_CronScheduler.Init_CronScheduler();

console.log('-------> Main Scheduler initialization ...  ');
cron.schedule('*/10 * * * * *', () => {
    CTRL_CronScheduler.Reload_CronScheduler();
});

console.log('-------> Server started !');


