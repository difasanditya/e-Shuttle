function email(id) {
    $.ajax({
        url: '/email',
        method: 'post',
        data: JSON.stringify({
            id: id
        }),
        contentType: 'application/json',
        success: alert('success')
    });
}

function cancel(id) {
    $.ajax({
        url: '/cancel',
        method: 'post',
        data: JSON.stringify({
            id: id
        }),
        contentType: 'application/json',
        success: function (data) {
            window.location = data.redirect;
        }
    });
}