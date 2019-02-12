// var convertRow = function(row,index){
//     incedentHourParse = d3.timeParse("%H:%m");
//     incedentDateParse = d3.timeParse("%Y/%m/%d");
//     let out ={};
//
//     var district = row["Police District"];
//     out["Police District"] = district;
//     if(count.has(district)){
//         count.set(district, count.get(district)+1)
//     }else{
//         count.set(district, 1)
//     }
//
//     var time = incedentHourParse(row["Incident Time"])
//     out["Incident Time"] = time;
//
//     var date = incedentDateParse(row["Incident Date"])
//     out["Incident Date"]= date;
//
//     return out ;
// }
var policeRow = function(row,index){
    let out ={};

    var district = row["Police District"];
    out["Police District"] = district;
    if(count.has(district)){
        count.set(district, count.get(district)+1)
    }else{
        count.set(district, 1)
    }

    return out ;
}