function createBarChart() {
    const margin = { top: 20, right: 20, bottom: 40, left: 60 };
    const width = document.getElementById("bar-chart").offsetWidth - margin.left - margin.right;
    const height = 350 - margin.top - margin.bottom;

    // Select the chart container div
    const svg = d3.select("#bar-chart")
        .html("") // Clear the existing chart
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Load data from JSON file
    d3.json("data/gdp_per_capita.json").then(function(data) {
        // Sort data by Year in ascending order
        data.sort((a, b) => a.Year - b.Year);

        // Create scales for X and Y axes
        const xScale = d3.scaleBand()
            .domain(data.map(d => d.Year))
            .range([0, width])
            .padding(0.1); // Adjust the padding to control the gap between bars in a group

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.GDP_per_Capita)])
            .nice()
            .range([height, 0]);

        // Create X and Y axes
        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(xScale));

        svg.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(yScale).tickFormat(d3.format(".2s")));

        // Add X-axis title
        svg.append("text")
            .attr("class", "x-axis-title")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 10) // Adjust the y-position
            .style("text-anchor", "middle")
            .text("Year");

        // Add Y-axis title with padding
        svg.append("text")
            .attr("class", "y-axis-title")
            .attr("x", -height / 2)
            .attr("y", -margin.left + 15) // Adjust the y-position for padding
            .attr("transform", "rotate(-90)")
            .style("text-anchor", "middle")
            .text("GDP per Capita");

        // Create grouped bars
        const groups = svg.selectAll(".group")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "group")
            .attr("transform", d => `translate(${xScale(d.Year)},0)`);

        const countries = Array.from(new Set(data.map(d => d.Country))); // Get unique countries
        const barWidth = xScale.bandwidth() / countries.length; // Calculate bar width dynamically

        // Create D3 color scale
        const colorScale = d3.scaleOrdinal()
            .domain(countries)
            .range(d3.schemeTableau10);

        groups.selectAll("rect")
            .data((d) => {
                const countryData = countries.map(country => {
                    const dataPoint = data.find(item => item.Year === d.Year && item.Country === country);
                    return {
                        country: country,
                        GDP_per_Capita: dataPoint ? dataPoint.GDP_per_Capita : 0
                    };
                });
                return countryData;
            })
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * barWidth) // Adjust x-position based on index
            .attr("y", d => yScale(d.GDP_per_Capita))
            .attr("width", barWidth)
            .attr("height", d => height - yScale(d.GDP_per_Capita))
            .attr("fill", d => colorScale(d.country)); // Use the color scale for filling bars

        // Add legend using D3 color scale
        const legend = svg.append("g")
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
