let dataset = [{key: 0, x: 120, y: 10000},{key: 1, x: 30, y: 50},{key: 2, x: 40, y: 5},{key: 3, x: 20, y: 70},{key: 4, x: 350, y:15},{key: 5, x: 125, y: 35},{key: 6, x: 25, y: 8},{key: 7, x: 165, y: 50},{key: 8, x: 20, y: 80},{key: 9, x: 145, y: 100},{key: 10, x: 270, y: 5},{key: 11, x: 30, y: 300},{key: 12, x: 55, y: 10},{key: 14, x: 40, y: 450},{key: 15, x: 10, y: 5},{key: 16, x: 20, y: 66},{key: 17, x: 200, y: 16},{key: 18, x: 200, y: 100},{key: 19, x: 10, y: 200}]

let key = function(d){return d.key}

let svgWidth =  700
let svgHeight = 300
let padding = 40


let xScale = d3.scaleLinear()
                .domain([0, d3.max(dataset, function(d){return d.x})])
                .range([padding, svgWidth - padding])

let yScale = d3.scaleLinear()
                .domain([0, d3.max(dataset, function(d){return d.y})])
                .range([svgHeight - padding, padding])

let rScale = d3.scaleLinear()
                .domain([0, d3.max(dataset, function(d){return d.y})])
                .range([2, 5])

let maxRadius = rScale.range()[1]

//Functions

function handleMouseOver(event, d){
    d3.select(this)
        .transition("point")
        .ease(d3.easeCubicInOut)
        .duration(500)
        .attr("r", function(d){return rScale(d.y) * 2})

    d3.select("#tooltip")
        .style("left", `${event.pageX + 20}px`)
        .style("top", `${event.pageY - 10}px`)
        .transition("tooltip")
        .ease(d3.easeCubicInOut)
        .duration(500)
        .style("left", `${event.pageX + 8}px`)
        .style("top", `${event.pageY - 5}px`)
        .select("#value")
        .text(`${d.x}, ${d.y}`)

    d3.select("#tooltip").classed("hidden", false)
}

function handleMouseOut(event, d){
    d3.select(this)
        .transition("point")
        .ease(d3.easeCubicInOut)
        .duration(500)
        .attr("r", function(d){ return rScale(d.y)})
    
    d3.select("#tooltip").classed("hidden", true)
}

let svg = d3.select(".scatterplot-container")
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight)


svg.append("clipPath")
    .attr("id", "scatterplot-area")
    .append("rect")
    .attr("width", svgWidth - padding * 2 + maxRadius * 2)
    .attr("height", svgHeight - padding * 2 + maxRadius * 2)
    .attr("x", padding - maxRadius)
    .attr("y", padding - maxRadius)

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
                .attr("fill", "#001C55")
                // .attr("stroke", "black")
                .on("mouseover", handleMouseOver)
                .on("mouseout", handleMouseOut)


svg.append("g")
    .attr("class", "xAxis")
    .attr("transform", `translate(0, ${svgHeight - padding})`)
    .call(d3.axisBottom(xScale))

svg.append("g")
    .attr("class", "yAxis")
    .attr("transform", `translate(${padding}, 0)`)
    .call(d3.axisLeft(yScale))






d3.select("#update-data")
   .on("click", function(){
    dataset = [{key: 0, x: 10, y: 70},{key: 1, x: 300, y: 150},{key: 2, x: 140, y: 15},{key: 3, x: 200, y: 700},{key: 4, x: 35, y:150},{key: 5, x: 12, y: 350},{key: 6, x: 125, y: 80},{key: 7, x: 65, y: 150},{key: 8, x: 200, y: 800},{key: 9, x: 45, y: 10},{key: 10, x: 27, y: 50},{key: 11, x: 300, y: 300},{key: 12, x: 155, y: 110},{key: 14, x: 400, y: 45},{key: 15, x: 100, y: 500},{key: 16, x: 120, y: 660},{key: 17, x: 20, y: 160},{key: 18, x: 20, y: 1000},{key: 19, x: 1000, y: 1200}]

    key = function(d){return d.key}

    xScale.domain([0, d3.max(dataset, function(d){return d.x})])

    yScale.domain([0, d3.max(dataset, function(d){return d.y})])

    rScale.domain([0, d3.max(dataset, function(d){return d.y})])

    svg.selectAll("circle")
        .data(dataset, key)
        .transition("point")
        .ease(d3.easeCircle)
        .duration(700)
        .attr("cx", function(d){return xScale(d.x)})
        .attr("cy", function(d){return yScale(d.y)})
        .attr("r", function(d){return rScale(d.y)})
        .attr("fill", "#001C55")
        // .attr("stroke", "black")
        


        svg.select(".xAxis")
            .transition("xAxis")
            .ease(d3.easeCubicInOut)
            .duration(500)
            .call(d3.axisBottom(xScale))

        svg.select(".yAxis")
            .transition("yAxis")
            .ease(d3.easeCubicInOut)
            .duration(500)
            .call(d3.axisLeft(yScale))   


    })


d3.select("#add-points")
    .on("click", function(){
        dataset.push({key: 20, x: 1010, y: 170},{key: 21, x: 30, y: 1050},{key: 22, x: 14, y: 150},{key: 23, x: 1200, y: 1700},{key: 24, x: 350, y:15},{key: 25, x: 120, y: 1350},{key: 26, x: 1250, y: 800},{key: 27, x: 650, y: 1050},{key: 28, x: 200, y: 800},{key: 29, x: 1450, y: 1000})

        key = function(d){return d.key}

        xScale.domain([0, d3.max(dataset, function(d){return d.x})])

        yScale.domain([0, d3.max(dataset, function(d){return d.y})])

        rScale.domain([0, d3.max(dataset, function(d){return d.y})])

        points = svg.selectAll("circle")
                    .data(dataset, key)
                        
            
        points.transition("point")
            .ease(d3.easeCircle)
            .duration(700)
            .attr("cx", function(d){return xScale(d.x)})
            .attr("cy", function(d){return yScale(d.y)})
            .attr("r", function(d){return rScale(d.y)})
            .attr("fill", "#001C55")
            // .attr("stroke", "black")


        points.enter()
                .append("circle")
                .on("mouseover", handleMouseOver)
                .on("mouseout", handleMouseOut)
                .transition("point")
                .ease(d3.easeCircle)
                .duration(700)
                .attr("cx", function(d){return xScale(d.x)})
                .attr("cy", function(d){return yScale(d.y)})
                .attr("r", function(d){return rScale(d.y)})
                .attr("fill", "red")
                // .attr("stroke", "black")

        svg.select(".xAxis")
            .transition("xAxis")
            .ease(d3.easeCubicInOut)
            .duration(500)
            .call(d3.axisBottom(xScale))

        svg.select(".yAxis")
            .transition("yAxis")
            .ease(d3.easeCubicInOut)
            .duration(500)
            .call(d3.axisLeft(yScale)) 
                    
    })

    
d3.select("#remove-points")
    .on("click", function(){
        dataset.shift()

        key = function(d){return d.key}

        xScale.domain([0, d3.max(dataset, function(d){return d.x})])

        yScale.domain([0, d3.max(dataset, function(d){return d.y})])

        rScale.domain([0, d3.max(dataset, function(d){return d.y})])

        points = svg.selectAll("circle")
                    .data(dataset, key)
                    .on("mouseover", handleMouseOver)
                    .on("mouseout", handleMouseOut)

        points.transition("point")
                .ease(d3.easeCircle)
                .duration(700)
                .attr("cx", function(d){return xScale(d.x)})
                .attr("cy", function(d){return yScale(d.y)})
                .attr("r", function(d){return rScale(d.y)})
                .attr("fill", "#001C55")
                .attr("stroke", "black")
            
        points.exit()
                .transition("exit-points")
                .ease(d3.easeBounce)
                .duration(500)
                .attr("r", 0)
                .remove()

        svg.select(".xAxis")
            .transition("xAxis")
            .ease(d3.easeCubicInOut)
            .duration(500)
            .call(d3.axisBottom(xScale))

        svg.select(".yAxis")
            .transition("yAxis")
            .ease(d3.easeCubicInOut)
            .duration(500)
            .call(d3.axisLeft(yScale))


        
    })    
