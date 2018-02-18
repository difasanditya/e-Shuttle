$(document).ready(function () {
    $("#editProfile").submit(function (event) {
        event.preventDefault();
        var name = $('#name').val();
        var nip = $('#nip').val();
        var division = $('#division').val();
        $.ajax({
            url: '/edit-profile',
            method: 'post',
            data: JSON.stringify({
                name: name,
                nip: nip,
                division: division
            }),
            contentType: 'application/json',
            success: function (data) {
                window.location = data.redirect;
            }
        });
    });
});