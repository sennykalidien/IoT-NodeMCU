d3.json("/api/data", function(error, data) {
    var time = [];
    var sensor = ['Distance from laptop to me'];

    data.forEach(function(element, index) {
        time.push(element.time);
        sensor.push(element.input.distance);
    });

    var showResults = 30;
    var newArr = sensor.slice(Math.max(sensor.length - showResults, 1));
    var text = 'Distance from laptop in centimeter';

    newArr.unshift(text);

    console.log(newArr);

    var chart = c3.generate({
        data: {
            columns: [
                newArr
            ],
            xFormat: '%H:%M:%S'
        },
        axis: {
            x: {
                type: 'category',
                categories: time
            }

        }
    });
});
