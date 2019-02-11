var dict={}
var drawBarChart = function(){

    let svg = d3.select("body").select("svg");
    // var ds = getData();
    console.log(dict)
    var max = getMaxDist(dict);
    // let countMin = 0; // always include 0 in a bar chart!
    // let countMax = d3.max(count.values());
    //
    // if (isNaN(countMax)) {
    //     countMax = 0;
    // }

    let margin = {
        top:    15,
        right:  35, // leave space for y-axis
        bottom: 30, // leave space for x-axis
        left:   10
    };

    let bounds = svg.node().getBoundingClientRect();
    let plotWidth = bounds.width - margin.right - margin.left;
    let plotHeight = bounds.height - margin.top - margin.bottom;



    // svg.selectAll("rect").data(ds).enter().append("rect")
    //     .attr("x", function(d,i){
    //
    //         return i *(plotWidth / ds.length);
    //     })
    //     .attr("y", function(d){
    //         return plotHeight -(d*4)
    //     })
    //     .attr("height", function(d){
    //         return d*4;
    //     })
    //     .attr("fill","blue")


}

var getData = function(){
    var ds;
    // var dict = {}
    // ds = d3.text("incident12-1.csv", function(row){
    //     var data = d3.csv.parseRows(text, function(d) {
    //         incedentHourParse = d3.timeParse("%H:%m");
    //         incedentDateParse = d3.timeParse("%Y/%m/%d");
    //         let out ={};
    //         out.values = [];
    //
    //
    //         for (let col in row){
    //             switch(col){
    //                 case "Police District":
    //                     var district = row[col]
    //                     out[col] = district;
    //
    //                     break;
    //                 case "Incident Time":
    //                     var time = incedentHourParse(row[col])
    //                     out[col] = time;
    //                     break;
    //                 case "Incident Date":
    //                     var date = incedentDateParse(row[col])
    //                     out[col] = date;
    //                     break
    //             }
    //         }
    //         return out ;
    //     });
    //     return data
    //
    // }).then(function(data){
    //     dict = countDistrict(data);
    //     // console.log(data);
    // })
    // ds=d3.csv("incident12-1.csv", convertRow).then(function (data) {
    //     //     dict = countDistrict(data);
    //     //     // for(var key in dict){
    //     //     //     console.log(getMaxDist(key, dict))
    //     //     // }
    //     // })

    // return dict
}

var getMaxDist = function(dict){
    Object.keys(dict).forEach(function (key) {
        console.log(key, dict[key])
    })
}

var countDistrict = function(data){
    var district = data["Police District"];
    if (dict[district] == null){
        dict[district] = 1
    }else{
        dict[district] = dict[district] +1
    }
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
    return out ;
}