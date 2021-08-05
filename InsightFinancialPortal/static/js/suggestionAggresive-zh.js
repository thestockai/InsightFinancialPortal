function suggestionAgg(company){

    $.get("/getTickers?company="+company, getDataPointsFromCSV);
    
    function getDataPointsFromCSV(csv) {
        document.getElementById("sellDate").innerHTML =("");
        document.getElementById("buyDate").innerHTML =("");
        document.getElementById("expectedReturn").innerHTML =("");
        var csvLines = points = [];
        csvLines = csv.split(/[\r?\n|\r|\n]+/);
        var currentMax = 0;
        var currentMin = 1000000000000000;
        var minDate;
        var maxDate;
        var pointStart = csvLines[1].split(",");
        var startDate = new Date(
            parseInt(pointStart[1].split("-")[0]),
            parseInt(pointStart[1].split("-")[1]-1),
            parseInt(pointStart[1].split("-")[2])
        );
        var startValue = parseFloat(pointStart[2]);
        var num = 1;
        while (csvLines[num].length > 0) {
            num+= 1;
        }
        num -=1;
        var pointEnd = csvLines[num].split(",");
        var endValue = parseFloat(pointEnd[5]);
        var endDate = new Date(
            parseInt(pointEnd[1].split("-")[0]),
            parseInt(pointEnd[1].split("-")[1]-1),
            parseInt(pointEnd[1].split("-")[2])
        );

        

        
        

        for (var i = 1; i < csvLines.length; i++) {
            if (csvLines[i].length > 0) {
                points = csvLines[i].split(",");
                var max = parseFloat(points[2]);
                for (var j = 2; j <= 5;j ++) {
                    if(parseFloat(points[j]) > max) {
                        max = parseFloat(points[j]);
                    }
                }
                var min = parseFloat(points[2]);
                for (var j = 2; j <= 5;j ++) {
                    if(parseFloat(points[j]) < min) {
                        min = parseFloat(points[j]);
                    }
                }
                if(currentMax < max) {
                    currentMax = max;
                    maxDate = new Date(
                        parseInt(points[1].split("-")[0]),
                        parseInt(points[1].split("-")[1]-1),
                        parseInt(points[1].split("-")[2])
                    );
                }
                if(currentMin > min) {
                    currentMin = min;
                    minDate = new Date(
                        parseInt(points[1].split("-")[0]),
                        parseInt(points[1].split("-")[1]-1),
                        parseInt(points[1].split("-")[2])
                    );
                }
            }
        }

        var diff = (currentMax-currentMin)/currentMin;
        var accuracy = false;
        if((minDate - startDate) /(1000 * 3600 * 24) <= 7) {
            accuracy = true;
        }
        
        if(maxDate > minDate && accuracy) {
            var minDateStr = minDate.toString();
            var maxDateStr = maxDate.toString();
            minDateStr = minDateStr.slice(0, 15);
            maxDateStr = maxDateStr.slice(0, 15);
            document.getElementById("buyDate").innerHTML =("建议买入日期: " + minDateStr);
            if(endDate.getTime() != maxDate.getTime()) {
                document.getElementById("sellDate").innerHTML =("建议卖出日期: " + maxDateStr);
                document.getElementById("expectedReturn").innerHTML =("预期收益率: " + ((currentMax - currentMin)/currentMin * 100).toFixed(2) + "%");
            } else {
                document.getElementById("sellDate").innerHTML =("一直持有该股票");
                document.getElementById("expectedReturn").innerHTML =("预期收益率: " + ((endValue - currentMin)/currentMin * 100).toFixed(2) + "%");
            }
            return;
        }


        var openPrices = [];
        var openDates = [];
        var dates = startDate;
        for (var i = 1; i < csvLines.length; i++) {
            if (csvLines[i].length > 0) {
                points = csvLines[i].split(",");
                openPrices.push(parseFloat(points[2]));
                dates = new Date(
                    parseInt(points[1].split("-")[0]),
                    parseInt(points[1].split("-")[1]-1),
                    parseInt(points[1].split("-")[2])
                );
                openDates.push(dates);
            }
        }
        var beginningDate = startDate;
        var endingDate = startDate;
        var count = 1;
        var startingValue;
        var endingValue;
        var point1 = csvLines[1].split(",");
        var date1 = new Date(
            parseInt(point1[1].split("-")[0]),
            parseInt(point1[1].split("-")[1]-1),
            parseInt(point1[1].split("-")[2])
        );
        var point2 = csvLines[2].split(",");
        var date2 = new Date(
            parseInt(point2[1].split("-")[0]),
            parseInt(point2[1].split("-")[1]-1),
            parseInt(point2[1].split("-")[2])
        );
        for (var i = 1; i < openPrices.length; i++) {
            if(count == 1) {
                beginningDate = openDates[i];
                if(beginningDate.getTime() == date2.getTime()) {
                    if(point2 > point1) {
                        beginningDate = date1;
                    }
                }
                startingValue = openPrices[i];
            }
            if(openPrices[i] > openPrices[i - 1]) {
                count += 1;
            }
            if(openPrices[i] < openPrices[i - 1]) {
                count = 1;
                continue;
            }
            if(count > 3 && i < (openPrices.length - 1)) {
                if(openPrices[i + 1] >= openPrices[i]) {
                    count += 1
                    continue;
                } else if (openPrices[i + 1] < openPrices[i] || i == openPrices.length - 2) {
                    endingDate = openDates[i];
                    endingValue = openPrices[i];
                    console.log(endingDate);
                    console.log(beginningDate);
                    var endingDateStr = endingDate.toString();
                    var beginningDateStr = beginningDate.toString();
                    endingDateStr = endingDateStr.slice(0, 15);
                    beginningDateStr = beginningDateStr.slice(0, 15);
                    document.getElementById("buyDate").innerHTML =("建议买入日期: " + beginningDateStr);
                    document.getElementById("sellDate").innerHTML =("建议卖出日期: " + endingDateStr);
                    document.getElementById("expectedReturn").innerHTML =("预期收益率: " + ((endingValue - startingValue)/startingValue * 100).toFixed(2) + "%");
                    return;
                }
            }
        }
        if (diff < 0.03) {
            document.getElementById("buyDate").innerHTML =("建议观望/持仓");
            return;
        }
        if(endValue < startValue) {
            document.getElementById("sellDate").innerHTML =("如果有持仓建议卖出");
            return;
        }
        if (Math.abs((endValue-startValue)/startValue) < 0.02) {
            document.getElementById("buyDate").innerHTML =("建议观望/持仓");
            return;
        }
        document.getElementById("buyDate").innerHTML =("建议观望/持仓");
        
    } 
}