var lat;
var lon;
var zipcode;

function getZip() {
    zipcode = $("#ZIPCODE").val();
	a=$.ajax({
		url: "https://api.clearllc.com/api/v2/miamidb/_table/zipcode",
		data: {
			"api_key": "bed859b37ac6f1dd59387829a18db84c22ac99c09ee0f5fb99cb708364858818",
			"ids": zipcode
		},
		method: "GET"
	}).done(function(data) {
            	lat = parseFloat(data.resource[0].latitude);
            	lon = parseFloat(data.resource[0].longitude);
            	getWeather();
	}).fail(function(error) {
		console.log(error);
	});
}

function getWeather() {
    var new_tbody = document.createElement('tbody');
    var old_tbody = document.getElementById('old');
    old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
    new_tbody.setAttribute("id", "old");
    var div = document.getElementById("information");
    div.style.display = '';
    a=$.ajax({
        url: "https://api.openweathermap.org/data/2.5/onecall",
        data: {
            "appid": "935fb2fa96e8b7699f8f646e4e97537a",
            "lat": lat,
            "lon": lon,
            "exclude": "hourly,minutely,current",
            "units": "imperial"
        },
        method: "GET"
    }).done(function(data) {
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var count = 0;
        $.each(data.daily, function() {
            count++;
            var convertDate = this.dt * 1000;
            var date = new Date(convertDate);
            var month = months[date.getMonth()];
            var day = days[date.getDay()];
            var monthdate = date.getDate();
            var fulldate = "" + day + ", " + month + " " + monthdate;
            var high = Math.round(this.temp.max);
            var low = Math.round(this.temp.min);
            var wind = Math.round(this.wind_speed);
            var humidity = this.humidity;
            var uv = Math.round(this.uvi);
            var forecast = this.weather[0].description;
            if (count <= 7) {
            var icon = '<img src=http://openweathermap.org/img/wn/' + this.weather[0].icon + '@2x.png>';
                $('#information').append('<tr><td>' + fulldate + '</td><td>' + high + '/' + low + '</td><td>' + forecast + '</td><td>' +
                                        icon + '</td><td>' + wind + '</td><td>' + uv + '</td><td>' + humidity + '</td></tr>');
                upload(low, high, forecast, date);
            }
        });
    }).fail(function(error) {
        console.log(error);
    });
}

function upload(low, high, forecast, date) {
    var url = "https://dolljm.aws.csi.miamioh.edu/final.php";
    var newdate = date.toISOString().slice(0,10);
    a=$.ajax({
        url: url,
        data: {
            "location": zipcode,
            "low": low,
            "high": high,
            "forecast": forecast,
            "date": newdate,
            method: "setTemp"
        }
    }).done(function(data) {
    }).fail(function(data) {
        console.log(error);
    });
}
