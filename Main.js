// SET ENV VARIABLES
require('dotenv').config();

// NODE MODULE CALL
const moment = require('moment');
const cron = require('node-cron');

// INIT SCHEDULERS
const CTRL_CronScheduler = require('./controller/cron_controller/CTRL_CronScheduler');
CTRL_CronScheduler.Init_CronScheduler();

// INIT MAIN SCHEDULER
cron.schedule('*/10 * * * * *', () => {
    CTRL_CronScheduler.Reload_CronScheduler();
});

const CTRL_MMEvolCalculation = require('./controller/algotirhm_controller/CTRL_MMEvolCalculation');
CTRL_MMEvolCalculation.CalculateMMEvol();