var express = require('express');
var router = express.Router();
var firebase = require('../firebase');

var menu = require('./menu');

router.get('/', function (req, res) {
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
    }).catch(function (error) {
        console.log('[e-Shuttle][get/profile][Error][' + error + ']');
    });
});

module.exports = router;