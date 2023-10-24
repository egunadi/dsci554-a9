function createBigNumber() {
  // Fetch JSON data and update the Big Number Display card
  fetch('data/gdp_per_capita.json')
      .then(response => response.json())
      .then(data => {
        // Filter data for the year 2020
        const gdpData2020 = data.filter(item => item.Year === 2020);

        // Extract unique country names from populationData
        const countries = Array.from(new Set(gdpData2020.map(d => d.Country)));

        // Create D3 color scale
        const colorScale = d3.scaleOrdinal()
            .domain(countries)
            .range(d3.schemeTableau10);

        // Update the Big Number Display card with GDP per Capita for the year 2020
        let bigNumberCard = document.getElementById('big-number-card');

        gdpData2020.forEach((item, index) => {
            let displayNumber = document.createElement('p');
            displayNumber.classList.add('display-4');
            displayNumber.textContent = `$${item.GDP_per_Capita.toLocaleString()}`; // Format number with commas
            displayNumber.style.color = colorScale(item.Country); // Assign color based on the country
            let description = document.createElement('p');
            description.classList.add('card-text');
            description.textContent = `${item.Country}`;
            bigNumberCard.appendChild(description);            
            bigNumberCard.appendChild(displayNumber);
        });
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
}
