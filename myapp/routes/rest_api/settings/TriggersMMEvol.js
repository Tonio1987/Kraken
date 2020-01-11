var express = require('express');
var router = express.Router();

const CTRL_Triggers = require('../../../controller/settings/CTRL_Triggers');

function call_CTRL_getTriggersMMEvol(req, res, next){
    CTRL_Triggers.getTriggersMMEvol(renderResult, req, res, next);
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
    call_CTRL_getTriggersMMEvol(req, res, next);
});

module.exports = router;
