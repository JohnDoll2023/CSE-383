function getZip() {
    	var zipcode = $("#ZIPCODE").val();
    	var div = document.getElementById("information");
    	div.style.display = '';
	a=$.ajax({
		url: "https://api.clearllc.com/api/v2/miamidb/_table/zipcode",
		data: {
			"api_key": "bed859b37ac6f1dd59387829a18db84c22ac99c09ee0f5fb99cb708364858818",
			"ids": zipcode
		},
		method: "GET"
	}).done(function(data) {
		$("#zip").html(data.resource[0].zip);
		$("#city").html(data.resource[0].city);
		$("#state").html(data.resource[0].state);
            	$("#lat").html(data.resource[0].latitude);
		$("#long").html(data.resource[0].longitude);
		$("#time").html(data.resource[0].timezone);
        	$("#dst").html(data.resource[0].daylightSavingsFlag);
		$("#geo").html(data.resource[0].geopoint);
	}).fail(function(error) {
		$("#zip").html("Could not retrieve zip code");
            	$("#city").html("");
		$("#state").html("");
            	$("#lat").html("");
		$("#long").html("");
		$("#time").html("");
            	$("#dst").html("");
		$("#geo").html("");
	});
}
