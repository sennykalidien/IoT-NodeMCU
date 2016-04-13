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
            newdata = {
                time: now,
                lisa: {
                  led: req.body.lisa || lastObject.lisa,
                  value1: req.body.lisaValue1,
                  value2: req.body.lisaValue2,
                  value3: req.body.lisaValue3
                },
                senny: {
                  led: req.body.senny || lastObject.senny,
                  value1: req.body.sennyValue1,
                  value2: req.body.sennyValue2,
                  value3: req.body.sennyValue3
                },
                matthias: {
                  led: req.body.matthias || lastObject.matthias,
                  value1: req.body.matthiasValue1,
                  value2: req.body.matthiasValue2,
                  value3: req.body.matthiasValue3
                }
            };
        obj.push(newdata);
        jsonfile.writeFileSync(file, obj);
        res.redirect('/');
    });
});

router.get('/status/:name', function(req, res) {
    var name = req.params.name;
    var file = 'resources/data.json';

    jsonfile.readFile(file, function(err, obj) {
        res.send('{"light":"' + getLastObject(obj)[name].led + '"}');
    });
});

module.exports = router;
