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
        var lastObject = getLastObject(obj);

        console.log(req.body);
        var lisa = req.body.lisa || lastObject.lisa,
            senny = req.body.senny || lastObject.senny,
            matthias = req.body.matthias || lastObject.matthias,
            newdata = {
                time: now,
                lisa: lisa,
                senny: senny,
                matthias: matthias
            };

        obj.push(newdata);
        jsonfile.writeFileSync(file, obj);
        // res.send('hoi');
        res.redirect('/');
    });
});

router.get('/status/:name', function(req, res) {
    var name = req.params.name;
    var file = 'resources/data.json';

    jsonfile.readFile(file, function(err, obj) {
        res.send('{"light":"' + getLastObject(obj)[name]+ '"}');
    });
});

module.exports = router;
