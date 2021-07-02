function plot_candleStick(company){
    var dataPoints = [];
    
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        exportEnabled: true,
        title: {
            text: "Prediction for " + company
        },
        subtitles: [{
            text: "the future 20 days"
        }],
        axisX: {
            interval: 0,
            valueFormatString: "MM-DD"
        },
        axisY: {
            prefix: "$",
            title: "Price"
        },
        toolTip: {
            content: "Date: {x}<br /><strong>Price:</strong><br />Open: {y[0]}, Close: {y[3]}<br />High: {y[1]}, Low: {y[2]}"
        },
        data: [{
            type: "candlestick",
            yValueFormatString: "$##0.00",
            dataPoints: dataPoints
        }]
    });
    
    $.get("/getTickers?company="+company, getDataPointsFromCSV);
    
    function getDataPointsFromCSV(csv) {
        var csvLines = points = [];
        csvLines = csv.split(/[\r?\n|\r|\n]+/);
        for (var i = 1; i < csvLines.length; i++) {
            if (csvLines[i].length > 0) {
                points = csvLines[i].split(",");
                dataPoints.push({
                    x: new Date(
                        parseInt(points[1].split("-")[0]),
                        parseInt(points[1].split("-")[1]-1),
                        parseInt(points[1].split("-")[2])
                    ),
                    y: [
                        parseFloat(points[2]),
                        parseFloat(points[3]),
                        parseFloat(points[4]),
                        parseFloat(points[5])
                    ]
                });
            }
        }
        chart.render();
    }
}