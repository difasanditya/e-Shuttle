var express = require('express');
var router = express.Router();
var firebase = require('../firebase');

router.use('/login', function (req, res, next) {
    if (firebase.auth.currentUser != null) {
        console.log('[e-Shuttle][check-auth-login][Unauthorize access]');
        res.redirect('/');
    } else {
        next();
    }
});

router.all('/', function (req, res, next) {
    if (firebase.auth.currentUser == null) {
        res.render('login');
    } else {
        next();
    }
});

router.all('*', function (req, res, next) {
    if (firebase.auth.currentUser == null && req.url != '/login') {
        console.log('[e-Shuttle][check-auth][Unauthorize access]');
        res.redirect('/');
    } else {
        next();
    }
});

module.exports = router;