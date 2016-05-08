var data = require('./pre-process');

var findDataPoint = function(lat, long) {
    //Find Lat Candidates
    var isBetween = function(min, max, candidate) {
        return (candidate >= min && candidate <= max);
    };

    var candidates = [];
    data.forEach(function(latLong) {
        if (isBetween(latLong.latMin, latLong.latMax, lat)) {
            candidates.push(latLong);
        }
    });

    var result = [];
    candidates.forEach(function(latLong) {
        if (isBetween(latLong.longMin, latLong.longMax, long)) {
            result.push(latLong.state);
        }
    });
    return result;
};

module.exports = findDataPoint;