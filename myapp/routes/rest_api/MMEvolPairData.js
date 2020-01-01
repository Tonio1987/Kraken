var express = require('express');
var router = express.Router();

const CTRL_MMEvol = require('../../controller/CTRL_MMEvol');

function call_CTRL_getMMEvolData(req, res, next){
    CTRL_MMEvol.getLastMMEvol(renderResult, req, res, next);
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

router.post('/', function(req, res, next) {
    call_CTRL_getMMEvolData(req, res, next);
});

module.exports = router;
