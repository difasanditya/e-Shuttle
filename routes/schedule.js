var express = require('express');
var router = express.Router();
var firebase = require('../firebase');

var menu = require('./menu');

router.get('/', function (req, res) {
    if (firebase.auth.currentUser == null) {
        res.redirect('/');
    } else {
        firebase.database.ref('schedule').once('value').then(function(snapshot){
            var schedule = [];
            snapshot.forEach(function(item) {
                schedule.push([item.key, item.val().origin, item.val().destination, item.val().departure]);
            });
            res.render('schedule', {
                title: 'Schedule',
                menu: menu,
                schedule: schedule
            });
        }).catch(function(error){

        });
    }
});

module.exports = router;