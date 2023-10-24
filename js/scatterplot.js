function createScatterplot() {
    var marginBubble = { top: 20, right: 20, bottom: 40, left: 60 };
    var widthBubble = document.getElementById("scatterplot").offsetWidth - marginBubble.left - marginBubble.right;
    var heightBubble = 350 - marginBubble.top - marginBubble.bottom;

    var svgBubble = d3.select("#scatterplot")
        .html("") // Clear the existing chart
        .append("svg")
        .attr("width", widthBubble + marginBubble.left + marginBubble.right)
        .attr("height", heightBubble + marginBubble.top + marginBubble.bottom)
        .append("g")
        .attr("transform", "translate(" + marginBubble.left + "," + marginBubble.top + ")");

    // Load data from JSON file
    d3.json("data/population.json").then(function(populationData) {
        // Add padding to the X-axis scale
        var xScaleBubble = d3.scaleLinear()
            .domain([1970, 2020]) // Set the year range with padding
            .range([0, widthBubble]);

        var yScaleBubble = d3.scaleLinear()
            .domain([0, d3.max(populationData, function (d) { return d.Population; }) * 1.5])
            .range([heightBubble, 0]);

        // Define the tick values for the X-axis
        var xAxisTicks = [1970, 1980, 1990, 2000, 2010, 2020];

        // Add X and Y axes
        svgBubble.append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + heightBubble + ")")
            .call(d3.axisBottom(xScaleBubble).tickValues(xAxisTicks).tickFormat(d3.format("d"))); // Format X-axis as years

        svgBubble.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(yScaleBubble).tickFormat(d3.format(".2s")));

        var circles = svgBubble.selectAll("circle")
            .data(populationData)
            .enter()
            .append("circle");

        // Extract unique country names from populationData
        const countries = Array.from(new Set(populationData.map(d => d.Country)));

        // Create D3 color scale
        const colorScale = d3.scaleOrdinal()
            .domain(countries)
            .range(d3.schemeTableau10);

        circles.attr("cx", function (d) { return xScaleBubble(d.Year); })
            .attr("cy", function (d) { return yScaleBubble(d.Population); })
            .attr("r", 1.5) // Adjust the radius as needed
            .style("fill", d => colorScale(d.Country)); // Circle color based on data

        // Add X-axis title
        svgBubble.append("text")
            .attr("class", "x-axis-title")
            .attr("x", widthBubble / 2)
            .attr("y", heightBubble + marginBubble.bottom - 5) // Adjust the y-position
            .style("text-anchor", "middle")
            .text("Year");

        // Add Y-axis title with padding
        svgBubble.append("text")
            .attr("class", "y-axis-title")
            .attr("x", -heightBubble / 2)
            .attr("y", -marginBubble.left + 15) // Adjust the y-position for padding
            .attr("transform", "rotate(-90)")
            .style("text-anchor", "middle")
            .text("Population");

        // Add legend using D3 color scale
        const legend = svgBubble.append("g")
            .attr("class", "legend")
            .attr("transform", `translate(10, 10)`); // Adjust the translation values

        const legendItems = legend.selectAll(".legend-item")
            .data(countries)
            .enter()
            .append("g")
            .attr("class", "legend-item")
            .attr("transform", (d, i) => `translate(0, ${i * 25})`); // Adjust the spacing between legend items

        legendItems.append("rect")
            .attr("width", 20)
            .attr("height", 20)
            .attr("fill", d => colorScale(d)); // Use the color scale for legend items

        legendItems.append("text")
            .attr("x", 30)
            .attr("y", 10)
            .text(d => d);
    }).catch(function(error) {
        // Handle errors if the JSON file fails to load
        console.error("Error loading the data: " + error);
    });
}
