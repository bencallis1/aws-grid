
 function generateMonochromaticColors(baseColor, count = 1) {
  // Input validation
  let colorToUse = baseColor;
  if (Array.isArray(baseColor)) {
    colorToUse = baseColor[0] || '#4B56D2';
  }
  
  // Ensure we have a valid hex color
  if (typeof colorToUse !== 'string' || !colorToUse.startsWith('#')) {
    colorToUse = '#4B56D2'; // Default color if invalid input
  }

  // Convert hex to RGB
  const hex = colorToUse.replace('#', '');
  let r = parseInt(hex.substring(0, 2), 16) / 255;
  let g = parseInt(hex.substring(2, 4), 16) / 255;
  let b = parseInt(hex.substring(4, 6), 16) / 255;

  // Convert RGB to HSL
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  // Convert h to degrees
  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);
  
  // Generate monochromatic colors by varying lightness only
  const colors = [];
  const lightnessRange = 70; // Range of lightness to span
  
  // Adjust starting lightness based on the base color's lightness
  let startLightness = Math.max(10, l - lightnessRange / 2);
  if (startLightness + lightnessRange > 90) {
    startLightness = 90 - lightnessRange;
  }
  
  for (let i = 0; i < count; i++) {
    // Space the lightness values evenly across the range
    const lightness = startLightness + (lightnessRange * i / (count - 1 || 1));
    colors.push(`hsl(${h}, ${s}%, ${lightness}%)`);
  }
  
  return colors;
}

// Helper function to generate contrasting colors
function generateContrastingColors(baseColor, count = 1) {
  // Handle array input
  let colorToUse = baseColor;
  if (Array.isArray(baseColor)) {
    colorToUse = baseColor[0] || '#4B56D2';
  }
  
  // Ensure we have a valid hex color
  if (typeof colorToUse !== 'string' || !colorToUse.startsWith('#')) {
    colorToUse = '#4B56D2'; // Default color if invalid input
  }

  // Convert hex to RGB
  const hex = colorToUse.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  // Calculate perceived brightness
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Generate contrasting colors
  const colors = [];
  for (let i = 0; i < count; i++) {
    // Simple HSL-based color generation with spread hues
    const hue = (360 / count) * i;
    const lightness = brightness < 0.5 ? 70 : 30; // Opposite of background brightness
    colors.push(`hsl(${hue}, 70%, ${lightness}%)`);
  }
  
  return colors;
}

// Helper function to darken a hex color
export function darkenColor(hex, amount = 0.2) {
    // Remove the # if present
    hex = hex.replace('#', '');
    
    // Convert hex to RGB
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    
    // Darken each component
    r = Math.max(0, Math.floor(r * (1 - amount)));
    g = Math.max(0, Math.floor(g * (1 - amount)));
    b = Math.max(0, Math.floor(b * (1 - amount)));
    
    // Convert back to hex
    const toHex = n => {
        const hex = n.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Register Chart.js plugins
if (window.Chart && window.ChartDataLabels) {
  Chart.register(ChartDataLabels);
}

// Chart instances to manage updates
let barChart, pieChart, lineChart;

// Common chart options for better sizing
const commonChartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  layout: {
    padding: {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    }
  },
  plugins: {
    legend: {
      display: true,
      position: 'top',
      align: 'center',
      labels: {
        boxWidth: 12,
        padding: 10,
        font: {
          size: 12
        }
      }
    },
    title: {
      display: false
    },
    tooltip: {
      enabled: true,
      mode: 'index',
      intersect: false,
      padding: 10,
      titleFont: {
        size: 12
      },
      bodyFont: {
        size: 12
      }
    }
  }
};


export function createBarChart(baseColor = '#4B56D2', canvasId, data) {
  // const data = [
  //   {session: "NBA's Domo Journey to AI", registrants: 478},
  //   {session: "Connections & Integration", registrants: 422},
  //   {session: "Domo Workflows", registrants: 392},
  //   {session: "From Data to $$", registrants: 357}
  // ];
  
  // Generate contrasting color
  // const chartColor = generateContrastingColors(baseColor)[0];

  const chartColor = generateMonochromaticColors(baseColor, data.length);
  
  // Get the canvas element
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error(`Canvas element with id '${canvasId}' not found`);
    return null;
  }
  
  // Sort data in descending order
  data.sort((a, b) => b.registrants - a.registrants);
  
  // Destroy existing chart if it exists
  if (barChart) {
    barChart.destroy();
  }
  
  // Create Chart.js bar chart
  barChart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: data.map(d => d.session),
      datasets: [{
        label: 'Registrants',
        data: data.map(d => d.registrants),
        backgroundColor: chartColor,
        borderColor: 'transparent',
        borderWidth: 1
      }]
    },
    options: {
      ...commonChartOptions,
      indexAxis: 'y',
      plugins: {
        ...commonChartOptions.plugins,
        legend: {
          display: false
        },
        datalabels: {
          color: 'white',
          anchor: 'end',
          align: 'right',
          offset: 4,
          font: {
            size: 9,
            weight: 'bold'
          },
          formatter: function(value) {
            return value;
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'white',
            font: {
              size: 9
            }
          }
        },
        y: {
          grid: {
            display: false
          },
          ticks: {
            color: 'white',
            font: {
              size: 9
            }
          }
        }
      }
    }
  });
  
  return barChart;
}

/**
 * Creates a pie/doughnut chart using Chart.js
 * @param {string} baseColor - The base color in hex format
 * @param {string} canvasId - The ID of the canvas element to render the chart
 * @returns {Chart} The created Chart.js instance
 */
export function createPieChart(baseColor = '#4B56D2', canvasId) {
  const data = [
    {industry: "High Tech", percentage: 17.95},
    {industry: "Manufacturing", percentage: 9.9},
    {industry: "Financial Services", percentage: 9.36},
    {industry: "Media", percentage: 9.25},
    {industry: "Professional Services", percentage: 8.27},
    {industry: "Retail", percentage: 5.98},
    {industry: "Other Industries", percentage: 39.29}
  ];
  console.log('the pie chart stuff', data, canvasId)

  
  const title = "Industry Breakdown";
  const pieColors = generateMonochromaticColors(baseColor, data.length);
  
  // Get the canvas element
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error(`Canvas element with id '${canvasId}' not found`);
    return null;
  }
  
  // Destroy existing chart if it exists
  // if (pieChart) {
  //   console.log('destroying the pie chart')
  //   pieChart.destroy();
  // }
  
  // Create Chart.js pie chart
  pieChart = new Chart(canvas, {
    type: 'doughnut',
    data: {
      // labels: data.map(d => d.industry),
      datasets: [{
        data: data.map(d => d.percentage),
        backgroundColor: pieColors,
        borderColor: 'transparent',
        borderWidth: 0.1
      }]
    },
    options: {
      ...commonChartOptions,
      aspectRatio: 1,
      cutout: '50%',
      layout: {
        padding: {
          top: 20,
          right: 30,
          bottom: 20,
          left: 30
        }
      },
      plugins: {
        ...commonChartOptions.plugins,
        title: {
          display: true,
          text: 'Domopalooza Registration Trends',
          color: 'white',
          font: {
            size: 16
          },
          padding: {bottom: 20}
        },
        legend: {
          position: 'bottom',
          align: 'center',
          labels: {
            color: 'white',
            padding: 8,
            font: {
              size: 10
            },
            generateLabels: function(chart) {
              const data = chart.data;
              if (data.labels.length && data.datasets.length) {
                return data.labels.map((label, i) => {
                  const meta = chart.getDatasetMeta(0);
                  const style = meta.controller.getStyle(i);
                  
                  return {
                    text: `${label} (${data.datasets[0].data[i].toFixed(1)}%)`,
                    fillStyle: style.backgroundColor,
                    strokeStyle: style.borderColor,
                    lineWidth: style.borderWidth,
                    hidden: isNaN(data.datasets[0].data[i]) || meta.data[i].hidden,
                    index: i
                  };
                });
              }
              return [];
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.label}: ${context.raw.toFixed(1)}%`;
            }
          }
        },
        datalabels: {
          color: 'white',
          font: {
            size: 10,
            weight: 'bold'
          },
          formatter: function(value, context) {
            return value > 8 ? `${value.toFixed(1)}%` : '';
          }
        }
      }
    }
  });
  
  return pieChart;
}

/**
 * Creates a line chart using Chart.js
 * @param {string} baseColor - The base color in hex format
 * @param {string} canvasId - The ID of the canvas element to render the chart
 * @returns {Chart} The created Chart.js instance
 */
export function createLineChart(baseColor = '#4B56D2', canvasId) {
  const data = [
    {month: "January", year: "2019", registrants: 200},
    {month: "February", year: "2019", registrants: 450},
    {month: "March", year: "2019", registrants: 890},
    
    {month: "January", year: "2024", registrants: 250},
    {month: "February", year: "2024", registrants: 550},
    {month: "March", year: "2024", registrants: 949},
    
    {month: "January", year: "2025", registrants: 320},
    {month: "February", year: "2025", registrants: 650},
    {month: "March", year: "2025", registrants: 999}
  ];
  
  // Generate contrasting colors for each year
  const uniqueYears = ["2019", "2024", "2025"];
  const chartColors = generateContrastingColors(baseColor, uniqueYears.length);
  
  // Get the canvas element
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error(`Canvas element with id '${canvasId}' not found`);
    return null;
  }
  
  // Destroy existing chart if it exists
  if (lineChart) {
    lineChart.destroy();
  }
  
  // Create Chart.js line chart
  lineChart = new Chart(canvas, {
    type: 'line',
    data: {
      labels: ["January", "February", "March"],
      datasets: uniqueYears.map((year, index) => ({
        label: year,
        data: data.filter(d => d.year === year).map(d => d.registrants),
        borderColor: chartColors[index],
        backgroundColor: chartColors[index].replace(')', ', 0.1)').replace('hsl', 'hsla'),
        tension: 0.4,
        pointBackgroundColor: chartColors[index],
        pointBorderColor: 'white',
        pointRadius: 6,
        pointHoverRadius: 8
      }))
    },
    options: {
      ...commonChartOptions,
      plugins: {
        ...commonChartOptions.plugins,
        legend: {
          position: 'top',
          labels: {
            color: 'white',
            padding: 15
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${context.raw} registrants`;
            }
          }
        },
        datalabels: {
          display: false // Disable datalabels for line chart
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Month',
            color: 'white'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'white'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Number of Registrants',
            color: 'white'
          },
          min: 0,
          max: 1100,
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'white'
          }
        }
      }
    }
  });
  
  return lineChart;
}

/**
 * Initialize all charts with the given base color
 * @param {string} baseColor - The base color in hex format
 */
function initCharts(baseColor = '#4B56D2') {
  // Register the Chart.js Data Labels plugin if available
  if (window.ChartDataLabels) {
    Chart.register(ChartDataLabels);
  }
  
  // Create all charts
  createBarChart(baseColor, 'bar-chart');
  createPieChart(baseColor, 'pie-chart');
  createLineChart(baseColor, 'line-chart');
}

/**
 * Update all charts with a new base color
 * @param {string} newColor - The new base color in hex format
 */
function updateChartsColor(newColor) {
  createBarChart(newColor, 'bar-chart');
  createPieChart(newColor, 'pie-chart');
  createLineChart(newColor, 'line-chart');
}

// Export the functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    generateContrastingColors,
    darkenColor,
    createBarChart,
    createPieChart,
    createLineChart,
    createAreaChart,
    createCombinedChart,
    initCharts,
    updateChartsColor
  };
}

/**
 * Creates an area chart to better visualize the year-over-year registration data
 * @param {string} baseColor - The base color in hex format
 * @param {string} canvasId - The ID of the canvas element to render the chart
 * @returns {Chart} The created Chart.js instance
 */
export function createAreaChart(baseColor, canvasId) {
  const data = [
    {month: "January", year: "2019", registrants: 200},
    {month: "February", year: "2019", registrants: 450},
    {month: "March", year: "2019", registrants: 890},
    
    {month: "January", year: "2024", registrants: 250},
    {month: "February", year: "2024", registrants: 550},
    {month: "March", year: "2024", registrants: 949},
    
    {month: "January", year: "2025", registrants: 320},
    {month: "February", year: "2025", registrants: 650},
    {month: "March", year: "2025", registrants: 999}
  ];
  
  // Generate monochromatic colors for each year
  const uniqueYears = ["2019", "2024", "2025"];
  const chartColors = generateMonochromaticColors(baseColor, uniqueYears.length);
  
  // Get the canvas element
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error(`Canvas element with id '${canvasId}' not found`);
    return null;
  }
  
  // Group data by year
  const months = ["January", "February", "March"];
  const datasetsByYear = {};
  
  uniqueYears.forEach((year, index) => {
    // Use darker colors for earlier years, lighter for more recent
    const colorIndex = uniqueYears.length - 1 - index; // Reverse index
    
    datasetsByYear[year] = {
      label: year,
      data: months.map(month => {
        const point = data.find(d => d.year === year && d.month === month);
        return point ? point.registrants : null;
      }),
      borderColor: chartColors[colorIndex],
      backgroundColor: chartColors[colorIndex].replace(')', ', 0.7)').replace('hsl', 'hsla'),
      fill: true,
      tension: 0.4,
      pointBackgroundColor: chartColors[colorIndex],
      pointBorderColor: 'white',
      pointRadius: 5,
      pointHoverRadius: 8,
      order: index // Ensures most recent year is on top
    };
  });
  
  // Destroy existing chart if it exists
  let areaChart = Chart.getChart(canvasId);
  if (areaChart) {
    areaChart.destroy();
  }
  
  // Create Chart.js area chart
  areaChart = new Chart(canvas, {
    type: 'line', // Line chart with fill creates an area chart
    data: {
      labels: months,
      datasets: Object.values(datasetsByYear)
    },
    options: {
      ...commonChartOptions,
      plugins: {
        ...commonChartOptions.plugins,
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${context.raw} registrants`;
            },
            footer: function(tooltipItems) {
              // Calculate year-over-year growth
              if (tooltipItems.length > 1) {
                const currentYear = tooltipItems[0].dataset.label;
                const previousYear = tooltipItems[1].dataset.label;
                const currentValue = tooltipItems[0].raw;
                const previousValue = tooltipItems[1].raw;
                
                if (currentValue && previousValue) {
                  const growth = ((currentValue - previousValue) / previousValue * 100).toFixed(1);
                  return `YoY Growth: ${growth}%`;
                }
              }
              return '';
            }
          }
        },
        title: {
          display: false,
          text: 'Domopalooza Registration Trends',
          color: 'white',
          font: {
            size: 16
          },
          padding: {bottom: 20}
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Month',
            color: 'white'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'white',
            font: {
              size: 10
            }
          }
        },
        y: {
          title: {
            display: true,
            text: 'Number of Registrants',
            color: 'white'
          },
          min: 0,
          max: 1100,
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'white',
            font: {
              size: 10
            }
          }
        }
      },
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
      }
    }
  });
  
  return areaChart;
}


export function createCombinedChart(baseColor = '#4B56D2', canvasId = 'combined-chart') {
  const data = [
    {month: "January", year: "2019", registrants: 200},
    {month: "February", year: "2019", registrants: 450},
    {month: "March", year: "2019", registrants: 890},
    
    {month: "January", year: "2024", registrants: 250},
    {month: "February", year: "2024", registrants: 550},
    {month: "March", year: "2024", registrants: 949},
    
    {month: "January", year: "2025", registrants: 320},
    {month: "February", year: "2025", registrants: 650},
    {month: "March", year: "2025", registrants: 999}
  ];
  
  // Generate colors - one for bars, one for line
  const chartColors = generateMonochromaticColors(baseColor, 3);
  
  // Get the canvas element
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error(`Canvas element with id '${canvasId}' not found`);
    return null;
  }
  
  // Prepare data for bars (most recent year) and calculate YoY growth
  const months = ["January", "February", "March"];
  const barData = [];
  const growthData = [];
  
  months.forEach((month) => {
    const currentYear = data.find(d => d.year === "2025" && d.month === month);
    const previousYear = data.find(d => d.year === "2024" && d.month === month);
    
    if (currentYear && previousYear) {
      barData.push(currentYear.registrants);
      const growth = ((currentYear.registrants - previousYear.registrants) / previousYear.registrants) * 100;
      growthData.push(parseFloat(growth.toFixed(1)));
    }
  });
  
  // Destroy existing chart if it exists
  let combinedChart = Chart.getChart(canvasId);
  if (combinedChart) {
    combinedChart.destroy();
  }
  
  // Create Chart.js combined chart
  combinedChart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: months,
      datasets: [
        {
          label: '2025 Registrations',
          data: barData,
          backgroundColor: chartColors[1],
          borderColor: 'white',
          borderWidth: 1,
          barPercentage: 0.6,
          yAxisID: 'y'
        },
        {
          label: 'YoY Growth (%)',
          data: growthData,
          type: 'line',
          borderColor: chartColors[2],
          backgroundColor: 'transparent',
          borderWidth: 3,
          pointBackgroundColor: chartColors[2],
          pointBorderColor: 'white',
          pointRadius: 6,
          yAxisID: 'y1',
          tension: 0.4
        }
      ]
    },
    options: {
      ...commonChartOptions,
      plugins: {
        ...commonChartOptions.plugins,
        legend: {
          position: 'top',
          labels: {
            color: 'white',
            usePointStyle: true,
            font: {
              size: 10
            }
          }
        },
        title: {
          display: true,
          text: 'DP25 Registrations & Growth',
          color: 'white',
          font: {
            size: 12
          },
          padding: {bottom: 10}
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'white',
            font: {
              size: 10
            }
          }
        },
        y: {
          type: 'linear',
          position: 'left',
          title: {
            display: true,
            text: 'Number of Registrants',
            color: 'white'
          },
          min: 0,
          max: 1100,
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'white',
            font: {
              size: 10
            }
          }
        },
        y1: {
          type: 'linear',
          position: 'right',
          title: {
            display: true,
            text: 'YoY Growth (%)',
            color: 'white'
          },
          min: 0,
          max: 30,
          grid: {
            drawOnChartArea: false
          },
          ticks: {
            color: 'white',
            font: {
              size: 10
            }
          }
        }
      }
    }
  });
  
  return combinedChart;
}

/**
 * Creates a grouped bar chart for clear year-over-year comparison
 * @param {string} baseColor - The base color in hex format
 * @param {string} canvasId - The ID of the canvas element to render the chart
 * @returns {Chart} The created Chart.js instance
 */
export function createGroupedBarChart(baseColor = '#4B56D2', canvasId = 'grouped-bar-chart') {
  const data = [
    {month: "January", year: "2019", registrants: 200},
    {month: "February", year: "2019", registrants: 450},
    {month: "March", year: "2019", registrants: 890},
    
    {month: "January", year: "2024", registrants: 250},
    {month: "February", year: "2024", registrants: 550},
    {month: "March", year: "2024", registrants: 949},
    
    {month: "January", year: "2025", registrants: 320},
    {month: "February", year: "2025", registrants: 650},
    {month: "March", year: "2025", registrants: 999}
  ];
  
  // Generate monochromatic colors for each year
  const uniqueYears = ["2019", "2024", "2025"];
  const chartColors = generateMonochromaticColors(baseColor, uniqueYears.length);
  
  // Get the canvas element
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error(`Canvas element with id '${canvasId}' not found`);
    return null;
  }
  
  // Prepare datasets for each year
  const months = ["January", "February", "March"];
  const datasets = [];
  
  uniqueYears.forEach((year, index) => {
    datasets.push({
      label: year,
      data: months.map(month => {
        const point = data.find(d => d.year === year && d.month === month);
        return point ? point.registrants : null;
      }),
      backgroundColor: chartColors[index],
      borderColor: 'white',
      borderWidth: 1
    });
  });
  
  // Destroy existing chart if it exists
  let groupedBarChart = Chart.getChart(canvasId);
  if (groupedBarChart) {
    groupedBarChart.destroy();
  }
  
  // Create Chart.js grouped bar chart
  groupedBarChart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: months,
      datasets: datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: 'white'
          },
          title: {
            display: true,
            text: 'Registration Year',
            color: 'white',
            padding: {bottom: 10}
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${context.raw} registrants`;
            }
          }
        },
        title: {
          display: true,
          text: 'Domopalooza Registration Comparison',
          color: 'white',
          font: {
            size: 16
          },
          padding: {bottom: 20}
        },
        annotation: {
          annotations: {
            line1: {
              type: 'line',
              yMin: 500,
              yMax: 500,
              borderColor: 'rgba(255, 255, 255, 0)',
              borderWidth: 1,
              borderDash: [5, 5],
              label: {
                content: 'Target (500)',
                enabled: true,
                position: 'end',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: 'white'
              }
            }
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Month',
            color: 'white'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0)'
          },
          ticks: {
            color: 'white'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Number of Registrants',
            color: 'white'
          },
          min: 0,
          grid: {
            color: 'rgba(255, 255, 255, 0)'
          },
          ticks: {
            color: 'white'
          }
        }
      }
    }
  });
  
  return groupedBarChart;
}

export function createPolarAreaChart(baseColor = '#4B56D2', canvasId = 'polar-chart') {
  // Session data from the CSV
  const sessionData = [
    { session: "NBA's Domo Journey to AI", registrants: 478 },
    { session: "Connections & Integration", registrants: 422 },
    { session: "Domo Workflows", registrants: 392 },
    { session: "From Data to $$$", registrants: 357 }
  ];
  
  // Generate monochromatic colors for each segment
  const chartColors = generateMonochromaticColors(baseColor, sessionData.length);
  
  // Get the canvas element
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error(`Canvas element with id '${canvasId}' not found`);
    return null;
  }
  
  // Destroy existing chart if it exists
  let polarChart = Chart.getChart(canvasId);
  if (polarChart) {
    polarChart.destroy();
  }
  
  // Create polar area chart
  polarChart = new Chart(canvas, {
    type: 'polarArea',
    data: {
      labels: sessionData.map(d => d.session),
      datasets: [{
        data: sessionData.map(d => d.registrants),
        backgroundColor: chartColors.map(color => color.replace(')', ', 0.8)').replace('hsl', 'hsla')),
        borderColor: 'transparent',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          beginAtZero: true,
          ticks: {
            color: 'white'
          },
          pointLabels: {
            color: 'white',
            font: {
              size: 11
            }
          },
          grid: {
            color: 'rgba(255, 255, 255, 0)'
          },
          angleLines: {
            color: 'rgba(255, 255, 255, 0)'
          }
        }
      },
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: 'white',
            padding: 15,
            usePointStyle: true,
            pointStyle: 'circle'
          }
        },
        title: {
          display: true,
          text: 'Breakout Session Registration Distribution',
          color: 'white',
          font: {
            size: 16
          },
          padding: {bottom: 20}
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const value = context.raw;
              const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              return `${context.label}: ${value} (${percentage}%)`;
            }
          }
        }
      }
    }
  });
  
  return polarChart;
}


export function createBubbleChart(baseColor = '#4B56D2', canvasId = 'bubble-chart') {
  // Augmented data with additional metrics for bubble chart
  // We'll visualize:
  // - X axis: Month (Jan = 1, Feb = 2, March = 3)
  // - Y axis: Registration count
  // - Bubble size (r): Percentage of capacity filled
  // - Color: Year
  const bubbleData = [
    // 2019 data
    { x: 1, y: 200, r: 10, year: '2019', month: 'January', capacity: 60 },   // January 2019 (60% capacity)
    { x: 2, y: 450, r: 15, year: '2019', month: 'February', capacity: 75 },  // February 2019 (75% capacity) 
    { x: 3, y: 890, r: 18, year: '2019', month: 'March', capacity: 89 },     // March 2019 (89% capacity)
    
    // 2024 data
    { x: 1, y: 250, r: 12, year: '2024', month: 'January', capacity: 65 },   // January 2024 (65% capacity)
    { x: 2, y: 550, r: 16, year: '2024', month: 'February', capacity: 80 },  // February 2024 (80% capacity)
    { x: 3, y: 949, r: 19, year: '2024', month: 'March', capacity: 95 },     // March 2024 (95% capacity)
    
    // 2025 data
    { x: 1, y: 320, r: 13, year: '2025', month: 'January', capacity: 70 },   // January 2025 (70% capacity)
    { x: 2, y: 650, r: 17, year: '2025', month: 'February', capacity: 85 },  // February 2025 (85% capacity)
    { x: 3, y: 999, r: 20, year: '2025', month: 'March', capacity: 99 }      // March 2025 (99% capacity)
  ];
  
  // Group data by year
  const years = ['2019', '2024', '2025'];
  const datasets = [];
  
  // Generate colors for each year
  const colors = generateMonochromaticColors(baseColor, years.length);
  
  // Create a dataset for each year
  years.forEach((year, index) => {
    const yearData = bubbleData.filter(d => d.year === year);
    
    datasets.push({
      label: year,
      data: yearData.map(d => ({
        x: d.x,
        y: d.y,
        r: d.r
      })),
      backgroundColor: colors[index].replace(')', ', 0.7)').replace('hsl', 'hsla')
    });
  });
  
  // Get the canvas element
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error(`Canvas element with id '${canvasId}' not found`);
    return null;
  }
  
  // Destroy existing chart if it exists
  let bubbleChart = Chart.getChart(canvasId);
  if (bubbleChart) {
    bubbleChart.destroy();
  }
  
  // Create bubble chart
  bubbleChart = new Chart(canvas, {
    type: 'bubble',
    data: {
      datasets: datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Month',
            color: 'white'
          },
          min: 0.5,
          max: 3.5,
          ticks: {
            callback: function(value) {
              return ['', 'January', 'February', 'March'][Math.round(value)];
            },
            color: 'white'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0)'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Registrant Count',
            color: 'white'
          },
          min: 0,
          max: 1100,
          ticks: {
            color: 'white'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0)'
          }
        }
      },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: 'white'
          }
        },
        title: {
          display: true,
          text: 'Registration Growth and Capacity Fill',
          color: 'white',
          font: {
            size: 16
          },
          padding: {bottom: 20}
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const dataPoint = bubbleData.find(d => 
                d.year === context.dataset.label && 
                d.x === context.raw.x && 
                d.y === context.raw.y
              );
              
              if (dataPoint) {
                return [
                  `Year: ${dataPoint.year}`,
                  `Month: ${dataPoint.month}`,
                  `Registrants: ${dataPoint.y}`,
                  `Capacity filled: ${dataPoint.capacity}%`
                ];
              }
              
              return `${context.dataset.label}: (${context.raw.x}, ${context.raw.y})`;
            }
          }
        }
      }
    }
  });
  
  return bubbleChart;
}