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
        bottom: 40, // leave space for x-axis
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
    let yAxis = d3.axisLeft(countScale);

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
        .attr("x",0 - (plotHeight / 2)-45)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Number of Records");

    // svg.append("text")
    //
    //     .attr("y", 5 - margin.left)
    //     .attr("x",0 - (plotHeight -10))
    //     .attr("dy", "1em")
    //     .style("text-anchor", "middle")
    //     .text("Value");

    svg.append("text")
        .attr("x", (plotWidth / 2))
        .attr("y", 0 + (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text("Value vs Date Graph");
}

d3.csv("incident12-1.csv", policeRow).then(function(d){
    drawBarChart()
});