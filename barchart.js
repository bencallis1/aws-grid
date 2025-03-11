
// Observable Plot bar chart script
document.addEventListener('DOMContentLoaded', () => {
  // Sample data for the bar chart
  const data = [
    {category: "AI Sessions", count: 35},
    {category: "Automation", count: 28},
    {category: "Data Mastery", count: 42},
    {category: "Visualization", count: 19},
    {category: "Reporting", count: 31}
  ];

  // Create the plot when DOM is loaded
  createBarChart(data);
});

function createBarChart(data) {
  // Get the container element
  const container = document.getElementById('plot-container');
  if (!container) return;

  // Import Observable Plot
  import('https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6.11/+esm')
    .then(Plot => {
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
    })
    .catch(error => {
      console.error('Error loading Observable Plot:', error);
      container.innerHTML = 'Error loading chart';
    });
}
