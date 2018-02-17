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
        firebase.database.ref('schedule').once('value').then(function (snapshot) {
            var dict = [];
            snapshot.forEach(function (item) {
                dict.push({
                    id: item.key,
                    route: item.val().origin + ' - ' + item.val().destination
                });
            });
            res.render('add-booking', {
                title: 'Add Booking',
                menu: menu,
                route: dict
            });
        }).catch(function (error) {
            console.log('[e-Shuttle][get/booking][Error][' + error + ']');
        });
    }
});

module.exports = router;