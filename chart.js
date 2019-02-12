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
        top:    15,
        right:  35, // leave space for y-axis
        bottom: 30, // leave space for x-axis
        left:   10
    };

    let bounds = svg.node().getBoundingClientRect();
    let plotWidth = bounds.width - margin.right - margin.left;
    let plotHeight = bounds.height - margin.top - margin.bottom;

    let countScale = d3.scaleLinear()
        .domain([countMin, countMax])
        .range([plotHeight,0])
        .nice();

    // let districts = Array.from( Object.keys(dict) )
    let districts = count.keys()

    let districtScale = d3.scaleBand()
        .domain(districts) // all letters (not using the count here)
        .rangeRound([0, plotWidth])
        .paddingInner(0.1);

    var plot = svg.select("g#plot");

    if (plot.size() < 1) {
        plot = svg.append("g")
            .attr("id", "plot");
        plot.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    }

    let xAxis = d3.axisBottom(districtScale);
    let yAxis = d3.axisRight(countScale);

    if (plot.select("g#y-axis").size() < 1) {
        let xGroup = plot.append("g").attr("id", "x-axis");

        xGroup.call(xAxis);
        xGroup.attr("transform", "translate(0," + plotHeight + ")");

        let yGroup = plot.append("g").attr("id", "y-axis");
        yGroup.call(yAxis);
        yGroup.attr("transform", "translate(" + plotWidth + ",0)");
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
            console.log("Added bar for:", d.key);
        });


    bars.transition()
        .attr("y", function(d) { return countScale(d.value); })
        .attr("height", function(d) { return plotHeight - countScale(d.value); });

    bars.exit()
        .each(function(d, i, nodes) {
            console.log("Removing bar for:", d.key);
        })
        .transition()
        .attr("y", function(d) { return countScale(countMin); })
        .attr("height", function(d) { return plotHeight - countScale(countMin); })
        .remove();

}

// var getMaxDist = function(dict){
//     var max = 0;
//     Object.keys(dict).forEach(function (key) {
//         if(dict[key] > max){
//             max = dict[key];
//         }
//     })
//     return max;
// }

var countDistrict = function(data){

    var district = data["Police District"];
    if(count.has(district)){
        count.set(district, count.get(district)+1)
    }else{
        count.set(district, 1)
    }
    // if (dict[district] == null){
    //     dict[district] = 1
    // }else{
    //     dict[district] = dict[district] +1
    // }
}


var convertRow = function(row,index){
    incedentHourParse = d3.timeParse("%H:%m");
    incedentDateParse = d3.timeParse("%Y/%m/%d");
    let out ={};
    out.values = [];


    for (let col in row){
        switch(col){
            case "Police District":
                var district = row[col]
                out[col] = district;

                break;
            case "Incident Time":
                var time = incedentHourParse(row[col])
                out[col] = time;
                break;
            case "Incident Date":
                var date = incedentDateParse(row[col])
                out[col] = date;
                break
        }
    }
    countDistrict(out);
    drawBarChart()
    return out ;
}