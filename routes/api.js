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
                  led: req.body.lisa || lastObject.lisa.led,
                  value1: req.body.lisaValue1 || lastObject.lisa.value1,
                  value2: req.body.lisaValue2 || lastObject.lisa.value2,
                  value3: req.body.lisaValue3 || lastObject.lisa.value3
                },
                senny: {
                  led: req.body.senny || lastObject.senny.led,
                  value1: req.body.sennyValue1 || lastObject.senny.value1,
                  value2: req.body.sennyValue2 || lastObject.senny.value2,
                  value3: req.body.sennyValue3 || lastObject.senny.value3
                },
                matthias: {
                  led: req.body.matthias || lastObject.matthias.led,
                  value1: req.body.matthiasValue1 || lastObject.matthias.value1,
                  value2: req.body.matthiasValue2 || lastObject.matthias.value2,
                  value3: req.body.matthiasValue3 || lastObject.matthias.value3
                }
            };
            console.log(req.body)
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

router.get('/data/', function(req, res) {
    var name = req.params.name;
    var file = 'resources/data.json';

    jsonfile.readFile(file, function(err, obj) {
        res.send(obj);
    });
});

module.exports = router;
