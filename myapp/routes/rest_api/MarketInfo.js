var express = require('express');
var router = express.Router();

const CTRL_Tickers = require('../../controller/CTRL_Tickers');

function call_CTRL_getMarketInfo(req, res, next){
    CTRL_Tickers.getLast24hTicker(renderResult, req, res, next);
}

function renderResult(err, data, req, res, next){
    if(err){
        res.set('Access-Control-Allow-Origin', '*');
        res.send({Erreur: 'Erreur'});
    }else{
        res.set('Access-Control-Allow-Origin', '*');
        res.status(200).send((data));
    }
}

router.get('/', function(req, res, next) {
    call_CTRL_getMarketInfo(req, res, next);
});

module.exports = router;
