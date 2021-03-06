var express = require('express');
var router = express.Router();

const CTRL_CronTasks = require('../../../controller/settings/CTRL_CronTasks');

function call_CTRL_getCronTasks(req, res, next){
    CTRL_CronTasks.getCronTasks(renderResult, req, res, next);
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
    call_CTRL_getCronTasks(req, res, next);
});

module.exports = router;
