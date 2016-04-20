d3.json("/api/data", function(error, data) {
    var time = [];
    var sennsor1 = ['sennsor1'];
    var sennsor2 = ['sennsor2'];

    data.forEach(function(element, index) {
        time.push(element.time);
        sennsor1.push(element.matthias.value1);
        sennsor2.push(element.matthias.value2);
    });

    var chart = c3.generate({
        data: {
            columns: [
                sennsor1,
                sennsor2
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
