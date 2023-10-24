function createProportionalSymbolMap() {
    var widthMap = document.getElementById("proportional-symbol-map").offsetWidth;
    var heightMap = 400;

    var svgMap = d3.select("#proportional-symbol-map")
        .html("") // Clear the existing map
        .append("svg")
        .attr("width", widthMap)
        .attr("height", heightMap);

    // Define a projection centered on Japan and Korea
    var projection = d3.geoMercator()
        .scale(400) // Adjust the scale as needed
        .translate([widthMap / 2, heightMap / 2])
        .center([137, 37]) // Center coordinates for Japan

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

    // Add bubbles to the map
    var bubbleData = [{"Country":"Japan","radius":35.3899365639,"lat":36.2048,"lon":138.2529},{"Country":"Korea","radius":22.7694290662,"lat":35.9078,"lon":127.7669}];

    var bubbleGroup = svgMap.append("g");

    bubbleGroup.selectAll("circle")
        .data(bubbleData)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return projection([d.lon, d.lat])[0]; })
        .attr("cy", function (d) { return projection([d.lon, d.lat])[1]; })
        .attr("r", function (d) { return d.radius; })
        .attr("fill", function (d) { return (d.Country === "Japan") ? "steelblue" : "orange"; })
        .attr("stroke", "#fff")
        .attr("stroke-width", 2);
}
