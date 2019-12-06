// SET ENV VARIABLES
require('dotenv').config();

// NODE MODULE CALL
const moment = require('moment');

// SCHEDULER CALL

console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - ### PROGRAM STARTED ###');

// START SCHEDULERS
const CTRL = require('./controller/cron_controller/CTRL_CronScheduler');
CTRL.Init_CronScheduler();

/*
#############################
         TEST ZONE
#############################
*/


/*
#############################
        END TEST ZONE
#############################
*/


