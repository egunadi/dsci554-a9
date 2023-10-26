function createChoroplethMap() {
    var widthMap = document.getElementById("choropleth-map").offsetWidth;
    var heightMap = 400;

    var svgMap = d3.select("#choropleth-map")
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

    // Load your data for the choropleth map
    var data = [
        {"Country": "Japan", "Population": 125244.761},
        {"Country": "Korea", "Population": 51844.69},
        {"Country": "Indonesia", "Population": 271857.97},
        {"Country": "China", "Population": 1424929.781},
        {"Country": "Singapore", "Population": 5909.869}
    ];

    // Define a color scale based on your data values
    var colorScale = d3.scaleSequential(d3.interpolateBlues) // You can choose a different color scale
        .domain([0, d3.max(data, function(d) { return d.Population; })]);

    var countryMapping = {
        "JPN": "Japan",
        "KOR": "Korea", // Corrected the name from "South Korea" to match GeoJSON data
        "IDN": "Indonesia",
        "CHN": "China",
        "SGP": "Singapore"
    };

    // Load your data for the choropleth map
    d3.json("https://raw.githubusercontent.com/d3/d3.github.com/master/world-110m.v1.json").then(function (world) {
        // Log country names from the GeoJSON data
        console.log("GeoJSON Countries:", topojson.feature(world, world.objects.countries).features.map(d => d.properties.name));
        // Draw the world map with choropleth coloring
        svgMap.selectAll("path")
            .data(topojson.feature(world, world.objects.countries).features)
            .enter().append("path")
            .attr("d", path)
            .attr("class", "country")
            .style("fill", function(d) {
                // Lookup the data value for the current country
                var countryData = data.find(function(country) {
                    return countryMapping[d.id] === country.Country; // Standardize the name for comparison
                });
                // Use the color scale to determine the fill color
                return countryData ? colorScale(countryData.Population) : "lightgray"; // Default color for missing data
            });
    }).catch(function(error) {
        console.error("Error loading world data:", error); // Log any errors during world data loading
    });
}
