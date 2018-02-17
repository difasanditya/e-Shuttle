var express = require('express');
var router = express.Router();
var firebase = require('../firebase');

var menu = require('./menu');

router.use('/add-booking', require('./add-booking'));
router.use('/change-email', require('./change-email'));
router.use('/change-password', require('./change-password'));
router.use('/edit-profile', require('./edit-profile'));
router.use('/history', require('./history'));
router.use('/profile', require('./profile'));
router.use('/schedule', require('./schedule'));

router.get('/', function (req, res, next) {
    if (firebase.auth.currentUser == null) {
        res.render('login');
    } else {
        res.render('layout', {
            title: 'Dashboard',
            menu: menu
        });
    }
});

router.get('/dashboard', function (req, res, next) {
    if (firebase.auth.currentUser == null) {
        res.render('login');
    } else {
        res.render('layout', {
            title: 'Dashboard',
            menu: menu
        });
    }
});

router.post('/login', function (req, res) {
    firebase.login(req, res);
});

router.get('/logout', function (req, res) {
    firebase.logout(req, res);
});

function toCapitalize(str) {
    str = str.replace('-', ' ');
    return str.toLowerCase().split(' ').map(function (word) {
        return word[0].toUpperCase() + word.substr(1)
    }).join(' ');
}

module.exports = router;