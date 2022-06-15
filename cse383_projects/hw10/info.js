var URL="http://ceclnx01.cec.miamioh.edu/~johnsok9/cse383/ajax/index.php";
getLoad();
getNetwork();
getUser();
var tBytes=0;
var rBytes=0;
var counter = 0;
function getLoad() {
	a=$.ajax({
		url: URL + '/api/v1/loadavg',
		method: "GET"
	}).done(function(data) {
		$("#oma").html(data.loadavg.OneMinAvg);
		$("#fma").html(data.loadavg.FiveMinAvg);
		$("#15ma").html(data.loadavg.FifteenMinAvg);
		$("#num").html(data.loadavg.NumRunning);
		$("#ttl").html(data.loadavg.TtlProcesses);
		setTimeout(getLoad,1000);
	}).fail(function(error) {
		$("#log").prepend("network error" +new Date()+ "<br>");
		setTimeout(getLoad,1000);
	});
}
function getNetwork() {
	a=$.ajax({
		url: URL + '/api/v1/network',
		method: "GET"
	}).done(function(data) {
		counter++;
		tBytes += parseInt(data.network.txbytes);
		rBytes += parseInt(data.network.rxbytes);
		$("#tx").html(tBytes);
		$("#rx").html(rBytes);
		$("#avgtx").html((tBytes/counter));
		$("#avgrx").html((rBytes/counter));
		setTimeout(getNetwork,1000);
	}).fail(function(error) {
		$("#log").prepend("network error "+new Date()+"<br>");
		setTimeout(getNetwork,1000);
	});
}
function getUser() {
        a=$.ajax({
                url: URL + '/api/v1/who',
                method: "GET"
        }).done(function(data) {
		len = data.who.length;
                for(i=0;i<len;i++) {
			$("#users").append("<tr><td>" + data.who[i].uid + "</td><td>" + data.who[i].ip + "</td></tr>");
		}
        }).fail(function(error) {
                $("#log").prepend("network error" +new Date()+ "<br>");
        });
}
