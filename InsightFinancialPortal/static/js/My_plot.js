function plot_stuff1(company) {
    var path = '/getAcc?company=' + company
    // "/getTickers?company="+company
    Open = []
    High = []
    Low = []
    Close = []
    var today =new Date();
    var day = today.getFullYear() + '-' + (today.getMonth()-1)+ '-' +(today.getDay() + 20)
    var chart = new CanvasJS.Chart("plot_dynamic", {
        animationEnabled: true,
        title: {
            text: "Absolute Difference of prediction for " + company + " in Percentage"
        },
        axisX: {
            valueFormatString: "MM-DD"
            // ,
            // minimum: new Date(today),
            // maximum: new Date(day)
        },
        legend: {
            verticalAlign: "top",
            horizontalAlign: "right",
            dockInsidePlotArea: true
        },
        axisY: {
            title: "Difference",
            suffix : "%"
        },
        
        toolTip: {
            shared: true,
            fontFamily: "times new roman"
        },
        data: [{
            name: "Open",
            showInLegend: true,
            legendMarkerType: "square",
            type: "area",
            color: "rgba(0,0,255,0.4)",
            markerSize: 0,
            dataPoints: Open
        },
        {
            name: "High",
            showInLegend: true,
            legendMarkerType: "square",
            type: "line",
            color: "rgba(0,75,141,0.5)",
            markerSize: 0,
            dataPoints: High
        }, {
            name: "low",
            showInLegend: true,
            legendMarkerType: "square",
            type: "line",
            color: "rgba(255,0,0,0.4)",
            markerSize: 0,
            dataPoints: Low
        },
        {
            name: "Close",
            showInLegend: true,
            legendMarkerType: "square",
            type: "line",
            color: "rgba(0,255,0,0.4)",
            markerSize: 0,
            dataPoints: Close
        }
        ]
    });
    $.get(path,getDataPointsFromCSV);
    function getDataPointsFromCSV(csv) {
        var today = new Date(Date.now());
        var csvLines = points = [];
        csvLines = csv.split(/[\r?\n|\r|\n]+/);
        for (var i = 1; i < csvLines.length; i++) {
            if (csvLines[i].length > 0) {
                points = csvLines[i].split(",");
                day = new Date(
                    today.getFullYear(),
                    today.getMonth() ,
                    today.getDay() + i
                );
                Open.push({
                    x: day ,
                    y:parseFloat(points[2]),
    
    
                });
                High.push({
                    x: day ,
                    y:parseFloat(points[3]),
    
    
                });
                Low.push({
                    x: day ,
                    y:parseFloat(points[4]),
    
                });
                Close.push({
                    x: day ,
                    y:parseFloat(points[5])
    
                });
            }
        }
    
        chart.render();
    }
}

function plot_stuff(company) {
    var dataPoints1 = [];
    var Open = [];
    var High = [];
    var Low = [];
    var Close = [];
    var date = new Date();
    date.setTime(date.getTime() - 24*60*60*1000);
    var yesterday_date =date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate());
    var chart1 = new CanvasJS.Chart("plot_dynamic", {
        animationEnabled: true,
        theme: "light1", // "light1", "light2", "dark1", "dark2"
        exportEnabled: true,
        title: {
            text: "Prediction for " + company,
            fontFamily: "times new roman",
            fontWeight: "bolder"
        },
        subtitles: [{
            text: "starting from different days for yesterday( " + yesterday_date + " )",
            fontFamily: "times new roman"
        }],
        axisX: {
            interval: 0,
            valueFormatString: "MM-DD",
            fontFamily: "times new roman"
        },
        axisY: {
            prefix: "$",
            title: "Price",
            fontFamily: "times new roman"
        },
        legend: {
            verticalAlign: "top",
            horizontalAlign: "right",
            dockInsidePlotArea: true,
            fontFamily: "times new roman"
        },
        toolTip: {
            shared: true,
            fontFamily: "times new roman"
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
            name:"actual_Open",
            type: "line",
            showInLegend: true,
            markerSize: 0,
            // color: "rgba(0,0,255,0.3)",
            yValueFormatString: "$##0.00",
            dataPoints: Open
        },{
            name:"actual_High",
            type: "line",
            showInLegend: true,
            markerSize: 0,
            // color: "rgba(0,0,255,0.3)",
            yValueFormatString: "$##0.00",
            dataPoints: High
        },{
            name:"actual_Low",
            type: "line",
            showInLegend: true,
            markerSize: 0,
            // color: "rgba(0,0,255,0.3)",
            yValueFormatString: "$##0.00",
            dataPoints: Low
        },{
            name:"actual_Close",
            type: "line",
            showInLegend: true,
            markerSize: 0,
            // color: "rgba(0,0,255,0.3)",
            yValueFormatString: "$##0.00",
            dataPoints: Close
        }
    ]
    });
    
    
    $.get("/getAna2?company="+company, getDataPointsFromCSV);
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
        $.get("/getAct2?company="+company, getDataPointsFromCSV2);
        // chart1.render();
        
    }
    
    function getDataPointsFromCSV2(csv) {
        var today = new Date(Date.now());
        var csvLines = points = [];
        csvLines = csv.split(/[\r?\n|\r|\n]+/);
        for (var i = 1; i < csvLines.length; i++) {
            if (csvLines[i].length > 0) {
                points = csvLines[i].split(",");
                // day = new Date(
                //     today.getFullYear(),
                //     today.getMonth() ,
                //     today.getDay() + i
                // );
                Open.push({
                    x: new Date(
                        parseInt(points[1].split("-")[0]),
                        parseInt(points[1].split("-")[1]-1),
                        parseInt(points[1].split("-")[2])
                    ) ,
                    y:parseFloat(points[2]),
    
    
                });
                High.push({
                   x: new Date(
                        parseInt(points[1].split("-")[0]),
                        parseInt(points[1].split("-")[1]-1),
                        parseInt(points[1].split("-")[2])
                    ),
                    y:parseFloat(points[3]),
    
    
                });
                Low.push({
                    x: new Date(
                        parseInt(points[1].split("-")[0]),
                        parseInt(points[1].split("-")[1]-1),
                        parseInt(points[1].split("-")[2])
                    ),
                    y:parseFloat(points[4]),
    
                });
                Close.push({
                    x: new Date(
                        parseInt(points[1].split("-")[0]),
                        parseInt(points[1].split("-")[1]-1),
                        parseInt(points[1].split("-")[2])
                    ),
                    y:parseFloat(points[5])
    
                });
            }
        }
        chart1.render();   
    }
}

