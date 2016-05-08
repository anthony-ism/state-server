//One time pre-process step for data
var data = require('./pre-process');

//Using the calculated meta data, find where the datapoint resides. This step is linear.
var findDataPoint = function(lat, long) {
    var candidates = [];
    var result = [];
    var isBetween = function(min, max, candidate) {
        return (candidate >= min && candidate <= max);
    };

    //Find Lat Candidates
    data.forEach(function(latLong) {
        if (isBetween(latLong.latMin, latLong.latMax, lat)) {
            candidates.push(latLong);
        }
    });

    //Find Long Candidates
    candidates.forEach(function(latLong) {
        if (isBetween(latLong.longMin, latLong.longMax, long)) {
            result.push(latLong.state);
        }
    });
    return result;
};

module.exports = findDataPoint;