var express = require('express');
var router = express.Router();
var firebase = require('../firebase');

var menu = require('./menu');

router.post('/', function (req, res) {
    firebase.auth.signInWithEmailAndPassword(firebase.auth.currentUser.email, req.body.password).then(function (user) {
        user.updatePassword(req.body.newPassword).then(function () {
            console.log('[e-Shuttle][post/change-password][Password changed]');
        }).catch(function (error) {
            console.log('[e-Shuttle][post/change-password][Error][update-password][' + error + ']');
        });
    }).catch(function (error) {
        console.log('[e-Shuttle][post/change-password][Error][sign-in][' + error + ']');
    });
});

router.get('/', function (req, res) {
    firebase.database.ref('user').child(firebase.auth.currentUser.uid).once('value').then(function (snapshot) {
        res.render('change-password', {
            title: 'Change Password',
            menu: menu
        });
    }).catch(function (error) {
        console.log('[e-Shuttle][get/change-password][Error][' + error + ']');
    });
});

module.exports = router;