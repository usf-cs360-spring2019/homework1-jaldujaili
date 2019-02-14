dayWeekMap = d3.map();
d3.csv("incident12-1.csv", dayOfWeekRow).then(function(d){

    drawBubbleMap()
});



var drawBubbleMap = function(){
    var svg = d3.select("body").select("svg");
    let bounds = svg.node().getBoundingClientRect();
    let width = bounds.width;
    let height = bounds.height;

    svg.attr("height", height)
        .attr("width", width)


    var color = d3.scaleOrdinal()
        .domain(data.map(function(d){ return d.Call_Type;}))
        .range(['#B07AA1','#4E79A7','#F28E2B','#EDC948','#59A14F',
            '#E15759']);

    var root = d3.hierarchy({children: data})
        .sum(function(d) { return d.value; })



}