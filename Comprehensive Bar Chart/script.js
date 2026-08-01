let dataset = [{key:0 ,value: 25}, {key:1 ,value: 10},{key:2 ,value: 45},{key:3 ,value: 30},{key:4 ,value: 25},{key:5 ,value: 50},{key:6 ,value: 5},{key:7 ,value: 15}, {key:8 ,value: 55},{key:9 ,value: 45}]

let key = function(d){return d.key}

let svgWidth = 600
let svgHeight = 250
let padding = 30

let xScale = d3.scaleBand()
                .domain(d3.range(dataset.length))
                .range([padding, svgWidth - padding])
                .paddingInner(0.05)

let yScale = d3.scaleLinear()
                .domain([0, d3.max(dataset, function(d){return d.value})])
                .range([svgHeight - padding, padding])

function handleMouseover(event, d){

    d3.select("#tooltip")
        .style("left", `${event.pageX - 10}px`)
        .style("top", `${event.pageY - 25}px`)
        .select("#value")
        .text(d.value)
    
        d3.select("#tooltip").classed("hidden", false)
}

function handleMouseout(){
    d3.select("#tooltip").classed("hidden", true)
}

let svg = d3.select(".bar-chart-container")
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight)

let bars = svg.selectAll("rect")
                .data(dataset, key)
                .enter()
                .append("rect")
                .on("mouseover", handleMouseover)
                .on("mouseout", handleMouseout)

bars.attr("width", xScale.bandwidth())
    .attr("x", function(d, i){return xScale(i)})
    .attr("y", svgHeight - padding)
    .transition("bar")
    // .delay(function(d, i){return xScale(i) * 2})
    .duration(1500)
    .attr("height", function(d){return svgHeight - padding - yScale(d.value)})
    .attr("y", function(d){return yScale(d.value)})
    .attr("fill", function(d){return `rgb(0, 0, ${d.value * 5})`})

svg.append("g")
    .attr("class", "xAxis")
    .attr("transform", `translate(0, ${svgHeight-padding})`)
    .call(d3.axisBottom(xScale))

svg.append("g")
    .attr("class", "yAxis")
    .attr("transform", `translate(${padding}, 0)`)
    .call(d3.axisLeft(yScale))


d3.select(".update-dataset")
    .on("click", function(){
        dataset = [{key:0 ,value: 5}, {key:1 ,value: 10}, {key:2 ,value: 15}, {key:3 ,value: 20}, {key:4 ,value: 25}, {key:5 ,value: 30}, {key:6 ,value: 35}, {key:7 ,value: 40}, {key:8 ,value: 45}, {key:9 ,value: 50}]

        key = function(d){return d.key}

        xScale.domain(d3.range(dataset.length))

        yScale.domain([0, d3.max(dataset, function(d){return d.value})])

        bars = svg.selectAll("rect")
                    .data(dataset, key)
                    
        bars.transition("bar")
            .delay(function(d, i){return xScale(i) * 5})
            .duration(1500)
            .attr("width", xScale.bandwidth())
            .attr("x", function(d, i){return xScale(i)})
            .attr("height", function(d){return svgHeight - padding - yScale(d.value)})
            .attr("y", function(d){return yScale(d.value)})
        
        svg.select(".yAxis")
            .transition()
            .duration(500)
            .call(d3.axisLeft(yScale))
    })


d3.select(".add-bars")
    .on("click", function(){
        dataset.push({key: 11,value: 15}, {key: 12,value: 20}, {key: 12,value: 10}, {key: 13,value: 90}, {key: 14,value: 150}, {key: 15,value: 120})

        key = function(d){return d.key}

        xScale.domain(d3.range(dataset.length))

        yScale.domain([0, d3.max(dataset, function(d){return d.value})])

        bars = svg.selectAll("rect")
                    .data(dataset)
        
        bars.transition("bar")
            // .delay(function(d, i){return xScale(i) * 2})
            .duration(1500)
            .attr("width", xScale.bandwidth())
            .attr("height", function(d){return svgHeight - padding - yScale(d.value)})
            .attr("x", function(d, i){return xScale(i)})
            .attr("y", function(d){return yScale(d.value)})
            
        
        bars.enter()
            .append("rect")
            .on("mouseover", handleMouseover)
            .on("mouseout", handleMouseout)
            .attr("width", xScale.bandwidth())
            .attr("x", function(d, i){return xScale(i)})
            .attr("y", svgHeight - padding)
            .transition("bar")
            .delay(function(d, i){return xScale(i) * 2})
            .duration(1500)
            .attr("height", function(d){return svgHeight - padding - yScale(d.value)})            
            .attr("y", function(d){return yScale(d.value)})
            .attr("fill", function(d){return `rgb(0, 0, ${d.value * 5})`})

        svg.select(".xAxis")
            .transition("xAxis")
            .duration(500)
            .call(d3.axisBottom(xScale))

        svg.select(".yAxis")
            .transition("yAxis")
            .duration(500)
            .call(d3.axisLeft(yScale))

    })

d3.select(".remove-bars")
    .on("click", function(){
        dataset.shift()

        xScale.domain(d3.range(dataset.length))

        yScale.domain([0, d3.max(dataset,function(d){return d.value})])

        bars = svg.selectAll("rect")
                    .data(dataset, key)
                    .on("mouseover", handleMouseover)
                    .on("mouseout", handleMouseout)

        bars.transition("bar")
            .delay(function(d,i){return xScale(i) * 2})
            .duration(500)
            .attr("width", xScale.bandwidth())
            .attr("height", function(d){return svgHeight - padding - yScale(d.value)})
            .attr("x", function(d, i){return xScale(i)})
            .attr("y", function(d){return yScale(d.value)})
            .attr("fill", function(d){return `rgb(0, 0, ${d.value * 4})`})

        bars.exit()
            // .attr("y", function(d){return yScale(d.value)})
            .transition("bar")
            .duration(500)
            .attr("x", -svgWidth)
            .remove()

        svg.select(".xAxis")
            .transition("xAxis")
            .duration(500)
            .call(d3.axisBottom(xScale))

        svg.select(".yAxis")
            .transition("yAxis")
            .duration(500)
            .call(d3.axisLeft(yScale))
    })