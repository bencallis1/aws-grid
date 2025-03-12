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

  // Keep track of all available images and used images
  const usedImages = new Set();
  const availableImages = new Set();

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

      // First pass: collect all available images
      for (let i = 1; i < rows.length; i++) {
        if (rows[i] && rows[i].trim()) {
          const row = parseCSVRow(rows[i]);
          // Add all images (columns 2-10) to available images pool
          for (let j = 2; j <= 10; j++) {
            if (row[j] && row[j].trim()) {
              availableImages.add(row[j]);
            }
          }
          dataRows.push(row);
        }
      }

      if (dataRows.length < 2) {
        throw new Error('Not enough data rows available');
      }

      // Select two unique random rows
      const availableIndices = new Set(Array.from({ length: dataRows.length }, (_, i) => i));
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
      updateGridWithMultipleRows(selectedRows, gridItems, usedImages, availableImages);

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

// Get a random unused image from the available pool
function getRandomUnusedImage(usedImages, availableImages) {
  const unusedImages = Array.from(availableImages).filter(img => !usedImages.has(img));
  if (unusedImages.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * unusedImages.length);
  const selectedImage = unusedImages[randomIndex];
  usedImages.add(selectedImage);
  return selectedImage;
}

// Update the grid with multiple rows of data
function updateGridWithMultipleRows(rowsData, gridItems, usedImages, availableImages) {
  // Define color arrays - moved to constants to avoid recreating them
  const COLOR_ARRAYS = {
    blue: ['#99CCEE', '#39464F', '#B2D7F0', '#222C33'],
    purple: ['#871379', '#aa429d', '#e3c0de', '#c781be']
  };

  // Choose one color set randomly for this grid layout - store as global variable
  window.useBlueColors = Math.random() < 0.5;
  const colorArray = window.useBlueColors ? COLOR_ARRAYS.blue : COLOR_ARRAYS.purple;

  // Skip grid items with special content (like the plot container)
  const skipItems = [document.querySelector('.item-5')]; // Skip the plot container

  // Create separate arrays for different content types
  let titleCards = [];
  let imageCards = [];
  let otherContent = [];

  // Process each row of data
  for (const rowData of rowsData) {
    // Skip header row if it was accidentally included
    if (rowData[0] === "ID") continue;

    // Add title to title cards
    titleCards.push({ type: 'title', value: rowData[1] });

    // Add non-image content to other content (iframe removed)
    if (rowData[13]) otherContent.push({ type: 'text', value: rowData[13] });

    // Add images from the row, ensuring no duplicates
    for (let i = 2; i <= 10; i++) {
      if (rowData[i] && !usedImages.has(rowData[i])) {
        imageCards.push({ type: 'image', value: rowData[i] });
        usedImages.add(rowData[i]);
      }
    }
  }

  // Add domopalooza.png to other content
  otherContent.push({ type: 'domopalooza', value: 'domopalooza' });

  // Shuffle each content type separately
  titleCards = shuffleArray(titleCards);
  imageCards = shuffleArray(imageCards);
  otherContent = shuffleArray(otherContent);

  // Ensure we have at least one title card
  if (titleCards.length === 0) {
    console.warn('No title cards available');
    return;
  }

  // Start building final content assignments
  let contentAssignments = [];

  // Always put a title card first
  contentAssignments.push(titleCards[0]);
  titleCards.splice(0, 1); // Remove the used title card

  // Combine and shuffle remaining content
  let remainingContent = [...titleCards, ...otherContent];

  // Fill remaining slots with images and other content
  while (contentAssignments.length < gridItems.length) {
    // Prioritize using available images
    if (imageCards.length > 0) {
      contentAssignments.push(imageCards.pop());
    } else if (remainingContent.length > 0) {
      contentAssignments.push(remainingContent.pop());
    } else {
      // If we need more images, get unused ones from the pool
      const unusedImage = getRandomUnusedImage(usedImages, availableImages);
      if (unusedImage) {
        contentAssignments.push({ type: 'image', value: unusedImage });
      } else {
        // If we've used all images, reset and try again
        usedImages.clear();
        const newImage = getRandomUnusedImage(usedImages, availableImages);
        if (newImage) {
          contentAssignments.push({ type: 'image', value: newImage });
        }
      }
    }
  }

  // Trim if we have too many assignments
  if (contentAssignments.length > gridItems.length) {
    contentAssignments.length = gridItems.length;
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
    if (index >= contentAssignments.length) return;

    // Skip items that should not receive random content
    if (skipItems && skipItems.includes(item)) return;

    const content = contentAssignments[index];

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
        textElement.style.textAlign = 'left';

        // Set dark text color when background is light purple
        if (baseColor === '#e3c0de') {
          textElement.style.color = '#212121';
        }

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

      // iframe case has been removed as requested

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