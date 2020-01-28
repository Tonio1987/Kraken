var express = require('express');
var router = express.Router();

const CTRL_History_TradeBalance = require('../../../controller/history/CTRL_History_TradeBalance');

function call_CTRL_getTradeBalance_History(req, res, next){
    CTRL_History_TradeBalance.getHistory_TradeBalances(renderResult, req, res, next);
}

function renderResult(err, data, req, res, next){
    if(err){
        res.set('Access-Control-Allow-Origin', '*');
        res.send('Erreur');
    }else{
        res.set('Access-Control-Allow-Origin', '*');
        res.status(200).send((data));
    }
}

router.get('/', function(req, res, next) {
    call_CTRL_getTradeBalance_History(req, res, next);
});

module.exports = router;
