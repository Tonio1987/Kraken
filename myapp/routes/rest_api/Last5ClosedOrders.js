var express = require('express');
var router = express.Router();

const CTRL_ClosedOrders = require('../../controller/CTRL_ClosedOrders');

function call_CTRL_getClosedOrders(req, res, next){
    CTRL_ClosedOrders.getLast5ClosedOrders(renderResult, req, res, next);
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
    call_CTRL_getClosedOrders(req, res, next);
});

module.exports = router;
