var fs = require('fs'),
    express = require('express'),
    router = express.Router(),
    jsonfile = require('jsonfile'),
    moment = require('momentjs');

router.get('/', function(req, res, next) {
  jsonfile.readFile('resources/data.json', function(err, obj) {
    if (err) {
        res.status(404);
        next();
    }
    var objLenght = obj.length - 1,
        objLast = obj[objLenght];

    res.render('vis', {
        title: 'Home',
        description: 'hoihiohoi',
        data: objLast
    });
  });

});

module.exports = router;
