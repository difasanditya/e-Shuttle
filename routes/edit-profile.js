var express = require('express');
var router = express.Router();
var firebase = require('../firebase');

var menu = require('./menu');

router.post('/', function (req, res) {
    firebase.database.ref('user').child(firebase.auth.currentUser.uid).update({
        nama: req.body.name,
        nip: req.body.nip,
        division: req.body.division
    }).then(function () {
        console.log('[e-Shuttle][post/edit-profile][Profile changed]');
        res.send({
            redirect: '/profile'
        });
    }).catch(function (error) {
        console.log('[e-Shuttle][post/edit-profile][Error][' + error + ']');
    });
});

router.get('/', function (req, res) {
    firebase.database.ref('user').child(firebase.auth.currentUser.uid).once('value').then(function (snapshot) {
        res.render('edit-profile', {
            title: 'Edit Profile',
            menu: menu,
            name: snapshot.val().name,
            nip: snapshot.val().nip,
            division: snapshot.val().division
        });
    }).catch(function (error) {
        console.log('[e-Shuttle][get/edit-profile][Error][' + error + ']');
    });
});

module.exports = router;