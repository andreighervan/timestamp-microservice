// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var dateFormat = require('dateformat');
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
    res.json({greeting: 'hello API'});
});

app.get('/*', function (req, res) {
    var queryObject = req.path;
    var queryString = queryObject.slice(1);
    var unixNum = 0;
    var trimedNaturalDate = '';
    var outPutJson = {};
    var trimedQueryString = queryString.replace(/%20/g, ' ');

    // Input case 1: unix format, milliseconds num
    var numCheckPattern = /^[0-9]*$/;
    if (numCheckPattern.test(queryString)) {
        unixNum = Number(queryString);
        var date = new Date(unixNum);
        trimedNaturalDate = dateFormat(date, 'longDate');
        outPutJson = {
            unix: unixNum,
            natural: trimedNaturalDate,
        };
    } else if (Date.parse(trimedQueryString)) {
        // Input case 2: natural format, special format should match.
        unixNum = Date.parse(trimedQueryString);
        outPutJson = {
            unix: unixNum,
            natural: trimedQueryString,
        };
    }

    res.json(outPutJson);
});

// custom 404 page
app.use(function (req, res, next) {
    res.status(404);
    res.render('404');
});

// custom 500 page
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});