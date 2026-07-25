let datasetA =   [
                    [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
                    [410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
                ];

let svgWidthA = 600
let svgHeightA = 200
let paddingA = 30

let xScaleA = d3.scaleLinear()
                .domain([0, d3.max(datasetA, function(d){
                    return d[0]
                })])
                .range([paddingA, svgWidthA - paddingA])


let yScaleA = d3.scaleLinear()
                .domain([0, d3.max(datasetA, function(d){
                    return d[1]
                })])
                .range([svgHeightA - paddingA, paddingA])

let rScale = d3.scaleLinear()
                .domain([0, d3.max(datasetA, function(d){
                    return d[1]
                })])
                .range([2, 5])

let svgA = d3.select(".scatterplot-container")
                .append("svg")
                .attr("width", svgWidthA)
                .attr("height", svgHeightA)

let points = svgA.selectAll("circle")
                .data(datasetA).enter()
                .append("circle")
                .attr("cx", function(d){
                    return xScaleA(d[0])
                })
                .attr("cy", function(d){
                    return yScaleA(d[1])
                })
                .attr("r", function(d){
                    return rScale(d[1])
                })
                .attr("fill", function(d){
                    return `rgb(0, 0, ${d * 4})`
                })

let xAxisA = d3.axisBottom(xScaleA)

svgA.append("g")
    .attr("transform", `translate(0, ${svgHeightA-paddingA})`)
    .attr("class", "xAxis")
    .call(xAxisA)

let yAxisA = d3.axisLeft(yScaleA)

svgA.append("g")
.attr("transform", `translate(${paddingA}, 0)`)
.attr("class", "yAxis")
.call(yAxisA)

function updateDataA(){
    let numValues = datasetA.length
    datasetA = []
    for(let i = 0; i < numValues; i++){
        let xValue = Math.floor(Math.random() * 200)
        let yValue = Math.floor(Math.random() * 200)
        datasetA.push([xValue, yValue])
    }

    xScaleA.domain([0, d3.max(datasetA, function(d){
            return d[0]
        })])
        .range([paddingA, svgWidthA - paddingA])

    yScaleA.domain([0, d3.max(datasetA, function(d){
            return d[1]
        })])
        .range([svgHeightA - paddingA, paddingA])

    rScale.domain([0, d3.max(datasetA, function(d){
            return d[1]
        })])
        .range([2, 5])

    svgA.selectAll("circle")
        .data(datasetA)
        .transition()
        .delay(function(d, i){
            return i/datasetA.length * 1000
        })
        .ease(d3.easeBounce)
        .duration(1000)
        .attr("cx", function(d){
            return xScaleA(d[0])
        })
        .attr("cy", function(d){
            return yScaleA(d[1])
        })
        .attr("r", function(d){
            return rScale(d[1])
        })
        .attr("fill", function(d){
                    return `rgb(0, 0, ${d[1] * 6})`
                })

    svgA.select(".xAxis")
        .call(d3.axisBottom(xScaleA))

    svgA.select(".yAxis")
        .call(d3.axisLeft(yScaleA))
        
}

setInterval(() => {
    updateDataA()
}, 2000)