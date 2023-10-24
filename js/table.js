// Create the table
function createTable() {
    // Select the table container
    var tableContainer = d3.select("#table-container");

    // Create the table structure
    var table = tableContainer.append("table").attr("class", "table table-striped table-custom");
    var thead = table.append("thead");
    var tbody = table.append("tbody");

    // Append table header
    thead.append("tr")
        .selectAll("th")
        .data(["Attrib", "Year", "Japan", "Korea", "Indonesia", "China", "Singapore"])
        .enter()
        .append("th")
        .text(function (column) { return column; });

    // Load data from JSON file
    d3.json("data/statistics.json").then(function(statisticsData) {
        // Append table rows with data
        var rows = tbody.selectAll("tr")
            .data(statisticsData)
            .enter()
            .append("tr");

        // Append data cells within rows
        var cells = rows.selectAll("td")
            .data(function (row) {
                return ["Attrib", "Year", "Japan", "Korea", "Indonesia", "China", "Singapore"].map(function (column) {
                    return { column: column, value: row[column] };
                });
            })
            .enter()
            .append("td")
            .text(function (d) { return d.value; });
    }).catch(function(error) {
        // Handle errors if the JSON file fails to load
        console.error("Error loading the data: " + error);
    });
}
