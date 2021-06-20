function plot_candleStick_ana(company){
    var dataPoints1 = [];
    var dataPoints2 = [];
    
    var chart1 = new CanvasJS.Chart("chartContainer_analysis1", {
        animationEnabled: true,
        theme: "light1", // "light1", "light2", "dark1", "dark2"
        exportEnabled: true,
        title: {
            text: "Predicted & actual value for "+company
        },
        subtitles: [{
            text: "the past 7 days"
        }],
        axisX: {
            interval: 0,
            valueFormatString: "MM-DD"
        },
        axisY: {
            prefix: "$",
            title: "Price"
        },
        legend: {
            verticalAlign: "top",
            horizontalAlign: "right",
            dockInsidePlotArea: true
        },
        toolTip: {
            content: "Date: {x}<br /><strong>Price:</strong><br />Open: {y[0]}, Close: {y[3]}<br />High: {y[1]}, Low: {y[2]}"
        },
        data: [{
            name:"predicted",
            type: "candlestick",
            showInLegend: true,
            legendMarkerType: "square",
            yValueFormatString: "$##0.00",
            color: "rgba(255,0,0,0.5)",
            dataPoints: dataPoints1
        },{
            name:"actual",
            type: "candlestick",
            showInLegend: true,
            legendMarkerType: "square",
            color: "rgba(0,0,255,0.3)",
            yValueFormatString: "$##0.00",
            dataPoints: dataPoints2
        }
    ]
    });
    
    
    $.get("/getTickers_pre?company="+company, getDataPointsFromCSV);
    // $.get("/getTickers_act?company="+company, getDataPointsFromCSV2);
    
    function getDataPointsFromCSV(csv) {
        var csvLines = points = [];
        csvLines = csv.split(/[\r?\n|\r|\n]+/);
        for (var i = 1; i < csvLines.length; i++) {
            if (csvLines[i].length > 0) {
                points = csvLines[i].split(",");
                dataPoints1.push({
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
        $.get("/getTickers_act?company="+company, getDataPointsFromCSV2);
        
        
    }
    function getDataPointsFromCSV2(csv) {
        var csvLines = points = [];
        csvLines = csv.split(/[\r?\n|\r|\n]+/);
        for (var i = 1; i < csvLines.length; i++) {
            if (csvLines[i].length > 0) {
                points = csvLines[i].split(",");
                dataPoints2.push({
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
        chart1.render();
        
        
    }

}