var count = d3.map();
var drawBarChart = function(){

    if (count.length===0){
        return
    }
    let svg = d3.select("body").select("svg");

    let countMin = 0; // always include 0 in a bar chart!
    let countMax = d3.max(count.values());

    if (isNaN(countMax)) {
        countMax = 0;
    }

    let margin = {
        top:    50,
        right:  45, // leave space for y-axis
        bottom: 80, // leave space for x-axis
        left:   20
    };

    let bounds = svg.node().getBoundingClientRect();
    let plotWidth = bounds.width - margin.right - margin.left;
    let plotHeight = bounds.height - margin.top - margin.bottom;

    let countScale = d3.scaleLinear()
        .domain([countMin, countMax])
        .range([plotHeight,0])
        .nice();

    // let districts = Array.from( Object.keys(dict) )
    let districts = count.keys().sort();

    let districtScale = d3.scaleBand()
        .domain(districts) // all letters (not using the count here)
        .rangeRound([50, plotWidth])
        .paddingInner(0.3);

    var plot = svg.select("g#plot");

    if (plot.size() < 1) {
        plot = svg.append("g")
            .attr("id", "plot");
        plot.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    }

    let xAxis = d3.axisBottom(districtScale);
    let yAxis = d3.axisLeft(countScale).ticks(5).tickSize(-plotWidth+50);

    // function make_y_axis() {
    //     return d3.svg.axis()
    //         .scale(y)
    //         .orient("left")
    //         .ticks(5)
    // }

    function make_y_gridlines() {
        return d3.axisLeft(y)
            .ticks(5)
    }

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

    let bars = plot.selectAll("rect")
        .data(count.entries(), function(d) { return d.key; });

    bars.enter().append("rect")
        .attr("class", "bar")
        .attr("width", districtScale.bandwidth())
        .attr("x", function(d) {
            return districtScale(d.key);
        })
        .attr("y", function(d) {
            return countScale(d.value);
        })
        .attr("height", function(d) {
            return plotHeight - countScale(d.value);
        })
        .each(function(d, i, nodes) {
            // console.log("Added bar for:", d.key);
        });
    
    bars.transition()
        .attr("y", function(d) { return countScale(d.value); })
        .attr("height", function(d) { return plotHeight - countScale(d.value); });

    bars.exit()
        .each(function(d, i, nodes) {
            // console.log("Removing bar for:", d.key);
        })
        .transition()
        .attr("y", function(d) { return countScale(countMin); })
        .attr("height", function(d) { return plotHeight - countScale(countMin); })
        .remove();

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y",  10)
        .attr("x",0 - (plotHeight / 2)-50)
        .attr("dy", ".5em")
        .style("text-anchor", "middle")
        .style("font-size", "10pt")
        .style("font-family", "'Roboto', sans-serif")
        .text("Number of Records");

    // svg.append("text")
    //
    //     .attr("y", 5 - margin.left)
    //     .attr("x",0 - (plotHeight -10))
    //     .attr("dy", "1em")
    //     .style("text-anchor", "middle")
    //     .text("Value");

    svg.append("text")
        .attr("x", 15)
        .attr("y", 0 + (margin.top / 2))
        .style("font-size", "17pt")
        .style("font-family", "'Roboto', sans-serif")
        .text("Police District Incident Count");

    svg.append("text")
        .attr("x", (plotWidth / 1.8))
        .attr("y", 0 + (margin.top))
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .style("font-family", "'Roboto', sans-serif")
        .text("Police District");

    // svg.select("g")
    //     .attr("class", "grid")
    //     .call(make_y_axis()
    //         .tickSize(-width, 0, 0)
    //         .tickFormat("")
    //     )

    svg.append("text")
        .attr("text-anchor", "start")
        .attr("class", "captions")
        .attr("dy", "1em")
        .attr("transform", "translate("+ (5) + "," + (plotHeight+75)+")")
        .text("By Jordan:");

    svg.append("text")
        .attr("text-anchor", "start")
        .attr("class", "captions")
        .attr("dy", "1em")
        .attr("transform", "translate("+ (5) + "," + (plotHeight+90)+")")
        .text("The primary goal is to get each police district and see the differences between districts. This can be helpful to a user to determine the crime rate in a police district ");

    svg.append("text")
        .attr("text-anchor", "start")
        .attr("class", "captions")
        .attr("dy", "1em")
        .attr("transform", "translate("+ (5) + "," + (plotHeight+105)+")")
        .text("in order to possibly add more force to those areas.");
}

d3.csv("incident12-1.csv", policeRow).then(function(d){
    drawBarChart()
});