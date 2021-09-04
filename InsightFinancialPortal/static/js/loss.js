function loss(company){

    $.get("/getTickers?company="+"loss_ratio", getDataPointsFromCSV);
    
    function getDataPointsFromCSV(csv) {
        var csvLines = points = [];
        csvLines = csv.split(/[\r?\n|\r|\n]+/);
        for (var i = 1; i < csvLines.length; i++) {
            if (csvLines[i].length > 0) {
                points = csvLines[i].split(",");
                if(points[1] == company) {
                    document.getElementById("loss").innerHTML =("loss: " + parseFloat(points[2]) + "%");
                    return;
                }
            }
        }
    } 
}