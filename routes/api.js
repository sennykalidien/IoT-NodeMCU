var fs = require('fs'),
    express = require('express'),
    router = express.Router(),
    jsonfile = require('jsonfile'),
    moment = require('momentjs'),
    getLastObject = require('../methods/methods.js');

router.post('/', function(req, res) {
    var file = 'resources/data.json',
        now = moment().format('YYYY-MM-DD HH:mm:ss');

    jsonfile.readFile(file, function(err, obj) {
        var lastObject = getLastObject(obj),

        /* THE LOGIC */
        var minimumRange = 50;
        var maximumRange = 100;

        var distance = req.body.input || lastObject.input.distance;

        if (distance <= minimumRange) {
            var ledValue = "green";
        } else if (distance => maximumRange) {
            var ledValue = "red";
        } else {
            var ledValue = "yellow";
        }

        var newdata = {
            time: now,
            input: {
                //distance: req.body.input || lastObject.input.distance
                distance: distance
            },
            output: {
                led: ledValue || req.body.output || lastObject.input.led
            }
        };
        console.log(req.body);
        obj.push(newdata);
        jsonfile.writeFileSync(file, obj);
        res.redirect('/');
    });
});

router.get('/status/input', function(req, res) {
    var file = 'resources/data.json';

    jsonfile.readFile(file, function(err, obj) {
        res.send('{"distance":' + getLastObject(obj).input.distance + '}');
    });
});

router.get('/status/output', function(req, res) {
    var name = req.params.input;
    var file = 'resources/data.json';

    jsonfile.readFile(file, function(err, obj) {
        res.send('{"led":"' + getLastObject(obj).output.led + '"}');
    });
});

router.get('/data/', function(req, res) {
    var name = req.params.name;
    var file = 'resources/data.json';

    jsonfile.readFile(file, function(err, obj) {
        res.send(obj);
    });
});

module.exports = router;
