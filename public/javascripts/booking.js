$(function () {
    $('#date').datetimepicker({
        format: 'DD/MM/YYYY',
        daysOfWeekDisabled: [0, 6],
        minDate: new Date().setDate(new Date().getDate() + 7)
    });

    $("#bookingForm").submit(function (event) {
        event.preventDefault();
        var route = $('#route').val();
        var date = $('#date').val();
        $.ajax({
            url: '/add-booking',
            method: 'post',
            data: JSON.stringify({
                route: route,
                date: date
            }),
            contentType: 'application/json',
            success: success()
        });
    });
});

function success() {
    $('#route').val('null');
    $('#date').val('');
    alert('booking success');
}