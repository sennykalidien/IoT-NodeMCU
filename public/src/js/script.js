d3.json("/api/data", function(error, data) {
    var time = [];
    var sensor = ['sensor'];

    data.forEach(function(element, index) {
        time.push(element.time);
        sensor.push(element.input.distance);
        console.log(sensor);
    });

    var chart = c3.generate({
        data: {
            columns: [
                sensor
            ]
        },
        axis: {
            x: {
                type: 'category',
                categories: time
            }

        }
    });
});
