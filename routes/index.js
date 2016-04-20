var fs = require('fs'),
    express = require('express'),
    router = express.Router(),
    jsonfile = require('jsonfile'),
    moment = require('momentjs'),
    getLastObject = require('../methods/methods.js');

router.get('/', function(req, res, next) {
  jsonfile.readFile('resources/data.json', function(err, obj) {
    if (err) {
        res.status(404);
        next();
    }

    res.render('leds', {
        title: 'Status leds',
        description: 'On this page you can see the status of the leds',
        data: getLastObject(obj)
    });
  });
});
router.get('/sensors', function(req, res, next) {
  jsonfile.readFile('resources/data.json', function(err, obj) {
    if (err) {
        res.status(404);
        next();
    }

    res.render('sensors', {
        title: 'Data from sensors',
        description: 'Show the data from the sensors',
        data: getLastObject(obj)
    });
  });
});

module.exports = router;
