var express = require('express');
var router = express.Router();
var firebase = require('../firebase');

var menu = require('./menu');

router.use('/add-booking', require('./add-booking'));
router.use('/change-email', require('./change-email'));
router.use('/change-password', require('./change-password'));
router.use('/cancel', require('./cancel'));
router.use('/edit-profile', require('./edit-profile'));
router.use('/email', require('./email'));
router.use('/history', require('./history'));
router.use('/profile', require('./profile'));
router.use('/schedule', require('./schedule'));

router.get('/', function (req, res, next) {
    res.render('layout', {
        title: 'Dashboard',
        menu: menu
    });
});

router.get('/dashboard', function (req, res, next) {
    res.render('layout', {
        title: 'Dashboard',
        menu: menu
    });
});

router.post('/login', function (req, res, next) {
    firebase.login(req, res);
});

router.get('/logout', function (req, res, next) {
    firebase.logout(req, res);
});

module.exports = router;