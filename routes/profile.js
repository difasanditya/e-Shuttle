var express = require('express');
var router = express.Router();
var firebase = require('../firebase');

var menu = require('./menu');

router.get('/', function (req, res) {
    if (firebase.auth.currentUser == null) {
        res.redirect('/');
    } else {
        firebase.database.ref('user').child(firebase.auth.currentUser.uid).once('value').then(function (snapshot) {
            var profile = [];
            profile.push({
                title: 'Name',
                content: snapshot.val().name
            });
            profile.push({
                title: 'NIP',
                content: snapshot.val().nip
            });
            profile.push({
                title: 'Division',
                content: snapshot.val().division
            });
            profile.push({
                title: 'Email',
                content: firebase.auth.currentUser.email
            });
            res.render('profile', {
                title: 'Profile',
                menu: menu,
                profile: profile
            });
        });
    }
});

module.exports = router;