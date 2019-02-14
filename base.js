// var convertRow = function(row,index){
//     incedentHourParse = d3.timeParse("%H:%m");
//     incedentDateParse = d3.timeParse("%Y/%m/%d");
//     let out ={};
//
//     var district = row["Police District"];
//     out["Police District"] = district;
//
//     var time = incedentHourParse(row["Incident Time"])
//     out["Incident Time"] = time;
//
//     var date = incedentDateParse(row["Incident Date"])
//     out["Incident Date"]= date;
//
//     return out ;
// }

var dayOfWeekRow = function(row,index){

    var day = row["Incident Day of Week"];

    if(dayWeekMap.has(day)){
        dayWeekMap.set(day, dayWeekMap.get(day)+1)
    }else{
        dayWeekMap.set(day, 1)
    }
}
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
};

var dayRow = function(row,index){
    let out ={};
    incedentDateParse = d3.timeParse("%Y/%m/%d");
    var date = incedentDateParse(row["Incident Date"])
    out["Incident Date"]= date;
    var day = date.getDate();
    if(dayMap.has(day)){
        dayMap.set(day, dayMap.get(day)+1)
    }else{
        dayMap.set(day, 1)
    }
    out["day"] = day
    return out;
}
