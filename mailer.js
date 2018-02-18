var nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shuttle.management.bca@gmail.com',
        pass: 'pedj04ng.Ejhail'
    },
})