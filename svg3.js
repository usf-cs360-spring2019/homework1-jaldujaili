dayMap = d3.map();
d3.csv("incident12-1.csv", dayRow).then(function(d){
    drawLine()
});



var drawLine = function(){

    // console.log(dayMap)
    if (dayMap.length===0){
        return
    }

    var svg = d3.select("body").select("svg");

    let countMin = 0; // always include 0 in a bar chart!
    let countMax = d3.max(dayMap.values());

    if (isNaN(countMax)) {
        countMax = 0;
    }

    let margin = {
        top:    50,
        right:  45, // leave space for y-axis
        bottom: 40, // leave space for x-axis
        left:   30
    };

    let bounds = svg.node().getBoundingClientRect();
    let plotWidth = bounds.width - margin.right - margin.left;
    let plotHeight = bounds.height - margin.top - margin.bottom;


    let days = dayMap.keys();
    days = days.map(x=>parseInt(x));
    // days.pop();
    let counting = dayMap.values();
    // counting.pop();

    var x = d3.scaleBand()
        .domain(days)
        .rangeRound([45, plotWidth]);

    var y = d3.scaleLinear()
        .domain([countMin,countMax])
        .range([plotHeight, 0])
        .nice();


    var plot = svg.select("g#plot");

    if (plot.size() < 1) {
        plot = svg.append("g")
            .attr("id", "plot");
        plot.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    }

    var yAxis = d3.axisLeft(y).ticks(10);
    var xAxis = d3.axisBottom(x);


    if (plot.select("g#y-axis").size() < 1) {
        let xGroup = plot.append("g").attr("id", "x-axis");

        xGroup.call(xAxis);
        xGroup.attr("transform", "translate(0," + plotHeight + ")");

        let yGroup = plot.append("g").attr("id", "y-axis");
        yGroup.call(yAxis);
        yGroup.attr("transform", "translate(" + 45 + ",0)");
    } else {
        plot.select("g#y-axis").call(yAxis);
    }


    svg.attr("width", plotWidth + margin.left + margin.right)
        .attr("height", plotHeight + margin.top + margin.bottom)

    var graph = svg.append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")"
        );


    // define the line
    var valueline = d3.line()
        .x(function(d) { return x(d.key); })
        .y(function(d) { return y(d.value); })

    var dayentries = dayMap.entries();
    graph.append("path").attr("class", "line").attr("d", valueline(dayentries));

    svg.append("text")
        .attr("x", 15)
        .attr("y", 0 + (margin.top / 2))
        .style("font-size", "17pt")
        .style("font-family", "'Roboto', sans-serif")
        .text("Number of Incidents by Date");

    svg.append("text")
        .attr("x", (plotWidth / 1.8))
        .attr("y", 0 + (margin.top))
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .style("font-family", "'Roboto', sans-serif")
        .text("Incident date");

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y",  10)
        .attr("x",0 - (plotHeight / 2)-55)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("font-size", "10pt")
        .style("font-family", "'Roboto', sans-serif")
        .text("Number of Records");

};