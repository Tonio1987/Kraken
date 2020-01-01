const moment = require('moment');
moment.locale('fr');

module.exports = {
    prepareStopLossOrders: function(callback, TriggerAutonomous, ActiveTriggersKeltner, LastKeltner, LastBalance, OpenOrders) {
        new Promise(function (resolve, reject) {
            console.log(TriggerAutonomous.length +" TriggerAutonomous");
            console.log(ActiveTriggersKeltner.length +" ActiveTriggersKeltner");
            console.log(LastKeltner.length +" LastKeltner");
            console.log(LastBalance.length +" LastBalance");
            console.log(OpenOrders.length +" OpenOrders");
            const orders =
                {
                    pair: 'EOSEUR',
                    type:  'sell',
                    ordertype: 'stop-loss',
                    price:  2.3,
                    volume:  120.62767,
                    starttm:  0,
                    expiretm: 0
                };
            resolve(orders);

        }).then(function(res){
            callback(null, res);
        }).catch(function(err) {
            err = 'Error during Keltner calculation';
            callback(err, null);
        });
    }
};