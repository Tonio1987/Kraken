// LOG SYSTEM
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

var colors = require('colors/safe');
const moment = require('moment');
moment.locale('fr');


function handleNewPairConvention() {

    let pairsConvertion = {
        ADACAD: {value: "ADACAD", decimal: 6},
        ADAETH: {value: "ADAETH", decimal: 7},
        ADAEUR: {value: "ADAEUR", decimal: 6},
        ADAUSD: {value: "ADAUSD", decimal: 6},
        ADAXBT: {value: "ADAXBT", decimal: 8},
        ATOMXBT: {value: "ATOMXBT", decimal: 7},
        ATOMETH: {value: "ATOMETH", decimal: 6},
        ATOMEUR: {value: "ATOMEUR", decimal: 4},
        ATOMUSD: {value: "ATOMUSD", decimal: 4},
        BATETH: {value: "BATETH", decimal: 7},
        BATEUR: {value: "BATEUR", decimal: 5},
        BATUSD: {value: "BATUSD", decimal: 5},
        BATXBT: {value: "BATXBT", decimal: 8},
        BCHEUR: {value: "BCHEUR", decimal: 1},
        BCHUSD: {value: "BCHUSD", decimal: 1},
        BCHXBT: {value: "BCHXBT", decimal: 5},
        DAIEUR: {value: "DAIEUR", decimal: 5},
        DAIUSD: {value: "DAIUSD", decimal: 5},
        DAIUSDT: {value: "DAIUSDT", decimal: 3},
        DASHEUR: {value: "DASHEUR", decimal: 3},
        DASHUSD: {value: "DASHUSD", decimal: 3},
        DASHXBT: {value: "DASHXBT", decimal: 5},
        EOSETH: {value: "EOSETH", decimal: 6},
        EOSEUR: {value: "EOSEUR", decimal: 4},
        EOSUSD: {value: "EOSUSD", decimal: 4},
        EOSXBT: {value: "EOSXBT", decimal: 7},
        ETHDAI: {value: "ETHDAI", decimal: 3},
        GNOETH: {value: "GNOETH", decimal: 4},
        GNOEUR: {value: "GNOEUR", decimal: 2},
        GNOUSD: {value: "GNOUSD", decimal: 2},
        GNOXBT: {value: "GNOXBT", decimal: 5},
        ICXETH: {value: "ICXETH", decimal: 7},
        ICXEUR: {value: "ICXEUR", decimal: 4},
        ICXUSD: {value: "ICXUSD", decimal: 4},
        ICXXBT: {value: "ICXXBT", decimal: 8},
        LINKETH: {value: "LINKETH", decimal: 8},
        LINKEUR: {value: "LINKEUR", decimal: 5},
        LINKUSD: {value: "LINKUSD", decimal: 5},
        LINKXBT: {value: "LINKXBT", decimal: 8},
        LSKETH: {value: "LSKETH", decimal: 8},
        LSKEUR: {value: "LSKEUR", decimal: 6},
        LSKUSD: {value: "LSKUSD", decimal: 6},
        LSKXBT: {value: "LSKXBT", decimal: 9},
        NANOETH: {value: "NANOETH", decimal: 8},
        NANOEUR: {value: "NANOEUR", decimal: 6},
        NANOUSD: {value: "NANOUSD", decimal: 6},
        NANOXBT: {value: "NANOXBT", decimal: 9},
        OMGETH: {value: "OMGETH", decimal: 8},
        OMGEUR: {value: "OMGEUR", decimal: 6},
        OMGUSD: {value: "OMGUSD", decimal: 6},
        OMGXBT: {value: "OMGXBT", decimal: 9},
        PAXGETH: {value: "PAXGETH", decimal: 6},
        PAXGEUR: {value: "PAXGEUR", decimal: 2},
        PAXGUSD: {value: "PAXGUSD", decimal: 2},
        PAXGXBT: {value: "PAXGXBT", decimal: 6},
        QTUMCAD: {value: "QTUMCAD", decimal: 5},
        QTUMETH: {value: "QTUMETH", decimal: 7},
        QTUMEUR: {value: "QTUMEUR", decimal: 5},
        QTUMUSD: {value: "QTUMUSD", decimal: 5},
        QTUMXBT: {value: "QTUMXBT", decimal: 7},
        SCETH: {value: "SCETH", decimal: 8},
        SCEUR: {value: "SCEUR", decimal: 5},
        SCUSD: {value: "SCUSD", decimal: 5},
        SCXBT: {value: "SCXBT", decimal: 10},
        USDTZUSD: {value: "USDTUSD", decimal: 4},
        USDTEUR: {value: "USDTEUR", decimal: 4},
        USDTCAD: {value: "USDTCAD", decimal: 4},
        USDTGBP: {value: "USDTGBP", decimal: 4},
        WAVESETH: {value: "WAVESETH", decimal: 7},
        WAVESEUR: {value: "WAVESEUR", decimal: 4},
        WAVESUSD: {value: "WAVESUSD", decimal: 4},
        WAVESXBT: {value: "WAVESXBT", decimal: 8},
        XETCXETH: {value: "ETCETH", decimal: 6},
        XETCXXBT: {value: "ETCXBT", decimal: 6},
        XETCZEUR: {value: "ETCEUR", decimal: 3},
        XETCZUSD: {value: "ETCUSD", decimal: 3},
        XETHXXBT: {value: "ETHXBT", decimal: 5},
        XETHZCAD: {value: "ETHCAD", decimal: 2},
        XETHZEUR: {value: "ETHEUR", decimal: 2},
        XETHZGBP: {value: "ETHGBP", decimal: 2},
        XETHZUSD: {value: "ETHUSD", decimal: 2},
        XLTCXXBT: {value: "LTCXBT", decimal: 6},
        XLTCZEUR: {value: "LTCEUR", decimal: 2},
        XLTCZUSD: {value: "LTCUSD", decimal: 2},
        XMLNXETH: {value: "MLNETH", decimal: 5},
        XMLNXXBT: {value: "MLNXBT", decimal: 6},
        XMLNZEUR: {value: "MLNEUR", decimal: 3},
        XMLNZUSD: {value: "MLNUSD", decimal: 3},
        XREPXETH: {value: "REPETH", decimal: 5},
        XREPXXBT: {value: "REPXBT", decimal: 6},
        XREPZEUR: {value: "REPEUR", decimal: 3},
        XREPZUSD: {value: "REPUSD", decimal: 3},
        XTZETH: {value: "XTZETH", decimal: 7},
        XTZEUR: {value: "XTZEUR", decimal: 4},
        XTZUSD: {value: "XTZUSD", decimal: 4},
        XTZXBT: {value: "XTZXBT", decimal: 7},
        XXBTZCAD: {value: "XBTCAD", decimal: 1},
        XXBTZEUR: {value: "XBTEUR", decimal: 1},
        XXBTZGBP: {value: "XBTGBP", decimal: 1},
        XXBTZUSD: {value: "XBTUSD", decimal: 1},
        XXDGXXBT: {value: "XDGXBT", decimal: 8},
        XXDGZUSD: {value: "XDGUSD", decimal: 7},
        XXLMXXBT: {value: "XLMXBT", decimal: 8},
        XXLMZEUR: {value: "XLMEUR", decimal: 6},
        XXLMZUSD: {value: "XLMUSD", decimal: 6},
        XXMRXXBT: {value: "XMRXBT", decimal: 6},
        XXMRZEUR: {value: "XMREUR", decimal: 2},
        XXMRZUSD: {value: "XMRUSD", decimal: 2},
        XXRPXXBT: {value: "XRPXBT", decimal: 8},
        XXRPZEUR: {value: "XRPEUR", decimal: 5},
        XXRPZUSD: {value: "XRPUSD", decimal: 5},
        XZECXXBT: {value: "ZECXBT", decimal: 5},
        XZECZEUR: {value: "ZECEUR", decimal: 3},
        XZECZUSD: {value: "ZECUSD", decimal: 2},
        ADA: {value:"ADAEUR", decimal: 6},
        ATOM: {value:"ATOMEUR", decimal: 4},
        BAT: {value:"BATEUR", decimal: 5},
        BCH: {value:"BCHEUR", decimal: 1},
        DAI: {value:"DAIEUR", decimal: 5},
        DASH: {value:"DASHEUR", decimal: 3},
        EOS: {value:"EOSEUR", decimal: 4},
        GNO: {value:"GNOEUR", decimal: 2},
        ICX: {value:"ICXEUR", decimal: 4},
        LINK: {value:"LINKEUR", decimal: 5},
        LSK: {value:"LSKEUR", decimal: 6},
        NANO: {value:"NANOEUR", decimal: 6},
        OMG: {value:"OMGEUR", decimal: 6},
        PAXG: {value:"PAXGEUR", decimal: 2},
        QTUM: {value:"QTUMEUR", decimal: 5},
        SC: {value:"SCEUR", decimal: 5},
        USDT: {value:"USDTEUR", decimal: 4},
        WAVES: {value:"WAVESEUR", decimal: 4},
        XETC: {value:"XETCZEUR", decimal: 3},
        XETH: {value:"XETHZEUR", decimal: 2},
        XLTC: {value:"XLTCZEUR", decimal: 2},
        XMLN: {value:"XMLNZEUR", decimal: 3},
        XREP: {value:"XREPZEUR", decimal: 3},
        XTZ: {value:"XTZEUR", decimal:4 },
        XXBT: {value:"XXBTZEUR", decimal: 1},
        XXLM: {value:"XXLMZEUR", decimal: 6},
        XXMR: {value:"XXMRZEUR", decimal: 2},
        XXRP: {value:"XXRPZEUR", decimal: 5},
        XZEC: {value:"XZECZEUR", decimal: 3},
        ZEUR: {value:"ZEURZEUR", decimal: 3}
    };
    return pairsConvertion;
}

module.exports = {
    prepareStopLossOrders: function(callback, LastTicker, LastKeltners, pairList, currencyList, ActiveTriggersKeltner,  LastBalance, OpenOrders) {
        new Promise(function (resolve, reject) {
            let pairsConvertion = handleNewPairConvention();
            let orders = [];
            let ordersToCancel = [];
            let ordersToPosition = [];
            let coefKeltnerTrigger = ActiveTriggersKeltner[0].value;

            // INSERT LAST TICKER IN KELTNER DATA
            for(let i=0; i<LastKeltners.length; i++){
                for(let j=0; j<LastTicker.length; j++){
                    if(LastTicker[j].pair === LastKeltners[i].pair){
                        LastKeltners[i].last_ticker = LastTicker[j].ask_price;
                    }
                }
            }


            // PREPARE ORDERS CONSIDERING BALANCE
            for(let i=0; i<LastKeltners.length; i++) {
                for (let j = 0; j < LastBalance.length; j++) {
                    if(pairsConvertion[LastBalance[j].currency].value === LastKeltners[i].pair){
                        let keltnerPrice = LastKeltners[i].last_ticker - (coefKeltnerTrigger*LastKeltners[i].last_ATR);
                        keltnerPrice = keltnerPrice.toFixed(pairsConvertion[LastKeltners[i].pair].decimal);
                        let ord =
                            {
                                pair: LastKeltners[i].pair,
                                type:  'sell',
                                ordertype: 'stop-loss',
                                price:  keltnerPrice,
                                volume: LastBalance[j].units,
                                starttm:  0,
                                expiretm: 0
                            };
                        orders.push(ord);
                    }
                }
            }

            // HANDLE PREVIOUSLKY OPEN ORDERS POSITIONED
            if(OpenOrders.length > 0) {
                var old_stoploss = false;
                for(let i=0; i<orders.length; i++){
                    for (let j=0; j<OpenOrders.length; j++) {
                        if(OpenOrders[j].pair === orders[i].pair || OpenOrders[j].pair === pairsConvertion[orders[i].pair].value) {
                            old_stoploss = true;
                            let order_id = OpenOrders[j].orderid;
                            let openOrderPrice = OpenOrders[j].price.toFixed(pairsConvertion[orders[i].pair].decimal);
                            if(openOrderPrice < orders[i].price) {
                                logger.info('*** CONTROLLER *** -> ROBOT STOP LOSS ---  FOR PAIR : '+ OpenOrders[j].pair +' OLD OPEN ORDER PRICE : '+ openOrderPrice + ' - KELTNER ' + coefKeltnerTrigger + 'X - NEW OPEN ORDER PRICE : ' + orders[i].price);
                                ordersToCancel.push(order_id);
                                ordersToPosition.push(orders[i]);
                            }else{
                                logger.info('*** CONTROLLER *** -> ROBOT STOP LOSS ---  FOR PAIR : '+ OpenOrders[j].pair +' KEEP OLD OPEN ORDER PRICE : '+ openOrderPrice + ' - LAST KELTNER ' + coefKeltnerTrigger + 'X - PRICE : ' + orders[i].price);
                            }
                        }
                        if(j===OpenOrders.length-1){
                            if(old_stoploss === false){
                                ordersToPosition.push(orders[i]);
                                old_stoploss = false;
                            }
                        }
                    }
                    old_stoploss = false;
                }
            }else{
                // NO OPEN ORDERS IN POSITION - FIRST POSITION
                for(let i=0; i<orders.length; i++){
                    ordersToPosition.push(orders[i]);
                }
            }
            logger.warn('*** CONTROLLER *** -> ROBOT STOP LOSS --- '+ ordersToCancel.length+' PREPARED ORDER(S) TO CANCEL');
            logger.warn('*** CONTROLLER *** -> ROBOT STOP LOSS --- '+ ordersToPosition.length+' PREPARED ORDER(S) TO POSITION');

            let preparedOrders = {
                ordersToCancel: ordersToCancel,
                orders: ordersToPosition
            }
            resolve(preparedOrders);
        }).then(function(preparedOrders){
            callback(null, preparedOrders);
        }).catch(function(err) {
            callback(err, null);
        });
    }
};