(function(data) {

    var max = function(data, prop) {
        return d3.max(data, function(d) {
            return d[prop];
        });
    };

    var scaleLinear = function(values) {
        return d3.scale.linear()
            .domain([values.startDomain, values.endDomain])
            .range([values.startRange, values.endRange]);
    };

    var axis = function(prop, orient) {
        return d3.svg.axis()
            .scale(prop)
            .orient(orient);
    };

    // -----------------
    var createArea = function(values) {

        var area = d3.svg.area()
            .x(function(d) {
                return values.getX(d.x);
            })
            .y0(values.h)
            .y1(function(d) {
                return values.getY(d.y);
            });

        return area;
    };

    // ----------------------------------

    var renderArea = function(values) {

        var container = d3.select(values.container);

        var area = createArea({
            data: values.data,
            w: values.areaW,
            h: values.areaH,
            getX: values.getX,
            getY: values.getY
        });

        svg = container.append('svg')
            .attr('width', values.containerW)
            .attr('height', values.containerH)
            .attr('transform', 'translate(' + values.marginL + ',' + values.marginT + ')');

        svg.append('g')
            .append('path')
            .datum(values.data)
            .attr('class', 'area')
            .attr('d', area);

        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + values.areaH + ')')
            .call(axis(values.getX, 'bottom'));

        svg.append('g')
            .attr('class', 'y axis')
            .call(axis(values.getY, 'left'));
    };
    //-------------------------------------

    var margin = {
            top: 25,
            right: 20,
            bottom: 20,
            left: 90
        },
        width = 700 - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom;

    var x = scaleLinear({
        startDomain: 1,
        endDomain: max(data, 'x'),
        startRange: 1,
        endRange: 420
    });

    var y = scaleLinear({
        startDomain: 0,
        endDomain: max(data, 'y'),
        startRange: 250,
        endRange: 0
    });

    renderArea({
        data: data,
        container: '#container',
        containerW: width,
        containerH: height,
        marginL: margin.left,
        marginT: margin.top,
        areaW: 420,
        areaH: 250,
        getX: x,
        getY: y
    });

}([{
    x: 1,
    y: 2000
}, {
    x: 2,
    y: 1000
}, {
    x: 3,
    y: 1000
}, {
    x: 4,
    y: 1000
}, {
    x: 5,
    y: 1000
}, {
    x: 6,
    y: 250
}, {
    x: 7,
    y: 250
}, {
    x: 8,
    y: 1000
}, {
    x: 9,
    y: 1000
}, {
    x: 10,
    y: 1000
}, {
    x: 11,
    y: 1000
}, {
    x: 12,
    y: 2000
}]));
