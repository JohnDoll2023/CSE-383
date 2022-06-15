var URL="http://ceclnx01.cec.miamioh.edu/~johnsok9/cse383/ajax/index.php";
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
