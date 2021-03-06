var express = require('express');
var router = express.Router();

const CTRL_Crypto_Evol = require('../../../controller/market/CTRL_Crypto_Evol');

function call_CTRL_getCrypto_Evol(req, res, next){
    CTRL_Crypto_Evol.getStat_CryptoEvol(renderResult, req, res, next);
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
    call_CTRL_getCrypto_Evol(req, res, next);
});

module.exports = router;
