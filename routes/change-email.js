var express = require('express');
var router = express.Router();
var firebase = require('../firebase');

var menu = require('./menu');

router.post('/', function (req, res) {
    firebase.auth.signInWithEmailAndPassword(firebase.auth.currentUser.email, req.body.password).then(function (user) {
        user.updateEmail(req.body.email).then(function () {
            firebase.database.ref().child("user").child(user.uid + "/email").set(req.body.email).then(function () {
                console.log('[e-Shuttle][post/change-email][Email changed]')
            }).catch(function (error) {
                console.log('[e-Shuttle][post/change-email][Error][update-database][' + error + ']');
            });
        }).catch(function (error) {
            console.log('[e-Shuttle][post/change-email][Error][update-email][' + error + ']');
        });
    }).catch(function (error) {
        console.log('[e-Shuttle][post/change-email][Error][sign-in][' + error + ']');
    });
});

router.get('/', function (req, res) {
    firebase.database.ref('user').child(firebase.auth.currentUser.uid).once('value').then(function (snapshot) {
        res.render('change-email', {
            title: 'Change Email',
            menu: menu,
            email: snapshot.val().email
        });
    }).catch(function (error) {
        console.log('[e-Shuttle][get/change-email][Error][' + error + ']');
    });
});

module.exports = router;