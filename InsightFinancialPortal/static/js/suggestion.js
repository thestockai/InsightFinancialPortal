function suggestion(company){

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
        var endValue = parseFloat(pointEnd[3]);
        var endDate = new Date(
            parseInt(pointEnd[1].split("-")[0]),
            parseInt(pointEnd[1].split("-")[1]-1),
            parseInt(pointEnd[1].split("-")[2])
        );

        /* fully functional, for users that pursue a higher return rate with the cost of a higher risk.

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
        for (var i = 1; i < openPrices.length; i++) {
            if(count == 1) {
                beginningDate = openDates[i];
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
                    document.getElementById("buyDate").innerHTML =("Suggested Buy Date: " + beginningDateStr);
                    document.getElementById("sellDate").innerHTML =("Suggested Sell Date: " + endingDateStr);
                    document.getElementById("expectedReturn").innerHTML =("Expected Return: " + ((endingValue - startingValue)/startingValue * 100).toFixed(2) + "%");
                    return;
                }
            }
        }
        */

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
        if (diff < 0.03) {
            document.getElementById("buyDate").innerHTML =("We suggest holding the stock/wait and see");
            return;
        }
        if(endValue < startValue) {
            document.getElementById("sellDate").innerHTML =("We suggest selling the stock if you have any possession");
            return;
        }
        if(maxDate > minDate && accuracy) {
            var minDateStr = minDate.toString();
            var maxDateStr = maxDate.toString();
            minDateStr = minDateStr.slice(0, 15);
            maxDateStr = maxDateStr.slice(0, 15);
            document.getElementById("buyDate").innerHTML =("Suggested Buy Date: " + minDateStr);
            if(endDate.getTime() != maxDate.getTime()) {
                document.getElementById("sellDate").innerHTML =("Suggested Sell Date: " + maxDateStr);
                document.getElementById("expectedReturn").innerHTML =("Expected Return: " + ((currentMax - currentMin)/currentMin * 100).toFixed(2) + "%");
            } else {
                document.getElementById("sellDate").innerHTML =("Hold till end");
                document.getElementById("expectedReturn").innerHTML =("Expected Return: " + ((endValue - currentMin)/currentMin * 100).toFixed(2) + "%");
            }
            return;
        }
        if (Math.abs((endValue-startValue)/startValue) < 0.02) {
            document.getElementById("buyDate").innerHTML =("We suggest holding the stock/wait and see");
            return;
        }
        document.getElementById("buyDate").innerHTML =("");
        document.getElementById("sellDate").innerHTML =("");
        
    } 
}