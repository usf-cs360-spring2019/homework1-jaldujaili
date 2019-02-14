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

    var pack = d3.pack()
        .size([width-150, height])
        .padding(1.5);

    var data = dayWeekMap.entries()
    var color = d3.scaleOrdinal()
        .domain(data.map(function(d){ return d.key;}))
        .range(['#B07AA1', //sat
            '#4E79A7', //sun
            '#F28E2B', //mon
            '#E15759', //tue
            '#76B7B2', // wed
            '#59A14F', //thurs
            '#EDC948']);

    var root = d3.hierarchy({children: data})
        .sum(function(d) { return d.value; })


    var node = svg.selectAll(".node")
        .data(pack(root).leaves())
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    node.append("circle")
        .attr("id", function(d) {
            console.log(d.id)
            return d.id; })
        .attr("r", function(d) {
            console.log(d.data.key+ " "+ d.r);
            return d.r;
        })
        .style("fill", function(d) { return color(d.data.key); });

    node.append("text")
        .text(function(d) {
            if (d.data.value > 748){
                return d.data.key;
            }
            return "";});

    var legend = svg.selectAll(".legend")
        .data(data).enter()
        .append("g")
        .attr("class","legend")
        .attr("transform", "translate(" + 780 + "," + 120+ ")");


    legend.append("rect")
        .attr("x", 0)
        .attr("y", function(d, i) { return 20 * i; })
        .attr("width", 15)
        .attr("height", 15)
        .style("fill", function(d) { return color(d.key)});


    legend.append("text")
        .attr("x", 25)
        .attr("text-anchor", "start")
        .attr("dy", "1em")
        .attr("y", function(d, i) { return 20 * i; })
        .text(function(d) {return d.key;})
        .attr("font-size", "12px");


    legend.append("text")
        .attr("x",31)
        .attr("dy", "-.2em")
        .attr("y",-10)
        .text("Days of the Week")
        .attr("font-size", "17px");
}