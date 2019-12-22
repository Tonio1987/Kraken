var express = require('express');
var router = express.Router();

const DB_TradeBalance = require('../private/persistence/site/DB_TradeBalance');

function call_DB_getLastTradeBalance(req, res, next){
    DB_TradeBalance.getLastTradeBalance(renderResult, req, res, next);
}

function renderResult(err, data, req, res, next){
    if(err){
        res.set('Access-Control-Allow-Origin', '*');
        res.send('Erreur');
    }else{
        res.set('Access-Control-Allow-Origin', '*');
        res.status(200).send((data[0].eur_balance).toString());
    }
}

router.get('/', function(req, res, next) {
    call_DB_getLastTradeBalance(req, res, next);
});

module.exports = router;
