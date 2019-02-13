dayMap = d3.map();
d3.csv("incident12-1.csv", dayRow).then(function(d){

    drawLine()
});



var drawLine = function(){

    if (dayMap.length===0){
        return
    }
    let svg3 = d3.select("body").select("svg");

    let countMin = 0; // always include 0 in a bar chart!
    let countMax = d3.max(dayMap.values());

    if (isNaN(countMax)) {
        countMax = 0;
    }

    var margin = {top: 20, right: 20, bottom: 30, left: 50}

    let bounds = svg3.node().getBoundingClientRect();
    var width = bounds.width - margin.right - margin.left;
    var height = bounds.height - margin.top - margin.bottom;


    let days = dayMap.keys();

    var x = d3.scaleTime()
        .domain(days)
        .rangeRound([50, width]);

    var y = d3.scaleLinear()
        .domain([countMax,countMax])
        .range([height, 0])
        .nice();

    var yaxis = d3.axisLeft(y);
    var xaxis = d3.axisBottom(x);



// define the line
    var valueline = d3.line()
        .x(function() { return x(d.key); })
        .y(function() { return y(d.value); });

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

// // Get the data
//     d3.csv("data.csv", function(error, data) {
//         if (error) throw error;
//
//         // format the data
//         data.forEach(function(d) {
//             d.date = parseTime(d.date);
//             d.close = +d.close;
//         });
//
//         // Scale the range of the data
//         x.domain(d3.extent(data, function(d) { return d.date; }));
//         y.domain([0, d3.max(data, function(d) { return d.close; })]);
//
//         // Add the valueline path.
//         svg.append("path")
//             .data([data])
//             .attr("class", "line")
//             .attr("d", valueline);
//
//         // Add the X Axis
//         svg.append("g")
//             .attr("transform", "translate(0," + height + ")")
//             .call(d3.axisBottom(x));
//
//         // Add the Y Axis
//         svg.append("g")
//             .call(d3.axisLeft(y));
//
//     });
}