var express = require('express');
var router = express.Router();
var firebase = require('../firebase');

var menu = require('./menu');

router.post('/', function (req, res) {

});

router.get('/', function (req, res) {
    if (firebase.auth.currentUser == null) {
        res.redirect('/');
    } else {
        firebase.database.ref('user').child(firebase.auth.currentUser.uid).once('value').then(function (snapshot) {
            res.render('change-email', {
                title: 'Change Email',
                menu: menu,
                email: snapshot.val().email
            });
        }).catch(function (error) {
            console.log('[e-Shuttle][get/changeEmail][Error][' + error + ']');
        });
    }
});

module.exports = router;