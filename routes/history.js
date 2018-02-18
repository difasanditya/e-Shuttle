var express = require('express');
var router = express.Router();
var firebase = require('../firebase');

var menu = require('./menu');

router.get('/', function (req, res) {
    firebase.database.ref('history').orderByChild('userID').equalTo(firebase.auth.currentUser.uid).once('value').then(function (snapshot) {
        var history = [];
        snapshot.forEach(function (item) {
            history.push([item.val().date, item.val().route, item.val().status]);
        });
        res.render('history', {
            title: 'History',
            menu: menu,
            history: history
        });
    }).catch(function (error) {
        console.log('[e-Shuttle][get/history][Error][' + error + ']');
    });
});

module.exports = router;