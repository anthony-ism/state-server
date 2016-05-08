const express = require('express');
const bodyParser = require('body-parser');
const findDatapoint = require('./lib/find-data-point');

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/', urlencodedParser, function (req, res) {
    var lat = parseFloat(req.body.latitude);
    var long = parseFloat(req.body.longitude);
    if (isNaN(lat + long)) {
        res.status(400).send('latitude & longitude must be defined as numbers');
    } else {
        res.status(200).send(findDatapoint(lat,long));
    }
});

module.exports = app;