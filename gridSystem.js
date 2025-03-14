import { layoutDefinitions } from './createGrids.js';

// Select a random layout and initialize the grid
export function initializeGrid() {
    // Select a random layout from available layouts
    const layoutKeys = Object.keys(layoutDefinitions);
    const randomLayoutIndex = Math.floor(Math.random() * layoutKeys.length);
    const selectedLayout = layoutKeys[randomLayoutIndex];
    
    // Get the grid container
    const gridContainer = document.getElementById('grid-container');
    if (!gridContainer) {
        console.error('Grid container not found');
        return;
    }
    
    // Store the selected layout for later use
    gridContainer.dataset.selectedLayout = selectedLayout;
    
    // Create grid items based on layout configuration
    createGridItems(layoutDefinitions[selectedLayout], gridContainer);

    // Initial layout update
    updateGridLayout();
}

// Create the grid items based on the selected layout
function createGridItems(layout, container) {
    // Clear existing content
    container.innerHTML = '';
    
    // Create grid items based on the grid structure
    layout.placements.forEach((position) => {
        // Create grid item
        const gridItem = document.createElement('div');
        gridItem.className = `${position.className} loading`;
        
        // Store original position data for responsive handling
        gridItem.dataset.originalColumn = position.gridArea.desktop;
        gridItem.dataset.originalRow = position.gridArea.desktop;
        gridItem.dataset.itemId = position.itemId;
        
        // Add empty text for loading state
        gridItem.innerHTML = '';
        
        // Append grid item to grid container
        container.appendChild(gridItem);
    });
}

// Function to update grid layout based on screen size
export function updateGridLayout() {
    const container = document.getElementById('grid-container');
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // On mobile, use a single column layout
        container.style.gridTemplateColumns = '1fr';
        container.style.gridTemplateRows = 'auto';
        container.style.gridAutoRows = 'minmax(150px, auto)';
        
        // Update all grid items to full width
        const gridItems = container.querySelectorAll('.grid-item');
        gridItems.forEach(item => {
            item.style.gridColumn = '1 / -1';
            item.style.gridRow = 'auto';
        });
    } else {
        // On desktop, use the layout from layoutDefinitions
        const layoutId = container.dataset.selectedLayout;
        const layout = layoutDefinitions[layoutId];
        
        if (layout) {
            const screenSize = getScreenSize();
            const gridSettings = layout.gridSettings[screenSize];
            
            container.style.gridTemplateColumns = `repeat(${gridSettings.columns}, 1fr)`;
            container.style.gridTemplateRows = gridSettings.rows;
            container.style.gridAutoRows = 'initial';
            
            // Restore original grid positions
            const gridItems = container.querySelectorAll('.grid-item');
            gridItems.forEach((item, index) => {
                const position = layout.placements[index];
                if (position) {
                    const gridArea = position.gridArea[screenSize];
                    if (gridArea) {
                        const [rowStart, colStart, rowEnd, colEnd] = gridArea.split('/').map(s => s.trim());
                        item.style.gridRowStart = rowStart;
                        item.style.gridRowEnd = rowEnd;
                        item.style.gridColumnStart = colStart;
                        item.style.gridColumnEnd = colEnd;
                    }
                }
            });
        }
    }
}

// Helper function to determine screen size
function getScreenSize() {
    const width = window.innerWidth;
    if (width >= 1024) return 'desktop';
    if (width >= 768) return 'tablet';
    return 'mobile';
} 