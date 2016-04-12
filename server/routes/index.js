var fs = require('fs'),
    express = require('express'),
    router = express.Router(),
    jsonfile = require('jsonfile'),
    moment = require('momentjs');

router.get('/', function(req, res, next) {
    fs.readFile('resources/data.json', 'utf8', function(err, data) {

        if (err) {
            res.status(404);
            next();
        }
        res.render('vis', {
            title: 'Home',
            description: ''
        });

    });
});

router.post('/api', function(req, res) {
    var file = 'resources/data.json',
        now = moment().format('YYYY-MM-DD HH:mm:ss');
        // value1 = req.body.value1,
        // value2 = req.body.value2;
        // newdata = {
        //     time: now,
        //     value1: value1,
        //     value2: value2
        // };
        console.log(req.body-parser)

    // jsonfile.readFile(file, function(err, obj) {
    //     obj.push(newdata);
    //     jsonfile.writeFileSync(file, obj);
    // });
    res.send('POST request to the api');
});

// router.get('/api/status', function(req, res) {
//     var file = 'resources/data.json';
//
//     jsonfile.readFile(file, function(err, obj) {
//           res.send(true);
//     });
//
// });


module.exports = router;
