$(function () {
    $('#date').datetimepicker({
        format: 'L',
        daysOfWeekDisabled: [0, 6],
        minDate: new Date().setDate(new Date().getDate() + 7)
    });

    $("#bookingForm").submit(function (event) {
        event.preventDefault();
        var route = $('#route');
        var tanggal = $('#date').val();
        $.ajax({
            url: '/booking',
            method: 'post',
            data: JSON.stringify({
                route: route,
                tanggal: tanggal
            }),
            contentType: 'application/json',
            success: alert('booking success')
        });
    });
});