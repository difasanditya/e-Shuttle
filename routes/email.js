var express = require('express');
var router = express.Router();
var firebase = require('../firebase');
var mailer = require('../mailer');

router.get('/', function (req, res) {
    
});

router.post('/', function(req, res) {
    firebase.database.ref('history').child(req.body.id).once('value').then(function(snapshot){
        var history = snapshot.val();
        firebase.database.ref('user').child(firebase.auth.currentUser.uid).once('value').then(function (snapshot) {
            var name = snapshot.val().name;
            firebase.database.ref('schedule').child(history.route).once('value').then(function (snapshot) {
                var mailOptions = {
                    from: '"Shuttle Account" <shuttle.management.bca@gmail.com>',
                    to: firebase.auth.currentUser.email,
                    subject: 'Verifikasi Data Penumpang',
                    html: 'Halo ' + name + ',' + '<br>' +
                        'Terima kasih sudah menggunakan layanan e-Shuttle.<br>' +
                        'Silakan tunjukkan email berikut kepada petugas shuttle.' + '<br>' +
                        'Berikut data pemesanan Anda:' + '<br><br>' +
                        'Rute : ' + snapshot.val().origin + ' - ' + snapshot.val().destination + '<br>' +
                        'Tanggal Keberangkat : ' + history.date + '<br>' +
                        'Jam Keberangkatan : ' + snapshot.val().departure + '<br>' +
                        '<img src = "https://chart.googleapis.com/chart?cht=qr&chl=localhost:3000/verification/' + req.body.id + '&chs=180x180&choe=UTF-8&chld=L|2"> <br><br>' +
                        'Terima kasih <br><br>Hormat kami, <br>BCA Learning Institute',
                    attachments: [{
                        filename: 'image.png',
                        path: 'https://chart.googleapis.com/chart?cht=qr&chl=localhost:3000/' + req.body.id + '&chs=180x180&choe=UTF-8&chld=L|2'
                    }]
                };
                mailer.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log('[e-Shuttle][email][Error][' + error + ']');
                    } else {
                        console.log('[e-Shuttle][Email Sent][' + info.response + ']');
                        transport.close();
                    }
                });
            }).catch(function (error) {
                console.log('[e-Shuttle][email][Error][Schedule][' + error + ']');
            });
        }).catch(function (error) {
            console.log('[e-Shuttle][email][Error][User][' + error + ']');
        });
    }).catch(function(error){
        console.log('[e-Shuttle][email][Error][History][' + error + ']');
    });
});

module.exports = router;