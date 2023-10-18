# DSCI 554 Assignment: Evaluate and Create Dashboards _with Color Scales and Maps_

## Description

### Objective

In this assignment you will update your previous assignment (Evaluate and Create Dashboards _with Color Scales_: a simple dashboard to present information for five countries using UN data of your choice) to use **D3 color scales and maps**. The repository includes a `package.json` initialized with `npm init`.

## Country Data Dashboard

### Dataset: United Nations data of your choice

1. **Data Collection**
   - Select data of your choice for five countries to use for the dashboard
   - Research dashboards on a similar topic and data
   - Download or fetch the necessary datasets

2. **Dashboard Design**

   **The wireframe design is for the entire dashboard, not just the charts! Dashboard design should include "big numbers", grid layout and other elements that are usually associated with dashboards!**

   - Define who is the user and create user stories for the use cases you will implement
   - Create a wireframe of the design with an SVG tool
   - Improve the design with features from dashboards on a similar topic and data
   - Discuss your design choices (e.g., KPIs, layout, color scheme, **color scales**, **dot map, choropleth map and proportional symbol map** visualizations...)
   - Use the visualization wheel to evaluate your design
   - Include at least a table, a bar chart, a scatterplot, a line chart, a pie or donut chart, **and a dot map, a choropleth map and a proportional symbol map**.
   - Apply appropriate visual encoding techniques to enhance information communication.

3. **Dashboard Implementation**
   - Using **D3 and Bootstrap** implement the screens of your dashboard as individual pages, using `index.html` as the home page.
   - Use separate JavaScript files for the graphics you create
   - Implement using D3 data join at least a table, a bar chart, a scatterplot, a line chart, a pie or donut chart, **and a dot map, a choropleth map and a proportional symbol map**.
   - Use D3 axes, with well formatted tick mark labels, axis labels and title.
   - Use **D3 color scales and legends as appropriate**
   - Load data in JSON or CSV format
   - Use Bootstrap to customize the page according to your design

## Submission

- Document your dashboard design and important implementation details in a Google Slide presentation.
- Provide a link to the Google Slide in `README.md`
- Include *all* the source design files (wireframe, color palette, etc.) in the submission.
- Ensure that the dashboard is functional and displays correctly in Google Chrome and that there are no errors in DevTools.

## Rubrics

|               | **Design**              | **Implementation** |
| ------------- | ----------------------- | ----------------------- |
| **Sophisticated** | Well-designed dashboard with clear user stories containing features from similar dashboards on same topic/data (4-5 pts) | Well-implemented dashboard, using well vanilla JavaScript and Bootstrap for all screens, separate files for each graphic, implemented using D3 data join at least a table, a bar chart, a scatterplot, a line chart, a pie or donut chart, **and a dot map, a choropleth map and a proportional symbol map**. Using D3 axes with well formatted tick mark labels, axis labels and title. D3 color scales are well used and legends are well formatted. Maps are well formatted and using appropriate projections. (4-5 pts) |
| **Competent** | Adequate design with some room for improvement or refinement. (2-3 pts) | Adequately implemented dashboard with some room for improvement or refinement. (2-3 pts) |
| **Needs work** | Basic design with significant deficiencies. (0-1 pts) | Basic dashboard implementation with significant deficiencies. (0-1 pts) |

## Homework Guidelines

- Homework repository must be updated before the deadline
- Commits after the deadline will not be considered unless requested
- Late policy: 10% of total available points per each late day; duration less than 24 hours counts as one whole day
- Homework is expected to work in Chrome
