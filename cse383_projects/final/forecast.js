function download() {
    var new_tbody = document.createElement('tbody');
    var old_tbody = document.getElementById('old');
    old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
    new_tbody.setAttribute("id", "old");
    var url = "https://dolljm.aws.csi.miamioh.edu/final.php";
    var newdate = $("#date").val();
    var div = document.getElementById("information");
    div.style.display = '';
    var sorter = document.getElementById("sorter");
    var val = sorter.checked ? 2 : 1;
    a=$.ajax({
        url: url,
        data: {
            "sort": val,
            "date": newdate,
            method: "getTemp"
        }
    }).done(function(data) {
        console.log(data);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        $.each(data.result, function() {
            var zip = this.location;
            var high = this.High;
            var low = this.Low;
            var forecast = this.Forecast;
            var date = new Date(this.date);
            var month = months[date.getMonth()];
            var day = days[date.getDay()];
            var monthdate = date.getDate() + 1;
            var fulldate = "" + day + ", " + month + " " + monthdate;
            var request = this.DateRequested;
            $('#information').append('<tr><td>' + zip + '</td><td>' + request + '</td><td>' + fulldate + '</td><td>' + 
                                     high + '</td><td>' + low + '</td><td>' + forecast + '</td></tr>');
        })
    }).fail(function(data) {
        console.log(error);
    });
}
