// Observable Plot bar chart script
import * as Plot from '@observablehq/plot';

export function initBarChart() {
  // Sample data for the bar chart
  const data = [
    {category: "AI Sessions", count: 35},
    {category: "Automation", count: 28},
    {category: "Data Mastery", count: 42},
    {category: "Visualization", count: 19},
    {category: "Reporting", count: 31}
  ];

  // Create the plot
  createBarChart(data);
}

function createBarChart(data) {
  // Get the container element
  const container = document.getElementById('plot-container');
  if (!container) return;

  try {
    // Create the bar chart
    const chart = Plot.plot({
      style: {
        background: "transparent",
        color: "white",
        fontFamily: "'Open Sans', sans-serif"
      },
      marginLeft: 60,
      marginBottom: 40,
      x: {
        label: "",
        tickFormat: d => d
      },
      y: {
        label: "↑ Attendees",
        labelAnchor: "top",
        grid: true,
        tickFormat: d => d
      },
      marks: [
        Plot.barY(data, {
          x: "category",
          y: "count",
          fill: "white",
          stroke: "transparent"
        }),
        Plot.ruleY([0])
      ]
    });
    
    // Clear and append the chart
    container.innerHTML = '';
    container.appendChild(chart);
  } catch (error) {
    console.error('Error creating chart:', error);
    container.innerHTML = 'Error creating chart';
  }
}

