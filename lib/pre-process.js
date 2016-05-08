//Adds metadata to data that caluclates the min and max values for both lat a long - This step is linear, with nominal memory cost
var json = require('../data/states.json');
var data = [];


json.forEach(function (elm) {

    var getMin = function(current, candidate) {
        return current === null || current > candidate ? candidate : current;
    };
    var getMax = function(current, candidate) {
        return current === null || current < candidate ? candidate : current;
    };
    var getMinsAndMaxs = function (border) {
        var result = {
            latMin: null,
            latMax: null,
            longMin: null,
            longMax: null
        };
        border.forEach(function (latLong) {
            var long = latLong[0];
            var lat = latLong[1];
            result.latMin = getMin(result.latMin, lat);
            result.longMin = getMin(result.longMin, long);

            result.latMax = getMax(result.latMax, lat);
            result.longMax = getMax(result.longMax, long);
        });
        return result;
    };

    var minsAndMaxs = getMinsAndMaxs(elm.border);

    data.push({
        state: elm.state,
        latMin: minsAndMaxs.latMin,
        latMax: minsAndMaxs.latMax,
        longMin: minsAndMaxs.longMin,
        longMax: minsAndMaxs.longMax
    })
});

module.exports = data;