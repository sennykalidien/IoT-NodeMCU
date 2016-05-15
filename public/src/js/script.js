function outputUpdateChild(vol) {
    document.querySelector('#child-out').value = vol;
}

function outputUpdateAdult(vol) {
    document.querySelector('#adult-out').value = vol;
}

function outputUpdateGrandpa(vol) {
    document.querySelector('#grandpa-out').value = vol;
}

d3.json("/api/data", function(error, data) {
    var time = ['times'];
    var sensor = ['Distance from object to sensor'];
    var settingsRed = ['Settings for red LED'];
    var settingsGreen = ['Settings for green LED'];

    data.forEach(function(element, index) {
        time.push(element.time);
        sensor.push(element.input.distance);
        settingsRed.push(element.settings.red);
        settingsGreen.push(element.settings.green);
    });

    var showResults = 30;
    var newArr = sensor.slice(Math.max(sensor.length - showResults, 1));
    var text = 'Distance from object in sensor';
    var lastDistance  = sensor.slice(-1);
    var lastSettingsRed  = settingsRed.slice(-1);
    var lastSettingsGreen  = settingsGreen.slice(-1);

    console.log(lastSettingsRed);


    newArr.unshift(text);

    console.log(newArr);

    var mainchart = c3.generate({
        data: {
            x: 'times',
            xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                newArr,
                time
            ],
            type: 'area-step'
        },
        axis: {
            x: {
                type: 'timeseries',
                categories: time,
                tick: {
                    format: '%H:%M'
                }
            }
        },
        bindto: '#chart'
    });

    var chart = c3.generate({
        data: {
            // iris data from R
            columns: [
                ['distance', lastDistance]
            ],
            type : 'gauge'
        },
        gauge: {
        label: {
            format: function(value, ratio) {
                return value;
                },
                show: true // to turn off the min/max labels.
        },
            min: 0, // 0 is default, //can handle negative min e.g. vacuum
            max: 250, // 100 is default
            units: ' CM',
            width: 50 // for adjusting arc thickness
    },
    color: {
        pattern: ['#e74c3c', '#e74c3c', '#f1c40f', '#2ecc71'], // the three color levels for the percentage values.
        threshold: {
            unit: 'value',
            max: 250, // 100 is default
            values: [0, lastSettingsRed, lastSettingsGreen]
        }
    },
    bindto: '#pie'

    });

});
