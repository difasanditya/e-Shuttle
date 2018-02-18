$(function () {
    $("#changeMailForm").submit(function (event) {
        event.preventDefault();
        var email = $('#email').val();
        var password = $('#password').val();
        $.ajax({
            url: '/change-email',
            method: 'post',
            data: JSON.stringify({
                email: email,
                password: password
            }),
            contentType: 'application/json',
            success: success(email)
        });
    });
});

function success(email) {
    $("#oldEmail").val(email);
    $("#email").val("");
    $("#password").val("");
    alert('Your email has changed successfully!your email is: ' + email);
}