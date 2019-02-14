dayWeekMap = d3.map();
d3.csv("incident12-1.csv", dayOfWeekRow).then(function(d){

    drawBubbleMap()
});


/*
 sources:
 https://bl.ocks.org/carlvlewis/53d42df2300231c1daacdaf9067043c0
*/

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
        .attr("transform", function(d, i) {
            console.log("x "+d.x+" " + "y "+d.y)
            switch (d.data.key){
                case "Saturday":
                    return "translate(" + (d.x-35) + "," + d.y + ")";
                case "Sunday":
                    return "translate(" + (d.x-3) + "," + d.y + ")";
                case "Monday":
                    return "translate(" + (d.x+220) + "," + (d.y-122) + ")";
                case "Tuesday":
                    return "translate(" + (d.x+135) + "," + (d.y+180) + ")";
                case "Wednesday":
                    return "translate(" + (d.x+320) + "," + (d.y+260) + ")";
                case "Thursday":
                    return "translate(" + (d.x-18   ) + "," + (d.y+245) + ")";
                case "Friday":
                    return "translate(" + (d.x+145) + "," + (d.y-5) + ")";
                default:
                    break;
            }
        });

    node.append("circle")
        .attr("id", function(d) {
            console.log(d.id)
            return d.id; })
        .attr("r", function(d) {
            switch (d.data.key) {
                case "Saturday":
                    return (1.45*(d.r));
                case "Sunday":
                    return d.r;
                case "Monday":
                    return (1.2*(d.r));
                case "Tuesday":
                    return (.4*(d.r));
                case "Wednesday":
                    return (.79*(d.r));
                case "Thursday":
                    return (.55*(d.r));
                case "Friday":
                    return (.95*(d.r));
                default:
                    break;
            }
        })
        .style("fill", function(d) { return color(d.data.key); });

    var legend = svg.selectAll(".legend")
        .data(data).enter()
        .append("g")
        .attr("class","legend")
        .attr("transform", "translate(" + 750 + "," + 80+ ")")



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

    svg.append("text")
        .attr("x", 15)
        .attr("y", 30)
        .style("font-size", "17pt")
        .style("font-family", "'Roboto', sans-serif")
        .text("Incidents by Day of the Week");
}