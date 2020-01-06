const moment = require('moment');
moment.locale('fr');


function handleNewPairConvention() {

    let pairsConvertion = {
        ADACAD: {value: "ADACAD"},
        ADAETH: {value: "ADAETH"},
        ADAEUR: {value: "ADAEUR"},
        ADAUSD: {value: "ADAUSD"},
        ADAXBT: {value: "ADAXBT"},
        ATOMXBT: {value: "ATOMXBT"},
        ATOMETH: {value: "ATOMETH"},
        ATOMEUR: {value: "ATOMEUR"},
        ATOMUSD: {value: "ATOMUSD"},
        BATETH: {value: "BATETH"},
        BATEUR: {value: "BATEUR"},
        BATUSD: {value: "BATUSD"},
        BATXBT: {value: "BATXBT"},
        BCHEUR: {value: "BCHEUR"},
        BCHUSD: {value: "BCHUSD"},
        BCHXBT: {value: "BCHXBT"},
        DAIEUR: {value: "DAIEUR"},
        DAIUSD: {value: "DAIUSD"},
        DAIUSDT: {value: "DAISDT"},
        DASHEUR: {value: "DASHEUR"},
        DASHUSD: {value: "DASHUSD"},
        DASHXBT: {value: "DASHXBT"},
        EOSETH: {value: "EOSETH"},
        EOSEUR: {value: "EOSEUR"},
        EOSUSD: {value: "EOSUSD"},
        EOSXBT: {value: "EOSXBT"},
        ETHDAI: {value: "ETHDAI"},
        GNOETH: {value: "GNOETH"},
        GNOEUR: {value: "GNOEUR"},
        GNOUSD: {value: "GNOUSD"},
        GNOXBT: {value: "GNOXBT"},
        ICXETH: {value: "ICXETH"},
        ICXEUR: {value: "ICXEUR"},
        ICXUSD: {value: "ICXUSD"},
        ICXXBT: {value: "ICXXBT"},
        LINKETH: {value: "LINKETH"},
        LINKEUR: {value: "LINKEUR"},
        LINKUSD: {value: "LINKUSD"},
        LINKXBT: {value: "LINKXBT"},
        LSKETH: {value: "LSKETH"},
        LSKEUR: {value: "LSKEUR"},
        LSKUSD: {value: "LSKUSD"},
        LSKXBT: {value: "LSKXBT"},
        NANOETH: {value: "NANOETH"},
        NANOEUR: {value: "NANOEUR"},
        NANOUSD: {value: "NANOUSD"},
        NANOXBT: {value: "NANOXBT"},
        OMGETH: {value: "OMGETH"},
        OMGEUR: {value: "OMGEUR"},
        OMGUSD: {value: "OMGUSD"},
        OMGXBT: {value: "OMGXBT"},
        PAXGETH: {value: "PAXGETH"},
        PAXGEUR: {value: "PAXGEUR"},
        PAXGUSD: {value: "PAXGUSD"},
        PAXGXBT: {value: "PAXGXBT"},
        QTUMCAD: {value: "QTUMCAD"},
        QTUMETH: {value: "QTUMETH"},
        QTUMEUR: {value: "QTUMEUR"},
        QTUMUSD: {value: "QTUMUSD"},
        QTUMXBT: {value: "QTUMXBT"},
        SCETH: {value: "SCETH"},
        SCEUR: {value: "SCEUR"},
        SCUSD: {value: "SCUSD"},
        SCXBT: {value: "SCXBT"},
        USDTZUSD: {value: "USDTUSD"},
        USDTEUR: {value: "USDTEUR"},
        USDTCAD: {value: "USDTCAD"},
        USDTGBP: {value: "USDTGBP"},
        WAVESETH: {value: "WAVESETH"},
        WAVESEUR: {value: "WAVESEUR"},
        WAVESUSD: {value: "WAVESUSD"},
        WAVESXBT: {value: "WAVESXBT"},
        XETCXETH: {value: "ETCETH"},
        XETCXXBT: {value: "ETCXBT"},
        XETCZEUR: {value: "ETCEUR"},
        XETCZUSD: {value: "ETCUSD"},
        XETHXXBT: {value: "ETHXBT"},
        XETHZCAD: {value: "ETHCAD"},
        XETHZEUR: {value: "ETHEUR"},
        XETHZGBP: {value: "ETHGBP"},
        XETHZJPY: {value: "ETHJPY"},
        XETHZUSD: {value: "ETHUSD"},
        XETHUSDT: {value: "ETHUSDT"},
        XLTCXXBT: {value: "LTCXBT"},
        XLTCZEUR: {value: "LTCEUR"},
        XLTCZUSD: {value: "LTCUSD"},
        XMLNXETH: {value: "MLNETH"},
        XMLNXXBT: {value: "MLNXBT"},
        XMLNZEUR: {value: "MLNEUR"},
        XMLNZUSD: {value: "MLNUSD"},
        XREPXETH: {value: "REPETH"},
        XREPXXBT: {value: "REPXBT"},
        XREPZEUR: {value: "REPEUR"},
        XREPZUSD: {value: "REPUSD"},
        XTZCAD: {value: "XTZCAD"},
        XTZETH: {value: "XTZETH"},
        XTZEUR: {value: "XTZEUR"},
        XTZUSD: {value: "XTZUSD"},
        XTZXBT: {value: "XTZXBT"},
        XXBTZCAD: {value: "XBTCAD"},
        XXBTZEUR: {value: "XBTEUR"},
        XXBTZGBP: {value: "XBTGBP"},
        XXBTZJPY: {value: "XBTJPY"},
        XXBTZUSD: {value: "XBTUSD"},
        XXBTUSDT: {value: "XBTUSDT"},
        XXBTXDAI: {value: "XBTDAI"},
        XXDGXXBT: {value: "XDGXBT"},
        XXDGZEUR: {value: "XDGEUR"},
        XXDGZUSD: {value: "XDGUSD"},
        XXLMXXBT: {value: "XLMXBT"},
        XXLMZEUR: {value: "XLMEUR"},
        XXLMZUSD: {value: "XLMUSD"},
        XXMRXXBT: {value: "XMRXBT"},
        XXMRZEUR: {value: "XMREUR"},
        XXMRZUSD: {value: "XMRUSD"},
        XXRPXXBT: {value: "XRPXBT"},
        XXRPZCAD: {value: "XRPCAD"},
        XXRPZEUR: {value: "XRPEUR"},
        XXRPZJPY: {value: "XRPJPY"},
        XXRPZUSD: {value: "XRPUSD"},
        XZECXXBT: {value: "ZECXBT"},
        XZECZEUR: {value: "ZECEUR"},
        XZECZJPY: {value: "ZECJPY"},
        XZECZUSD: {value: "ZECUSD"},
        ADA: {value:"ADAEUR"},
        ATOM: {value:"ATOMEUR"},
        BAT: {value:"BATEUR"},
        BCH: {value:"BCHEUR"},
        DAI: {value:"DAIEUR"},
        DASH: {value:"DASHEUR"},
        EOS: {value:"EOSEUR"},
        GNO: {value:"GNOEUR"},
        ICX: {value:"ICXEUR"},
        LINK: {value:"LINKEUR"},
        LSK: {value:"LSKEUR"},
        NANO: {value:"NANOEUR"},
        OMG: {value:"OMGEUR"},
        PAXG: {value:"PAXGEUR"},
        QTUM: {value:"QTUMEUR"},
        SC: {value:"SCEUR"},
        USDT: {value:"USDTEUR"},
        WAVES: {value:"WAVESEUR"},
        XETC: {value:"XETCZEUR"},
        XETH: {value:"XETHZEUR"},
        XLTC: {value:"XLTCZEUR"},
        XMLN: {value:"XMLNZEUR"},
        XREP: {value:"XREPZEUR"},
        XTZ: {value:"XTZEUR"},
        XXBT: {value:"XXBTZEUR"},
        XXDG: {value:"XXDGZEUR"},
        XXLM: {value:"XXLMZEUR"},
        XXMR: {value:"XXMRZEUR"},
        XXRP: {value:"XXRPZEUR"},
        XZEC: {value:"XZECZEUR"}
    };
    return pairsConvertion;
}


module.exports = {
    prepareStopLossOrders: function(callback, LastKeltners, pairList, currencyList, ActiveTriggersKeltner,  LastBalance, OpenOrders) {
        new Promise(function (resolve, reject) {
            let pairsConvertion = handleNewPairConvention();
            let orders = [];
            let ordersToCancel = [];
            let coefKeltnerTrigger = ActiveTriggersKeltner[0].value;
             for(elem in LastKeltners) {
                 if(LastKeltners.hasOwnProperty(elem)){
                     // HERE WE HAVE TO HANDLE THE CASE NO OPEN ORDERS
                     if(OpenOrders.length > 0){
                         for(order in OpenOrders){
                             if(OpenOrders.hasOwnProperty(order)){
                                 if(OpenOrders[order].pair === LastKeltners[elem].pair || OpenOrders[order].pair === pairsConvertion[LastKeltners[elem].pair].value){
                                     if(coefKeltnerTrigger === 1){
                                         if(OpenOrders[order].price < LastKeltners[elem].keltner_inf){
                                             let order_id = OpenOrders[order].orderid;
                                             let ord =
                                                 {
                                                     pair: LastKeltners[elem].pair,
                                                     type:  'sell',
                                                     ordertype: 'stop-loss',
                                                     price:  LastKeltners[elem].keltner_inf,
                                                     volume:  OpenOrders[order].vol,
                                                     starttm:  0,
                                                     expiretm: 0
                                                 };
                                             ordersToCancel.push(order_id);
                                             orders.push(ord);
                                         }
                                     }else if(coefKeltnerTrigger === 1.5){
                                         if(OpenOrders[order].price < LastKeltners[elem].keltner_inf_1_5x) {
                                             let order_id = OpenOrders[order].orderid;
                                             let ord =
                                                 {
                                                     pair: LastKeltners[elem].pair,
                                                     type: 'sell',
                                                     ordertype: 'stop-loss',
                                                     price: LastKeltners[elem].keltner_inf_1_5x,
                                                     volume: OpenOrders[order].vol,
                                                     starttm: 0,
                                                     expiretm: 0
                                                 };
                                             ordersToCancel.push(order_id);
                                             orders.push(ord);
                                         }
                                     }else if(coefKeltnerTrigger === 2){
                                         if(OpenOrders[order].price < LastKeltners[elem].keltner_inf_2x) {
                                             let order_id = OpenOrders[order].orderid;
                                             let ord =
                                                 {
                                                     pair: LastKeltners[elem].pair,
                                                     type: 'sell',
                                                     ordertype: 'stop-loss',
                                                     price: LastKeltners[elem].keltner_inf_2x,
                                                     volume: OpenOrders[order].vol,
                                                     starttm: 0,
                                                     expiretm: 0
                                                 };
                                             ordersToCancel.push(order_id);
                                             orders.push(ord);
                                         }
                                     }else if(coefKeltnerTrigger === 2.5){
                                         if(OpenOrders[order].price < LastKeltners[elem].keltner_inf_2_5x){
                                             let order_id = OpenOrders[order].orderid;
                                             let ord =
                                                 {
                                                     pair: LastKeltners[elem].pair,
                                                     type:  'sell',
                                                     ordertype: 'stop-loss',
                                                     price:  LastKeltners[elem].keltner_inf_2_5x,
                                                     volume:  OpenOrders[order].vol,
                                                     starttm:  0,
                                                     expiretm: 0
                                                 };
                                             ordersToCancel.push(order_id);
                                             orders.push(ord);
                                         }
                                     }else if(coefKeltnerTrigger === 3){
                                         if(OpenOrders[order].price < LastKeltners[elem].keltner_inf_3x) {
                                             let order_id = OpenOrders[order].orderid;
                                             let order =
                                                 {
                                                     pair: LastKeltners[elem].pair,
                                                     type: 'sell',
                                                     ordertype: 'stop-loss',
                                                     price: LastKeltners[elem].keltner_inf_3x,
                                                     volume: OpenOrders[order].vol,
                                                     starttm: 0,
                                                     expiretm: 0
                                                 };
                                             ordersToCancel.push(order_id);
                                             orders.push(order);
                                         }
                                     }
                                 }
                             }
                         }
                     }else{
                         // NO OLD OPEN ORDER CASE - FIRST POSITION
                         for(bal in LastBalance) {
                             if (LastBalance.hasOwnProperty(bal)) {
                                 if(pairsConvertion[LastBalance[bal].currency].value === pairsConvertion[LastKeltners[elem].pair].value){
                                    if(coefKeltnerTrigger === 1){
                                        let ord =
                                            {
                                                pair: LastKeltners[elem].pair,
                                                type:  'sell',
                                                ordertype: 'stop-loss',
                                                price:  LastKeltners[elem].keltner_inf,
                                                volume: LastBalance[bal].units,
                                                starttm:  0,
                                            expiretm: 0
                                        };
                                        orders.push(ord);
                                    }else if(coefKeltnerTrigger === 1.5){
                                        let ord =
                                            {
                                                pair: LastKeltners[elem].pair,
                                                type: 'sell',
                                                ordertype: 'stop-loss',
                                                price: LastKeltners[elem].keltner_inf_1_5x,
                                                volume: LastBalance[bal].units,
                                                starttm: 0,
                                                expiretm: 0
                                            };
                                        orders.push(ord);
                                    }else if(coefKeltnerTrigger === 2){
                                        let ord =
                                            {
                                                pair: LastKeltners[elem].pair,
                                                type: 'sell',
                                                ordertype: 'stop-loss',
                                                price: LastKeltners[elem].keltner_inf_2x,
                                                volume: LastBalance[bal].units,
                                                starttm: 0,
                                                expiretm: 0
                                            };
                                        orders.push(ord);
                                    }else if(coefKeltnerTrigger === 2.5){
                                        let ord =
                                            {
                                                pair: LastKeltners[elem].pair,
                                                type:  'sell',
                                                ordertype: 'stop-loss',
                                                price:  LastKeltners[elem].keltner_inf_2_5x,
                                                volume: LastBalance[bal].units,
                                                starttm:  0,
                                                expiretm: 0
                                            };
                                        orders.push(ord);
                                    }else if(coefKeltnerTrigger === 3){
                                        let order =
                                            {
                                                pair: LastKeltners[elem].pair,
                                                type: 'sell',
                                                ordertype: 'stop-loss',
                                                price: LastKeltners[elem].keltner_inf_3x,
                                                volume: LastBalance[bal].units,
                                                starttm: 0,
                                                expiretm: 0
                                            };
                                        orders.push(order);
                                    }
                                }
                             }
                         }
                     }
                 }
             }
             console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - > --- ROBOT --- Orders to cancel '+ordersToCancel.length);
             for(elem in orders){
                 if(orders.hasOwnProperty(elem)){
                     console.log(moment().format('L') + ' - ' + moment().format('LTS') + ' - > --- ROBOT --- '+ orders[elem].type+' '+orders[elem].ordertype+' '+orders[elem].volume+' '+orders[elem].pair+' '+orders[elem].price);
                 }
             }
             let preparedOrders = {
                 ordersToCancel: ordersToCancel,
                 orders: orders
             }

             resolve(preparedOrders);
        }).then(function(preparedOrders){
            callback(null, preparedOrders);
        }).catch(function(err) {
            callback(err, null);
        });
    }
};