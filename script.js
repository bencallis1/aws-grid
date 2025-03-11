// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Cache DOM selections
  const gridItems = document.querySelectorAll('.grid-item');
  
  // Check if on mobile device and set a data attribute on body
  const isMobile = window.innerWidth <= 768;
  document.body.setAttribute('data-device', isMobile ? 'mobile' : 'desktop');
  
  // Add resize listener to handle orientation changes
  window.addEventListener('resize', () => {
    const currentIsMobile = window.innerWidth <= 768;
    document.body.setAttribute('data-device', currentIsMobile ? 'mobile' : 'desktop');
  });
  
  // Initialize grid items (add loading state)
  for (let item of gridItems) {
    item.classList.add('loading');
    item.innerHTML = '';  // Clear the "Loading..." text
  }

  // Fetch the CSV file
  fetch('data.csv')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.text();
    })
    .then(csvData => {
      // Parse CSV data more efficiently
      const rows = csvData.split('\n');
      const dataRows = [];
      
      // Skip header row (i=0) and start from i=1
      for (let i = 1; i < rows.length; i++) {
        if (rows[i] && rows[i].trim()) {
          dataRows.push(parseCSVRow(rows[i]));
        }
      }
      
      if (dataRows.length < 2) {
        throw new Error('Not enough data rows available');
      }
      
      // Select two unique random rows (more efficient algorithm)
      const availableIndices = new Set(Array.from({length: dataRows.length}, (_, i) => i));
      const rowIndices = [];
      
      for (let i = 0; i < 2 && availableIndices.size > 0; i++) {
        const availableArray = Array.from(availableIndices);
        const randomIndex = Math.floor(Math.random() * availableArray.length);
        const selectedIndex = availableArray[randomIndex];
        
        rowIndices.push(selectedIndex);
        availableIndices.delete(selectedIndex);
      }

      const selectedRows = rowIndices.map(index => dataRows[index]);

      // Update the grid with the selected data
      updateGridWithMultipleRows(selectedRows, gridItems);

      // Set random background color for mosaic-grid
      setRandomBackgroundColor();

      // Remove loading class after a delay
      setTimeout(() => {
        for (let item of gridItems) {
          item.classList.remove('loading');
        }
      }, 800);
    })
    .catch(error => {
      console.error('Error loading CSV data:', error);
      // Remove loading state on error
      for (let item of gridItems) {
        item.classList.remove('loading');
        item.textContent = 'Error loading content';
      }
    });

  // Enable hover effects after page load
  requestAnimationFrame(() => {
    for (let item of gridItems) {
      item.classList.add('hover-enabled');
    }
  });
});

// Parse CSV row handling quoted fields with commas
function parseCSVRow(row) {
  const result = [];
  let current = '';
  let inQuotes = false;
  const len = row.length;

  for (let i = 0; i < len; i++) {
    const char = row[i];

    if (char === '"' && (i === 0 || row[i - 1] !== '\\')) {
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
function updateGridWithMultipleRows(rowsData, gridItems) {
  // Define color arrays - moved to constants to avoid recreating them
  const COLOR_ARRAYS = {
    blue: ['#99CCEE', '#39464F', '#B2D7F0', '#222C33'],
    purple: ['#871379', '#aa429d', '#e3c0de', '#c781be']
  };

  // Choose one color set randomly for this grid layout - store as global variable
  window.useBlueColors = Math.random() < 0.5;
  const colorArray = window.useBlueColors ? COLOR_ARRAYS.blue : COLOR_ARRAYS.purple;

  // Create an array of the content types to distribute from both rows
  const contentAssignments = [];
  
  // Process each row of data - add content to array rather than pushing as a group
  for (const rowData of rowsData) {
    // Skip header row if it was accidentally included
    if (rowData[0] === "ID") continue;

    // Map the CSV columns to content types more efficiently
    const rowContent = [
      { type: 'title', value: rowData[1] },         // Title column
      { type: 'image', value: rowData[2] },         // image1
      { type: 'image', value: rowData[3] },         // image2
      { type: 'image', value: rowData[4] },         // image3
      { type: 'image', value: rowData[5] },         // image4
      { type: 'image', value: rowData[6] },         // image5
      { type: 'image', value: rowData[7] },         // image6
      { type: 'image', value: rowData[8] },         // image7
      { type: 'image', value: rowData[9] },         // image8
      { type: 'image', value: rowData[10] },        // image9
      { type: 'iframe', value: rowData[12] },       // embedCode
      { type: 'text', value: rowData[13] }          // summary
    ];
    
    contentAssignments.push(...rowContent);
  }

  // Add domopalooza.png special content
  const domopaloozaContent = { type: 'domopalooza', value: 'domopalooza' };

  // Shuffle the content assignments
  const shuffledContent = shuffleArray([...contentAssignments]);
  
  // Add domopalooza content to the array
  shuffledContent.push(domopaloozaContent);

  // Adjust array length to match grid items
  if (shuffledContent.length > gridItems.length) {
    shuffledContent.length = gridItems.length;
  } else if (shuffledContent.length < gridItems.length) {
    const originalLength = shuffledContent.length;
    for (let i = 0; i < gridItems.length - originalLength; i++) {
      shuffledContent.push(shuffledContent[i % originalLength]);
    }
  }

  // Create document fragment for better performance
  const fragment = document.createDocumentFragment();
  
  // Pre-create some shared DOM elements
  const createOverlay = (colorRGBA) => {
    const overlay = document.createElement('div');
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = colorRGBA;
    return overlay;
  };

  // Apply content to grid items
  gridItems.forEach((item, index) => {
    if (index >= shuffledContent.length) return;
    
    const content = shuffledContent[index];
    
    // Clear existing content
    item.innerHTML = '';
    
    // Get random color from the palette
    const randomColorIndex = Math.floor(Math.random() * colorArray.length);
    const baseColor = colorArray[randomColorIndex];
    item.style.backgroundColor = baseColor;
    
    // Apply content based on type
    switch (content.type) {
      case 'title':
      case 'text': {
        // Common setup for text-based content
        const isTitle = content.type === 'title';
        const textureNum = Math.floor(Math.random() * 4) + 1;
        const colorRGBA = hexToRGBA(baseColor, 0.75);
        
        // Configure item styles
        item.style.backgroundImage = `url('textures/texture${textureNum}.png')`;
        item.style.backgroundSize = 'cover';
        item.style.backgroundPosition = 'center';
        item.style.position = 'relative';
        item.style.padding = '10px';
        
        if (!isTitle) {
          item.style.overflow = 'auto';
        }
        
        // Create overlay
        const overlay = createOverlay(colorRGBA);
        item.appendChild(overlay);
        
        // Create text element
        const textElement = isTitle ? document.createElement('h2') : document.createElement('p');
        textElement.textContent = content.value;
        textElement.style.position = 'relative';
        textElement.style.zIndex = '2';
        textElement.style.textTransform = 'uppercase';
        
        // Check if on mobile
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
          // Adjust font size on mobile
          if (isTitle) {
            textElement.style.fontSize = '20px';
            textElement.style.lineHeight = '1.2';
          } else {
            textElement.style.fontSize = '14px';
            textElement.style.lineHeight = '1.4';
          }
          
          // Truncate long text on mobile
          if (content.value.length > 120) {
            textElement.textContent = content.value.substring(0, 120) + '...';
          }
        }
        
        item.appendChild(textElement);
        break;
      }
      
      case 'image': {
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
        item.appendChild(img);
        item.style.padding = '0';
        break;
      }
      
      case 'iframe': {
        if (!content.value || content.value === '') {
          // Handle missing iframe by displaying a default message
          const textureNum = Math.floor(Math.random() * 4) + 1;
          const colorRGBA = hexToRGBA(baseColor, 0.75);
          
          // Apply styles
          item.style.backgroundImage = `url('textures/texture${textureNum}.png')`;
          item.style.backgroundSize = 'cover';
          item.style.backgroundPosition = 'center';
          item.style.position = 'relative';
          item.style.padding = '10px';
          
          // Add overlay
          const overlay = createOverlay(colorRGBA);
          item.appendChild(overlay);
          
          // Add default message
          const message = document.createElement('p');
          message.textContent = "Sit back, connect, and enjoy an inspiring conference experience!";
          message.style.position = 'relative';
          message.style.zIndex = '2';
          message.style.padding = '15px';
          message.style.textAlign = 'center';
          item.appendChild(message);
        } else {
          // Handle iframe with embed code
          const embedCode = content.value.replace(/^"|"$/g, '');
          const iframeContainer = document.createElement('div');
          iframeContainer.style.cssText = 'width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;';
          
          iframeContainer.innerHTML = `
            <iframe src="${embedCode}" frameborder="0" style="width: 100%; height: 100%;" 
              onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
              sandbox="allow-same-origin allow-scripts"></iframe>
            <div style="display: none; padding: 20px;">
              <p>Content cannot be displayed due to security restrictions.</p>
              <a href="${embedCode}" target="_blank" style="color: white; text-decoration: underline;">Open in new tab</a>
            </div>`;
          
          item.appendChild(iframeContainer);
          item.style.padding = '0';
        }
        break;
      }
      
      case 'domopalooza': {
        const container = document.createElement('div');
        container.style.cssText = 'width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;';
        
        const img = document.createElement('img');
        img.src = 'domopalooza.png';
        img.alt = 'Domopalooza';
        img.style.cssText = 'max-width: 100%; max-height: 100%;';
        
        container.appendChild(img);
        item.appendChild(container);
        
        item.style.padding = '10px';
        item.style.backgroundColor = '#212121'; // Always use this specific color
        break;
      }
    }
  });
}

// Fisher-Yates shuffle algorithm - optimized version
function shuffleArray(array) {
  const newArray = [...array]; // Create a copy to avoid mutating original array
  let i = newArray.length;
  
  while (i > 0) {
    const j = Math.floor(Math.random() * i--);
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  
  return newArray;
}

// Set background color using the same palette as tiles
function setRandomBackgroundColor() {
  // Use a consistent color map for better maintenance
  const COLOR_ARRAYS = {
    blue: ['#99CCEE', '#39464F', '#B2D7F0', '#222C33'],
    purple: ['#871379', '#aa429d', '#e3c0de', '#c781be']
  };
  
  // Use the same color palette that was chosen for the tiles
  const colorArray = window.useBlueColors ? COLOR_ARRAYS.blue : COLOR_ARRAYS.purple;
  const randomColorIndex = Math.floor(Math.random() * colorArray.length);
  document.querySelector('.mosaic-grid').style.backgroundColor = colorArray[randomColorIndex];
}

// Helper function to convert hex color to rgba for overlay - optimized with caching
const rgbaCache = new Map(); // Cache for converted colors

function hexToRGBA(hex, opacity) {
  // Create a cache key using hex and opacity
  const cacheKey = `${hex}_${opacity}`;
  
  // Check if we already converted this color
  if (rgbaCache.has(cacheKey)) {
    return rgbaCache.get(cacheKey);
  }
  
  // Clean hex code
  hex = hex.replace('#', '');
  
  // Parse the hex values to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Create rgba string
  const rgba = `rgba(${r}, ${g}, ${b}, ${opacity})`;
  
  // Store in cache
  rgbaCache.set(cacheKey, rgba);
  
  return rgba;
}