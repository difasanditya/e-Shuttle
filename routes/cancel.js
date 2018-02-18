var express = require('express');
var router = express.Router();
var firebase = require('../firebase');

router.get('/', function (req, res) {
    
});

router.post('/', function(req, res) {
    firebase.database.ref('history').child(req.body.id).remove().then(function() {
        console.log('[e-Shuttle][post/cancel][Success cancel]');
        res.send({
            redirect: '/history'
        });
    }).catch(function(error){
        console.log('[e-Shuttle][post/cancel][Error][' + error + ']');
    });
});

module.exports = router;