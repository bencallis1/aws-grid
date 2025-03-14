// Import Observable Plot
let Plot;

async function initializePlot() {
  if (!Plot) {
    const module = await import('https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6.11/+esm');
    Plot = module.default || module.Plot;
  }
  return Plot;
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

  // Generate contrasting colors using oklab
  const colors = [];
  for (let i = 0; i < count; i++) {
    const hue = (360 / count) * i;
    const lightness = brightness < 0.5 ? 0.7 : 0.3; // Opposite of background brightness
    colors.push(`oklch(${lightness} 0.2 ${hue})`);
  }
  
  return colors;
}

// Create charts using the global Plot object
export const createBarChart = async (baseColor = '#4B56D2') => {
  const data = [
    {session: "NBA's Domo Journey to AI", registrants: 478},
    {session: "Connections & Integration", registrants: 422},
    {session: "Domo Workflows", registrants: 392},
    {session: "From Data to $$$", registrants: 357}
  ];

  // Get Plot from window global
  const Plot = window.Plot.default || window.Plot;
  
  // Generate contrasting color
  const chartColor = generateContrastingColors(baseColor)[0];
  
  // Create the bar chart using Observable Plot
  const chart = Plot.plot({
    width: 700,
    height: 400,
    marginLeft: 120,
    marginBottom: 70,
    style: {
      background: "transparent",
      color: "white",
      fontFamily: "'Open Sans', sans-serif"
    },
    x: {
      label: "Registrants",
      grid: true
    },
    y: {
      label: null,
      domain: data.map(d => d.session)
    },
    marks: [
      Plot.barX(data, {
        // x: "registrants",
        y: "session",
        fill: chartColor,
        sort: {y: "-x"}
      }),
      Plot.ruleX([0]),
      Plot.text(data, {
        // x: d => d.registrants + 10,
        y: "session",
        text: d => d.registrants,
        textAnchor: "start",
        fontWeight: "bold",
        dx: 5,
        fill: "white"
      })
    ]
  });

  return chart;
}

export const createPieChart = async (baseColor = '#4B56D2') => {
  const data = [
    {industry: "High Tech", percentage: 17.95},
    {industry: "Manufacturing", percentage: 9.9},
    {industry: "Financial Services", percentage: 9.36},
    {industry: "Media", percentage: 9.25},
    {industry: "Professional Services", percentage: 8.27},
    {industry: "Retail", percentage: 5.98},
    {industry: "Other Industries", percentage: 39.29}
  ];

  // Get Plot from window global
  const Plot = window.Plot.default || window.Plot;
  
  // Generate contrasting colors for each segment
  const chartColors = generateContrastingColors(baseColor, data.length);
  
  // Calculate cumulative percentages for positioning
  const total = data.reduce((sum, d) => sum + d.percentage, 0);
  let cumulative = 0;
  const pieData = data.map((d, i) => {
    const start = cumulative;
    cumulative += d.percentage;
    return {
      ...d,
      start: start / total,
      end: cumulative / total,
      color: chartColors[i]
    };
  });

  // Create points along the arc for each segment
  const segments = [];
  const POINTS_PER_SEGMENT = 50;
  pieData.forEach(d => {
    const startAngle = d.start * 2 * Math.PI;
    const endAngle = d.end * 2 * Math.PI;
    for (let i = 0; i <= POINTS_PER_SEGMENT; i++) {
      const t = i / POINTS_PER_SEGMENT;
      const angle = startAngle * (1 - t) + endAngle * t;
      segments.push({
        x: Math.cos(angle),
        y: Math.sin(angle),
        color: d.color,
        percentage: d.percentage,
        industry: d.industry,
        angle: (startAngle + endAngle) / 2
      });
    }
  });

  // Create a pie chart using Observable Plot
  const chart = Plot.plot({
    width: 500,
    height: 500,
    style: {
      background: "transparent",
      color: "white",
      fontFamily: "'Open Sans', sans-serif"
    },
    x: {
      domain: [-1.2, 1.2],
      axis: null
    },
    y: {
      domain: [-1.2, 1.2],
      axis: null
    },
    marks: [
      Plot.dot(segments, {
        x: "x",
        y: "y",
        fill: "color",
        r: 3,
        stroke: "white",
        strokeWidth: 0.5
      }),
      Plot.text(pieData.filter(d => d.percentage > 5), {
        x: d => Math.cos(d.start * 2 * Math.PI + (d.end - d.start) * Math.PI) * 0.7,
        y: d => Math.sin(d.start * 2 * Math.PI + (d.end - d.start) * Math.PI) * 0.7,
        text: d => `${d.industry}\n${d.percentage.toFixed(1)}%`,
        fill: "white",
        fontWeight: "bold",
        textAnchor: "middle"
      })
    ]
  });

  return chart;
}

export const createLineChart = async (baseColor = '#4B56D2') => {
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

  // Get Plot from window global
  const Plot = window.Plot.default || window.Plot;
  
  // Generate contrasting colors for each year
  const uniqueYears = ["2019", "2024", "2025"];
  const chartColors = generateContrastingColors(baseColor, uniqueYears.length);
  const yearColors = Object.fromEntries(uniqueYears.map((year, i) => [year, chartColors[i]]));
  
  // Create line chart with Observable Plot
  const chart = Plot.plot({
    width: 700,
    height: 400,
    marginRight: 40,
    style: {
      background: "transparent",
      color: "white",
      fontFamily: "'Open Sans', sans-serif"
    },
    x: {
      label: "Month",
      domain: ["January", "February", "March"]
    },
    y: {
      label: "Number of Registrants",
      domain: [0, 1100],
      grid: true
    },
    marks: [
      Plot.line(data, {
        x: "month",
        y: "registrants",
        stroke: d => yearColors[d.year],
        strokeWidth: 3,
        curve: "cardinal",
        marker: "circle",
        markerEnd: true,
        markerStart: true
      }),
      Plot.text(data.filter(d => d.month === "March"), {
        x: "month",
        y: d => d.registrants + 30,
        text: d => `${d.year}: ${d.registrants}`,
        fill: d => yearColors[d.year],
        fontWeight: "bold"
      }),
      Plot.ruleY([0])
    ],
    color: {
      domain: uniqueYears,
      range: chartColors,
      legend: true
    }
  });

  return chart;
}