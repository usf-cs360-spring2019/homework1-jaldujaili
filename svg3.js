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
        left:   20
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
        .rangeRound([0, plotWidth]);

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

    var yAxis = d3.axisLeft(y);
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
    graph.append("path").attr("class", "line").attr("d", valueline(dayentries));;

}


// dayMap = d3.map();
// d3.csv("incident12-1.csv").then(function(d){
//
//     var parsedData = parseData(d)
//     drawLine(parsedData)
// });
//
// function parseData(data) {
//     var arr = [];
//     incedentDateParse = d3.timeParse("%Y/%m/%d");
//
//
//     for(var i in data){
//         var date = incedentDateParse(data[i]["Incident Date"])
//         if (date !== null){
//             arr.push(
//                 {
//                     date: date.getDate(), //date
//                     value: 1 //convert string to number
//                 });
//         }
//     }
//
//     return arr;
// }
//
// function drawLine(data){
//     var margin = { top: 20, right: 20, bottom: 30, left: 50 };
//     var svg = d3.select('svg');
//
//     let bounds = svg.node().getBoundingClientRect();
//     var width = bounds.width - margin.right - margin.left;
//     var height = bounds.height - margin.top - margin.bottom;
//
//         svg.attr("width", width)
//         .attr("height", height);
//
//     // var g = svg.append("g")
//     //     .attr("transform",
//     //         "translate(" + margin.left + "," + margin.top + ")"
//     //     );
//     //
//     // // var x = d3.scaleTime().rangeRound([0, width]);
//     // // var y = d3.scaleLinear().rangeRound([height, 0]);
//     //
//     // var x = d3.scaleTime()
//     //     .domain(days)
//     //     .rangeRound([0, width]);
//     //
//     // var y = d3.scaleLinear()
//     //     .domain([countMax, countMin])
//     //     .range([height, 0])
//     //     .nice();
//     //
//     // var yaxis = d3.axisLeft(y);
//     // var xaxis = d3.axisBottom(x);
//     //
//     // var line = d3.line()
//     //     .x(function(d) { return x(d.date)})
//     //     .y(function(d) { return y(d.value)})
//     // // x.domain(d3.extent(data, function(d) { return d.date }));
//     // // y.domain(d3.extent(data, function(d) { return d.value }));
//     //
//     // g.append("g")
//     //     .attr("transform", "translate(0," + height + ")")
//     //     .call(d3.axisBottom(x))
//     //     .select(".domain")
//     //     .remove();
//     //
//     // g.append("g")
//     //     .call(d3.axisLeft(y))
//     //     .append("text")
//     //     .attr("fill", "#000")
//     //     .attr("transform", "rotate(-90)")
//     //     .attr("y", 6)
//     //     .attr("dy", "0.71em")
//     //     .attr("text-anchor", "end")
//     //     .text("Price ($)");
// }