// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Add loading class to all grid items initially
  const gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach(item => {
    item.classList.add('loading');
    item.innerHTML = '';  // Clear the "Loading..." text
  });
  
  // Fetch the CSV file
  fetch('data.csv')
    .then(response => response.text())
    .then(csvData => {
      // Parse CSV data
      const rows = csvData.split('\n');
      const headers = rows[0].split(',');

      // Get rows 1-11 (indexes 1-11 since 0 is header)
      const dataRows = [];
      for (let i = 1; i <= 11; i++) {
        if (rows[i]) {
          const rowData = parseCSVRow(rows[i]);
          dataRows.push(rowData);
        }
      }

      // Select two random rows from the data (1-11)
      const rowIndices = [];
      while (rowIndices.length < 2) {
        const randomIndex = Math.floor(Math.random() * dataRows.length);
        if (!rowIndices.includes(randomIndex)) {
          rowIndices.push(randomIndex);
        }
      }
      
      const selectedRows = [
        dataRows[rowIndices[0]],
        dataRows[rowIndices[1]]
      ];

      // Update the grid with the selected data from both rows
      updateGridWithMultipleRows(selectedRows);

      // Set random background color for mosaic-grid from the same color palette as tiles
      setRandomBackgroundColor();
      
      // Add a small delay to simulate loading and show the animation
      setTimeout(() => {
        // Remove loading class from all grid items
        document.querySelectorAll('.grid-item').forEach(item => {
          item.classList.remove('loading');
        });
      }, 800); // Show loading animation for 800ms minimum
    })
    .catch(error => {
      console.error('Error loading CSV data:', error);
    });

  // Add a small performance optimization to defer hover effects until after page load
  setTimeout(() => {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
      item.classList.add('hover-enabled');
    });
  }, 100);
});

// Parse CSV row handling quoted fields with commas
function parseCSVRow(row) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < row.length; i++) {
    const char = row[i];

    if (char === '"' && (i === 0 || row[i-1] !== '\\')) {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }

  if (current) {
    result.push(current);
  }

  return result;
}

// Update the grid with multiple rows of data
function updateGridWithMultipleRows(rowsData) {
  const gridItems = document.querySelectorAll('.grid-item');

  // Define color arrays
  const blueColorArray = ['#99CCEE', '#39464F', '#B2D7F0', '#222C33'];
  const purpleColorArray = ['#871379', '#aa429d', '#e3c0de', '#c781be'];

  // Choose one color set randomly for this grid layout - store as global variable
  window.useBlueColors = Math.random() < 0.5;
  const colorArray = window.useBlueColors ? blueColorArray : purpleColorArray;

  // Create an array of the content types to distribute from both rows
  const contentAssignments = [];
  
  // Process each row of data
  rowsData.forEach((rowData, rowIndex) => {
    contentAssignments.push(
      { type: 'title', value: rowData[1] }, // Title column
      { type: 'image', value: rowData[2] }, // image1
      { type: 'image', value: rowData[3] }, // image2
      { type: 'image', value: rowData[4] }, // image3
      { type: 'image', value: rowData[5] }, // image4
      { type: 'iframe', value: rowData[12] }, // embedCode
      { type: 'text', value: rowData[13] }  // summary
    );
  });

  // Add domopalooza.png special content
  const domopaloozaContent = { type: 'domopalooza', value: 'domopalooza' };
  
  // Shuffle the content assignments
  const shuffledContent = shuffleArray([...contentAssignments]);
  
  // Insert the domopalooza content at a random position (but ensure it's included)
  const randomPosition = Math.floor(Math.random() * Math.min(shuffledContent.length, gridItems.length));
  shuffledContent[randomPosition] = domopaloozaContent;

  // Apply content to grid items
  gridItems.forEach((item, index) => {
    // Use modulo to repeat content if we run out of unique items
    const contentIndex = index % shuffledContent.length;
    const content = shuffledContent[contentIndex];
    
    // Check if we have actual content (in case of empty slots)
    if (!content || !content.value) {
      // Fill empty slots with domoai.png
      item.innerHTML = `<div style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;"><img src="domoai.png" alt="Domo AI Logo" style="max-width: 100%; max-height: 100%;"></div>`;
      item.style.padding = '10px';
      item.style.backgroundColor = '#212121';
      return; // Skip further processing
    }

    // Clear existing content
    item.innerHTML = '';

      // Assign random color from the chosen color array
      const randomColorIndex = Math.floor(Math.random() * colorArray.length);
      item.style.backgroundColor = colorArray[randomColorIndex];

      // Set content based on type
      switch (content.type) {
        case 'title':
          item.innerHTML = `<h2>${content.value}</h2>`;
          item.style.padding = '10px';
          break;
        case 'image':
          const img = new Image();
          img.onload = () => {
            // Only remove loading class when image is loaded
            setTimeout(() => item.classList.remove('loading'), 200);
          };
          img.style.width = '100%';
          img.style.height = '100%';
          img.style.objectFit = 'cover';
          img.src = `images/${content.value}.png`;
          img.alt = `Image ${content.value}`;
          item.innerHTML = '';
          item.appendChild(img);
          item.style.padding = '0';
          break;
        case 'text':
          item.innerHTML = `<p>${content.value}</p>`;
          item.style.overflow = 'auto';
          item.style.padding = '10px';
          break;
        case 'iframe':
          // Remove quotes if present in the embed code
          const embedCode = content.value.replace(/^"|"$/g, '');
          // Create a container for iframe with fallback content
          item.innerHTML = `
            <div style="width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
              <iframe src="${embedCode}" frameborder="0" style="width: 100%; height: 100%;" 
                onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
                sandbox="allow-same-origin allow-scripts"></iframe>
              <div style="display: none; padding: 20px;">
                <p>Content cannot be displayed due to security restrictions.</p>
                <a href="${embedCode}" target="_blank" style="color: white; text-decoration: underline;">Open in new tab</a>
              </div>
            </div>`;
          item.style.padding = '0';
          break;
        case 'domopalooza':
          // Special handling for domopalooza image with centered alignment
          item.innerHTML = `<div style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;"><img src="domopalooza.png" alt="Domopalooza" style="max-width: 100%; max-height: 100%;"></div>`;
          item.style.padding = '10px';
          item.style.backgroundColor = '#212121'; // Always use this specific color
          break;
      }
    }
  );
}

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function setRandomBackgroundColor() {
  const blueColorArray = ['#99CCEE', '#39464F', '#B2D7F0', '#222C33'];
  const purpleColorArray = ['#871379', '#aa429d', '#e3c0de', '#c781be'];
  // Use the same color palette that was chosen for the tiles
  const colorArray = window.useBlueColors ? blueColorArray : purpleColorArray;
  const randomColorIndex = Math.floor(Math.random() * colorArray.length);
  document.querySelector('.mosaic-grid').style.backgroundColor = colorArray[randomColorIndex];
}

// Original function kept for reference
function updateGridWithData(rowData) {
  const gridItems = document.querySelectorAll('.grid-item');

  // Define color arrays
  const blueColorArray = ['#99CCEE', '#39464F', '#B2D7F0', '#222C33'];
  const purpleColorArray = ['#871379', '#aa429d', '#e3c0de', '#c781be'];

  // Choose one color set randomly for this grid layout - store as global variable
  window.useBlueColors = Math.random() < 0.5;
  const colorArray = window.useBlueColors ? blueColorArray : purpleColorArray;

  // Create an array of the content types to distribute
  const contentAssignments = [
    { type: 'title', value: rowData[1] }, // Title column
    { type: 'image', value: rowData[2] }, // image1
    { type: 'image', value: rowData[3] }, // image2
    { type: 'image', value: rowData[4] }, // image3
    { type: 'image', value: rowData[5] }, // image4
    { type: 'image', value: rowData[6] }, // image5
    { type: 'image', value: rowData[7] }, // image6
    { type: 'image', value: rowData[8] }, // image7
    { type: 'image', value: rowData[9] }, // image8
    { type: 'image', value: rowData[10] }, // image9
    { type: 'iframe', value: rowData[12] }, // embedCode
    { type: 'text', value: rowData[13] }  // summary
  ];

  // Add domopalooza.png special content
  const domopaloozaContent = { type: 'domopalooza', value: 'domopalooza' };
  
  // Shuffle the content assignments
  const shuffledContent = shuffleArray([...contentAssignments]);
  
  // Insert the domopalooza content at a random position (but ensure it's included)
  const randomPosition = Math.floor(Math.random() * Math.min(shuffledContent.length, gridItems.length));
  shuffledContent[randomPosition] = domopaloozaContent;
}