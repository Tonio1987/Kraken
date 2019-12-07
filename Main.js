// SET ENV VARIABLES
require('dotenv').config();

// NODE MODULE CALL
const moment = require('moment');
const cron = require('node-cron');

// INIT SCHEDULERS
const CTRL = require('./controller/cron_controller/CTRL_CronScheduler');
CTRL.Init_CronScheduler();

// INIT MAIN SCHEDULER
cron.schedule('*/10 * * * * *', () => {
    CTRL.Reload_CronScheduler();
});


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


