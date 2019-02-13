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

var hourRow = function(row,index){
    let out = {};
    var incedentHourParse = d3.timeParse("%H:%m");
    var time = incedentHourParse(row["Incident Time"]);
    var hour = time.getHours();
    var district = row["Police District"];

    if(hoursMap.has(hour)){
        if(hoursMap.get(hour).has(district)){
            var hourForDistrict = hoursMap.get(hour).get(district);
            hoursMap.set(hour, hoursMap.get(hour).set(district, hourForDistrict+1 ))
        }else{
            var hourDistrict = d3.map();
            hourDistrict.set(district, 1);
            var districtHours = hoursMap.get(hour);
            hoursMap.set(hour,  districtHours.set(district, 1));
        }
    }else{
        var hourDistrict = d3.map();
        hourDistrict.set(district, 1);
        hoursMap.set(hour, hourDistrict);

    }
    return out;

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
    var day = row["Incident Day of Week"]
    if(dayMap.has(day)){
        dayMap.set(day, dayMap.get(day)+1)
    }else{
        dayMap.set(day, 1)
    }
    return out;
}