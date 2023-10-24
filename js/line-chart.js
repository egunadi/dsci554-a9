function createLineChart() {
    var marginLine = { top: 20, right: 20, bottom: 40, left: 60 };
    var widthLine = document.getElementById("line-chart").offsetWidth - marginLine.left - marginLine.right;
    var heightLine = 350 - marginLine.top - marginLine.bottom;

    var svgLine = d3.select("#line-chart")
        .html("") // Clear the existing chart
        .append("svg")
        .attr("width", widthLine + marginLine.left + marginLine.right)
        .attr("height", heightLine + marginLine.top + marginLine.bottom)
        .append("g")
        .attr("transform", "translate(" + marginLine.left + "," + marginLine.top + ")");

    // Load data from JSON file
    d3.json("data/gdp.json").then(function(gdpData) {
        var countriesData = d3.nest()
            .key(function(d) { return d.Country; })
            .entries(gdpData);

        var xScaleLine = d3.scaleLinear()
            .domain([1970, 2020])
            .range([0, widthLine]);

        var yScaleLine = d3.scaleLinear()
            .domain([0, d3.max(gdpData, function(d) { return d.GDP; }) * 1.5])
            .range([heightLine, 0]);

        var line = d3.line()
            .x(function(d) { return xScaleLine(d.Year); })
            .y(function(d) { return yScaleLine(d.GDP); });

        // Extract unique country names from gdpData
        const countries = Array.from(new Set(gdpData.map(d => d.Country)));

        // Create D3 color scale
        const colorScale = d3.scaleOrdinal()
            .domain(countries)
            .range(d3.schemeTableau10);

        svgLine.selectAll(".line")
            .data(countriesData)
            .enter().append("path")
            .attr("class", "line")
            .style("fill", "none")
            .attr("d", function(d) { return line(d.values); })
            .style("stroke", function(d) {
                // Set stroke color based on country using the color scale
                return colorScale(d.key);
            });

        svgLine.append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + heightLine + ")")
            .call(d3.axisBottom(xScaleLine).tickFormat(d3.format("d")));

        svgLine.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(yScaleLine).tickFormat(d3.format(".2s")));

        svgLine.append("text")
            .attr("class", "x-axis-title")
            .attr("x", widthLine / 2)
            .attr("y", heightLine + marginLine.bottom - 5)
            .style("text-anchor", "middle")
            .text("Year");

        svgLine.append("text")
            .attr("class", "y-axis-title")
            .attr("x", -heightLine / 2)
            .attr("y", -marginLine.left + 15)
            .attr("transform", "rotate(-90)")
            .style("text-anchor", "middle")
            .text("GDP");

        const legend = svgLine.append("g")
            .attr("transform", `translate(10, 10)`);

        // Create legend items based on color scale
        const legendItems = legend.selectAll(".legend-item")
            .data(countries)
            .enter()
            .append("g")
            .attr("class", "legend-item")
            .attr("transform", (d, i) => `translate(0, ${i * 25})`);

        legendItems.append("rect")
            .attr("width", 20)
            .attr("height", 20)
            .attr("fill", d => colorScale(d));

        legendItems.append("text")
            .attr("x", 30)
            .attr("y", 10)
            .text(d => d);
    }).catch(function(error) {
        // Handle errors if the JSON file fails to load
        console.error("Error loading the data: " + error);
    });
}
