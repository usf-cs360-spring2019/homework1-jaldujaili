hoursMap = d3.map();
d3.csv("incident12-1.csv", hourRow).then(function(d){

    drawHeatMap()
});



var drawHeatMap = function(){
    var hours = hoursMap.keys().sort(function(a, b){return a-b});

}