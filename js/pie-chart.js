function createPieChart() {
    var margin = { top: 20, right: 20, bottom: 40, left: 60 };
    var width = document.getElementById("pie-chart").offsetWidth - margin.left - margin.right;
    var height = 240 - margin.top - margin.bottom;

    // Create an SVG element
    var svg = d3.select("#pie-chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Load data from JSON file
    d3.json('data/population.json', d => {
      d.Year = +d.Year;
      d.Population = +d.Population;

      return d;
    }).then(data => {
        var data = data.filter((d) => d.Year === 2020);

        // Extract unique country names from populationData
        const countries = Array.from(new Set(data.map(d => d.Country)));

        // Create D3 color scale
        const colorScale = d3.scaleOrdinal()
            .domain(countries)
            .range(d3.schemeTableau10);

        // Create a pie chart layout
        var pie = d3.pie()
            .value(function (d) { return d.Population; });

        // Generate the pie chart segments and bind the data
        var arcs = svg.selectAll("arc")
            .data(pie(data))
            .enter()
            .append("g")
            .attr("class", "arc");

        // Draw each arc segment
        arcs.append("path")
            .attr("d", d3.arc()
                .innerRadius(0)
                .outerRadius(Math.min(width, height) / 2 - 10)) // Adjusted outer radius to fit inside the card
            .attr("fill", function (d) { return colorScale(d.data.Country); });

        // Generate legend
        var legend = d3.select("#legend")
            .selectAll("div")
            .data(countries)
            .enter()
            .append("div")
            .attr("class", "legend-item");

        legend.append("div")
            .attr("class", "legend-color")
            .style("background-color", function (d) { return colorScale(d); });

        legend.append("div")
            .attr("class", "legend-label")
            .text(function (d) { return d; });
    }).catch(function(error) {
        // Handle errors if the JSON file fails to load
        console.error("Error loading the data: " + error);
    });
}
