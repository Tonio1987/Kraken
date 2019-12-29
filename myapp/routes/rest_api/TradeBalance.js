var express = require('express');
var router = express.Router();

const CTRL_TradeBalance = require('../../controller/CTRL_TradeBalance');

function call_CTRL_getLastTradeBalances(req, res, next){
    CTRL_TradeBalance.getLastTradeBalances(renderResult, req, res, next);
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
    call_CTRL_getLastTradeBalances(req, res, next);
});

module.exports = router;
