var express = require('express');
var router = express.Router();
var firebase = require('../firebase');
var mailer = require('../mailer');

var menu = require('./menu');

router.post('/', function (req, res) {
    var bookingCode = firebase.database.ref('history').push({
        userID: firebase.auth.currentUser.uid,
        route: req.body.route,
        date: req.body.date,
        status: 'Not Used'
    }).key;
    firebase.database.ref('user').child(firebase.auth.currentUser.uid).once('value').then(function (snapshot) {
        var name = snapshot.val().name;
        firebase.database.ref('schedule').child(req.body.route).once('value').then(function (snapshot) {
            var mailOptions = {
                from: '"Shuttle Account" <shuttle.management.bca@gmail.com>',
                to: firebase.auth.currentUser.email,
                subject: 'Verifikasi Data Penumpang',
                html: 'Halo ' + name + ',' + '<br>' +
                    'Terima kasih sudah menggunakan layanan e-Shuttle.<br>' +
                    'Silakan tunjukkan email berikut kepada petugas shuttle.' + '<br>' +
                    'Berikut data pemesanan Anda:' + '<br><br>' +
                    'Rute : ' + snapshot.val().origin + ' - ' + snapshot.val().destination + '<br>' +
                    'Tanggal Keberangkat : ' + req.body.date + '<br>' +
                    'Jam Keberangkatan : ' + snapshot.val().departure + '<br>' +
                    '<img src = "https://chart.googleapis.com/chart?cht=qr&chl=localhost:3000/verification/' + bookingCode + '&chs=180x180&choe=UTF-8&chld=L|2"> <br><br>' +
                    'Terima kasih <br><br>Hormat kami, <br>BCA Learning Institute',
                attachments: [{
                    filename: 'image.png',
                    path: 'https://chart.googleapis.com/chart?cht=qr&chl=localhost:3000/' + bookingCode + '&chs=180x180&choe=UTF-8&chld=L|2'
                }]
            };
            mailer.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log('[e-Shuttle][add-booking][Error][' + error + ']');
                } else {
                    console.log('[e-Shuttle][Email Sent][' + info.response + ']');
                    transport.close();
                }
            });
        }).catch(function (error) {
            console.log('[e-Shuttle][add-booking][Error][Schedule][' + error + ']');
        });
    }).catch(function (error) {
        console.log('[e-Shuttle][add-booking][Error][User][' + error + ']');
    });
});

router.get('/', function (req, res) {
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
});

module.exports = router;