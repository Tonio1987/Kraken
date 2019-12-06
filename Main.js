// SET ENV VARIABLES
require('dotenv').config();

// NODE MODULE CALL
const moment = require('moment');

// SCHEDULER CALL
const scheduler = require('./cron/scheduler');

console.log(moment().format('L') + ' - '+ moment().format('LTS') + ' - ### PROGRAM STARTED ###');

// START SCHEDULERS
scheduler.startSchedule();

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


