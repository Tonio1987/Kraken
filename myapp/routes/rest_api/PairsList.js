var express = require('express');
var router = express.Router();

const CTRL_Pairs = require('../../controller/CTRL_Pairs');

function call_CTRL_getPairsList(req, res, next){
    CTRL_Pairs.getPairsList(renderResult, req, res, next);
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
    call_CTRL_getPairsList(req, res, next);
});

module.exports = router;
