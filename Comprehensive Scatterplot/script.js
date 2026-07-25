let dataset = [{key: 0, x: 120, y: 700},{key: 1, x: 30, y: 50},{key: 2, x: 40, y: 5},{key: 3, x: 20, y: 70},{key: 4, x: 350, y:15},{key: 5, x: 125, y: 35},{key: 6, x: 25, y: 8},{key: 7, x: 165, y: 50},{key: 8, x: 20, y: 80},{key: 9, x: 145, y: 100},{key: 10, x: 270, y: 5},{key: 11, x: 30, y: 300},{key: 12, x: 55, y: 10},{key: 14, x: 40, y: 450},{key: 15, x: 10, y: 5},{key: 16, x: 20, y: 66},{key: 17, x: 200, y: 16},{key: 18, x: 200, y: 100},{key: 19, x: 10, y: 200}]

let key = function(d){return d.key}

let svgWidth =  550
let svgHeight = 300
let padding = 30

let xScale = d3.scaleLinear()
                .domain([0, d3.max(dataset, function(d){return d.x})])
                .range([padding, svgWidth - padding])

let yScale = d3.scaleLinear()
                .domain([0, d3.max(dataset, function(d){return d.y})])
                .range([svgHeight - padding, padding])

let rScale = d3.scaleLinear()
                .domain([0, d3.max(dataset, function(d){return d.y})])
                .range([2, 5])

let svg = d3.select(".scatterplot-container")
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight)


svg.append("clipPath")
    .attr("id", "scatterplot-area")
    .append("rect")
    .attr("width", svgWidth -padding * 3)
    .attr("height", svgHeight -padding * 2)
    .attr("x", padding)
    .attr("y", padding)

let points = svg.append("g")
                .attr("id", "circle")
                .attr("clip-path", "url(#scatterplot-area)")
                .selectAll("circle")
                .data(dataset, key)
                .enter()
                .append("circle")
                .attr("cx", function(d){return xScale(d.x)})
                .attr("cy", function(d){return yScale(d.y)})
                .attr("r", function(d){return rScale(d.y)})
                .append("title")
                .text(function(d){return `${d.x},${d.y}`})

// let annotations = svg.append("g")
//                      .attr("id", "text")
//                      .attr("clip-path", "url(#scatterplot-area)")
//                      .selectAll("text")
//                      .data(dataset)
//                      .enter()
//                      .append("text")
//                      .text(function(d){return `(${d.x}, ${d.y})`})
//                      .attr("x", function(d){return xScale(d.x)})
//                      .attr("y", function(d){return yScale(d.y)})

svg.append("g")
    .attr("class", "xAxis")
    .attr("transform", `translate(0, ${svgHeight - padding})`)
    .call(d3.axisBottom(xScale))

svg.append("g")
    .attr("class", "yAxis")
    .attr("transform", `translate(${padding}, 0)`)
    .call(d3.axisLeft(yScale))

                        
