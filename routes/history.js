var express = require('express');
var router = express.Router();
var firebase = require('../firebase');

var menu = require('./menu');

router.get('/', function (req, res) {
    firebase.database.ref('history').orderByChild('userID').equalTo(firebase.auth.currentUser.uid).once('value').then(function (snapshot) {
        var histories = snapshot;
        var history = [];
        var id = [];
        firebase.database.ref('schedule').once('value').then(function (snapshot) {
            histories.forEach(function (item) {
                var route = snapshot.val()[item.val().route];
                history.push([item.val().date, route.origin + ' - ' + route.destination, item.val().status]);
                id.push(item.key);
            });
            res.render('history', {
                title: 'History',
                menu: menu,
                history: history,
                id: id
            });
        }).catch(function (error) {
            console.log('[e-Shuttle][get/history][Error][get-route][' + error + ']');
        });
    }).catch(function (error) {
        console.log('[e-Shuttle][get/history][Error][get-history][' + error + ']');
    });
});

module.exports = router;