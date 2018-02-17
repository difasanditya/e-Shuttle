var express = require('express');
var router = express.Router();
var firebase = require('../firebase');

var menu = require('./menu');

router.get('/', function (req, res) {
    if (firebase.auth.currentUser == null) {
        res.redirect('/');
    } else {
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

        });
    }
});

module.exports = router;