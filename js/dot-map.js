function createDotMap() {
    var widthMap = document.getElementById("dot-map").offsetWidth;
    var heightMap = 400;

    var svgMap = d3.select("#dot-map")
        .html("") // Clear the existing map
        .append("svg")
        .attr("width", widthMap)
        .attr("height", heightMap);

    // Define a projection centered on Asia with a decreased scale for more zoom out
    var projection = d3.geoMercator()
        .scale(300) // Decreased scale for greater zoom out
        .translate([widthMap / 2, heightMap / 2])
        .center([110, 25]); // Adjusted center coordinates

    var path = d3.geoPath().projection(projection);

    // Draw the world map with a class for styling
    d3.json("https://raw.githubusercontent.com/d3/d3.github.com/master/world-110m.v1.json").then(function (world) {
        svgMap.selectAll("path")
            .data(topojson.feature(world, world.objects.countries).features)
            .enter().append("path")
            .attr("d", path)
            .attr("class", "country")
            .style("fill", "rgba(0, 0, 0, 0.1)"); // Adjust the opacity as needed
    });

    const countries = ['Japan', 'Korea', 'Indonesia', 'China', 'Singapore'];

    // Define a color scale
    var colorScale = d3.scaleOrdinal()
        .domain(countries)
        .range(d3.schemeTableau10);

    var dotGroup = svgMap.append("g");

    // Load data from JSON file
    d3.json("data/cities.json").then(function(cities) {
        // Render dots for cities
        dotGroup.selectAll("circle")
            .data(cities.sort((a, b) => a.country === "Singapore" ? 1 : -1)) // Sort data so Singapore is processed last
            .enter()
            .append("circle")
            .attr("cx", function (d) { return projection([d.lng, d.lat])[0]; })
            .attr("cy", function (d) { return projection([d.lng, d.lat])[1]; })
            .attr("r", 5) // Adjust the radius of the dots as needed
            .attr("fill", function (d) { return colorScale(d.country); })
            .attr("stroke", "#fff")
            .attr("stroke-width", 1);
    }).catch(function(error) {
        // Handle errors if the JSON file fails to load
        console.error("Error loading the data: " + error);
    });
}
