function createChoroplethMap() {
    var widthMap = document.getElementById("choropleth-map").offsetWidth;
    var heightMap = 400;

    var svgMap = d3.select("#choropleth-map")
        .html("") // Clear the existing map
        .append("svg")
        .attr("width", widthMap)
        .attr("height", heightMap);

    // Map and projection
    var path = d3.geoPath();
    var projection = d3.geoMercator()
        .scale(280) // Decreased scale for greater zoom out
        .translate([widthMap / 2, heightMap / 2])
        .center([110, 25]); // Adjusted center coordinates

    // Data and color scale
    var data = d3.map();
    var colorScale = d3.scaleThreshold()
      .domain([50000000, 5000000000, 50000000000])
      .range(d3.schemeBlues[3]);

    // Load external data and boot
    d3.queue()
      .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
      .defer(d3.csv, "data/gdp_per_capita_2020.csv", function(d) { data.set(d.country_code, +d.GDP_per_Capita); 
          console.log(d.country_code, +d.GDP_per_Capita); // Add this line to debug the data loading
      })
      .await(ready);

    function ready(error, topo) {

      // Draw the map
      svgMap.append("g")
        .selectAll("path")
        .data(topo.features)
        .enter()
        .append("path")
          // draw each country
          .attr("d", d3.geoPath()
            .projection(projection)
          )
          // set the color of each country
          .attr("fill", function (d) {
            d.total = data.get(d.id) || 0;
            return colorScale(d.total);
          });

      // Create a legend
      var legendColors = colorScale.range();
      var legendWidth = 50;
      var legendHeight = 20;

      // Define legend labels
      var legendLabels = ['50M', '5B', '50B'];

      var legend = svgMap.append("g")
          .attr("class", "legend")
          .attr("transform", "translate(5,360)");

      legend.selectAll("rect")
          .data(legendColors)
          .enter().append("rect")
          .attr("x", function(d, i) { return i * legendWidth; })
          .attr("y", 0)
          .attr("width", legendWidth)
          .attr("height", legendHeight)
          .style("fill", function(d) { return d; });

      // Adjust the x-coordinate calculation for text
      legend.selectAll("text")
          .data(legendLabels)
          .enter().append("text")
          .attr("x", function(d, i) { return i * legendWidth + legendWidth / 2; }) // Center the text within each rectangle
          .attr("y", legendHeight + 15)
          .style("text-anchor", "middle")
          .text(function(d) { return d; });

    }
}
