
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
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
      
      // Select a random row from the data (1-11)
      const randomRowIndex = Math.floor(Math.random() * dataRows.length);
      const selectedRow = dataRows[randomRowIndex];
      
      // Update the grid with the data
      updateGridWithData(selectedRow);
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

// Update the grid with the selected data
function updateGridWithData(rowData) {
  const gridItems = document.querySelectorAll('.grid-item');
  
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
  
  // Shuffle the content assignments
  const shuffledContent = shuffleArray([...contentAssignments]);
  
  // Apply content to grid items
  gridItems.forEach((item, index) => {
    if (index < shuffledContent.length) {
      const content = shuffledContent[index];
      
      // Clear existing content
      item.innerHTML = '';
      
      // Set content based on type
      switch (content.type) {
        case 'title':
          item.innerHTML = `<h2>${content.value}</h2>`;
          break;
        case 'image':
          item.innerHTML = `<img src="images/${content.value}.png" alt="Image ${content.value}" style="width: 100%; height: 100%; object-fit: cover;">`;
          break;
        case 'text':
          item.innerHTML = `<p>${content.value}</p>`;
          item.style.overflow = 'auto';
          break;
        case 'iframe':
          // Remove quotes if present in the embed code
          const embedCode = content.value.replace(/^"|"$/g, '');
          item.innerHTML = `<iframe src="${embedCode}" frameborder="0" style="width: 100%; height: 100%;"></iframe>`;
          break;
      }
    }
  });
}

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
