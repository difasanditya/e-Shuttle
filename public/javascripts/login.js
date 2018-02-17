$(document).ready(function () {
    $("#loginForm").submit(function (event) {
        event.preventDefault();
        var userEmail = $('#inputEmail').val();
        var userPass = $('#inputPassword').val();
        $.ajax({
            url: '/login',
            method: 'post',
            data: JSON.stringify({
                userEmail: userEmail,
                userPass: userPass
            }),
            contentType: 'application/json',
            success: function (data) {
                window.location = data.redirect;
            }
        });
    });
});