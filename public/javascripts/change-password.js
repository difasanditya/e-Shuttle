$(function () {
    $("#changePassForm").submit(function (event) {
        event.preventDefault();
        var password = $('#oldPassword').val();
        var newPassword = $('#newPassword').val();
        $.ajax({
            url: '/change-password',
            method: 'post',
            data: JSON.stringify({
                password: password,
                newPassword: newPassword
            }),
            contentType: 'application/json',
            success: success()
        });
    });
});

function success() {
    $("#oldPassword").val("");
    $("#newPassword").val("");
    $("#repeatPassword").val("");
    alert('Your password has changed successfully!');
}