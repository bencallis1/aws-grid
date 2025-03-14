// Dynamic Luxury Travel Grid System
// This system handles complex, responsive layouts with content from API

// Define the content types we'll be working with
export const CONTENT_TYPES = {
    HERO_TEXT: 'HERO_TEXT',
    IMAGE: 'IMAGE',
    TEXT_SUMMARY: 'TEXT_SUMMARY',
    DATA_VISUAL: 'DATA_VISUAL',
    DOMO: 'DOMO',
    HERO_TEXT_SMALL: 'HERO_TEXT_SMALL'
};

let gridData = {}


// Helper function to convert hex to RGBA
function hexToRGBA(hex, opacity) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}


// Create a color theme
function setRandomThemeColors() {
    // Define color arrays with their corresponding text colors
    const COLOR_ARRAYS = {
        blue: {
            colors: ['#99CCEE', '#39464F', '#B2D7F0', '#222C33'],
            textColors: ['#212121', '#FFFFFF', '#212121', '#FFFFFF']
        },
        purple: {
            colors: ['#871379', '#aa429d', '#e3c0de', '#c781be'],
            textColors: ['#FFFFFF', '#FFFFFF', '#212121', '#212121']
        }
    };

    // Choose one color set randomly for this grid layout
    window.useBlueColors = Math.random() < 0.5;
    const colorSet = window.useBlueColors ? COLOR_ARRAYS.blue : COLOR_ARRAYS.purple;

    // Store the colors and their corresponding text colors
    window.gridColors = {
        primary: { bg: colorSet.colors[0], text: colorSet.textColors[0] },
        secondary: { bg: colorSet.colors[1], text: colorSet.textColors[1] },
        tertiary: { bg: colorSet.colors[2], text: colorSet.textColors[2] },
        quaternary: { bg: colorSet.colors[3], text: colorSet.textColors[3] },
        all: colorSet.colors
    };

    // Update CSS custom properties
    document.documentElement.style.setProperty('--primary-red', window.gridColors.primary.bg);
    document.documentElement.style.setProperty('--tomato-red', window.gridColors.secondary.bg);
    document.documentElement.style.setProperty('--gold', window.gridColors.tertiary.bg);
    document.documentElement.style.setProperty('--card-background-color', window.gridColors.secondary.bg);
    document.documentElement.style.setProperty('--steel-blue', window.gridColors.secondary.bg);
    document.documentElement.style.setProperty('--app-body-color', "#212121");
    document.documentElement.style.setProperty('--app-text-color', "#212121");

    return window.gridColors;
}

// Layout definitions for each variant
// Each layout defines where each content item should be positioned in the grid
export const layoutDefinitions = {
    // Layout 1 (corresponds to Image 1)
    
    layout1: {
        gridSettings: {
            desktop: { 
                columns: "repeat(7, minmax(0.5, 1fr))", 
                rows: "repeat(3, minmax(0, 1fr))" 
              },
              tablet: {  
                columns: "repeat(4, minmax(0.5, 1fr))",
                rows: "repeat(3, minmax(200px, 1fr))"
            },
            mobile: {  
                columns: "repeat(2, minmax(0.5, 1fr))", 
                rows: "repeat(6, minmax(100px, auto))"
            }
            },
        placements: [
            { itemId: 'main-slogan',  
                gridArea: { 
                desktop: '1 / 1 / span 2 / span 2', 
                tablet: '1 / 1 / span  / span 2', 
                mobile: '1 / 1 / 2 / 3' 
              }, className: 'color-bg main-slogan grid-item ' },

            { itemId: 'image4',  
                gridArea: { 
                desktop: '1 / 3 / span 2 / span 1',
                tablet: '1 / 3 / span 2 / span 1',
                mobile: '1 / 3 / span 2 / span 1'
              }, className: 'image-item' },
            // { itemId: 'image11', gridArea: { desktop: '1 / 6 / span 2 / span 1', tablet: '4 / 1 / 5 / 2', mobile: '4 / 1 / 5 / 2' }, className: 'image-item ' },
            { itemId: 'summary1', gridArea: { desktop: '2 / 4 / auto / span 2', tablet: '4 / 2 / 6 / 4', mobile: '5 / 1 / 7 / 3' }, className: 'image-item ' },
            // { itemId: 'image4', gridArea: { desktop: '3 / 6 / 4 / 7', tablet: '6 / 1 / 7 / 2', mobile: '7 / 1 / 8 / 3' }, className: 'image-item ' },
          
            { itemId: 'data2',  gridArea: { 
                desktop: '1 / 6 / span 2 / span 2', 
                tablet: '2 / 1 / span 1 / span 2', 
                mobile: '2 / 1 / 3 / 3' 
              }, className: 'data-container ' },
              
            { itemId: 'data1',  gridArea: { 
                desktop: '1 / 4 / auto / span 2', 
                tablet: '4 / 1 / span 2 / span 3', 
                mobile: '2 / 1 / 3 / 3' 
              }, className: 'data-container' },
             
              { itemId: 'data2',  gridArea: { 
                desktop: '3 / 5 / auto / span 1',
                tablet: '7 / 1 / span 1 / span 2', 
                mobile: '6 / 1 / 3 / 3' 
              }, className: 'data-container' },
            // { itemId: 'image9', gridArea: { desktop: '1 / 4 / span 1 / span 2', tablet: '9 / 1 / 10 / 2', mobile: '10 / 1 / 11 / 3' }, className: 'color-bgm' },

            { itemId: 'domopalooza', gridArea: { 
                desktop: '3 / 1 / auto  / span 2',
                tablet: '3 / 1 / span 1 / span 3', 
                mobile: '6 / 1 / 3 / 3' 
              }, className: 'color-bg' },
            
            { itemId: 'titleCard', gridArea: { desktop: '3 / 4 / auto / span 1', tablet: '8 / 1 / 9 / 3', mobile: '9 / 1 / 10 / 3' }, className: 'color-bg' },

            { itemId: 'summary2', gridArea: { desktop: '3 / 6 / auto / span 2', tablet: '6 / 1 / span 1 / span 3', mobile: '9 / 1 / 10 / 3' }, className: 'color-bg' },
            { itemId: 'image8', gridArea: { desktop: '3 / 3 / auto / span 1', tablet: '9 / 1 / 10 / 2', mobile: '10 / 1 / 11 / 3' }, className: 'color-bg ' },
            // { itemId: 'image11', gridArea: { desktop: '1 / 3 / 2 / 3', tablet: '1 / 1 / 2 / 3', mobile: '1 / 1 / 2 / 3' }, className: 'color-bg ' },
           
            // { itemId: 'image6', gridArea: { desktop: '3 / 4 / span 1 / span 1 ', tablet: '9 / 1 / 10 / 2', mobile: '10 / 1 / 11 / 3' }, className: 'color-bg ' },
            // { itemId: 'image7', gridArea: { desktop: '3 / 5 / span 1 / span 1 ', tablet: '9 / 1 / 10 / 2', mobile: '10 / 1 / 11 / 3' }, className: 'color-bg ' },
            // { itemId: 'image8', gridArea: { desktop: '3 / 6 /span 1 / span 1 ', tablet: '9 / 1 / 10 / 2', mobile: '10 / 1 / 11 / 3' }, className: 'color-bg ' },
        
        ]
    },

    layout2: {
        gridSettings: {
            desktop: {                 
                columns: "repeat(auto-fit, minmax(150px, 1fr))", 
                rows: "repeat(3, minmax(0, 1fr))"  
            },
            tablet: {  
                columns: "repeat(4, minmax(0.5, 1fr))",
                rows: "repeat(3, minmax(200px, 1fr))"
            },
            mobile: {  
                columns: "repeat(2, minmax(0.5, 1fr))", 
                rows: "repeat(6, minmax(100px, auto))"
            }
        },
        placements: [
            { itemId: 'main-slogan', gridArea: { desktop: '1 / 5 / 3 / span 2', tablet: '1 / 1 / span 2 / span 2', mobile: '1 / 1 / 2 / 3' }, className: 'color-bg ' },
            { itemId: 'image3', gridArea: { desktop: '1 / 2 / 2 / 3', tablet: '3 / 1 / span 1 / span 1', mobile: '2 / 1 / span 1 / 2' }, className: 'image-item,  ' },
            { itemId: 'image1', gridArea: { desktop: '3 / 5 / auto / span 1', tablet: '3 / 2 / span 1 / span 1', mobile: '2 / 2 / span 1 / 3' }, className: 'image-item,  ' },
            { itemId: 'data2', gridArea: { desktop: '1 / 3 / 3 / span 2', tablet: '1 / 3 / span 2 / span 2', mobile: '3 / 1 / span 3 / 3' }, className: 'data-container ' },
            { itemId: 'summary3', gridArea: { desktop: '1 / 1 / 2 / 2', tablet: '4 / 1 / span 2 / span 4', mobile: '6 / 1 / span 2 / 3' }, className: 'color-bg main-slogan ' },
            { itemId: 'image5', gridArea: { desktop: '2 / 1 / 3 / 2', tablet: '3 / 3 / 4 / 5', mobile: '8 / 1 / span 1 / span 1' }, className: 'image-item,  ' },
            { itemId: 'summary2', gridArea: { desktop: '2 / 2 / 3 / 3', tablet: '11 / 3 / span 1 / span 2', mobile: '8 / 2 / span 1 / span 1' }, className: 'color-bg ' },
            { itemId: 'image3', gridArea: { desktop: '3 / 3 / auto / span 1', tablet: '11 / 1 / span 1 / span 2', mobile: '13 / 1 / span 1 / 3' }, className: 'color-bg ' },
            // { itemId: 'summary5', gridArea: { desktop: '3 / 3 / auto / span 1', tablet: '11 / 3 / span 1 / 5', mobile: '10 / 1 / span 1 / 3' }, className: 'color-bg ' },
            
            { itemId: 'data1', gridArea: { desktop: '3 / 1 / auto / span 2', tablet: '7 / 1 / span 2 / 5', mobile: '8 / 1 / span 2 / span 2' }, className: 'data-container  ' },
            { itemId: 'image11', gridArea: { desktop: '3 / 3 / auto / span 1', tablet: '12 / 4 / span 1 / 5', mobile: '12 / 1 / span 1 / span 1' }, className: 'color-bg ' },
            
            { itemId: 'image10', gridArea: { desktop: '3 / 6 / auto / span 1', tablet: '12 / 3 / span 1 / 3', mobile: '12 / 2 / span 1 / span 1' }, className: 'color-bg ' },
            
            { itemId: 'titleCard', gridArea: { desktop: '3 / 4 / auto / span 1', tablet: '12 / 1 / span 1 / span 2', mobile: '10 / 1 / span 1 / span 2' }, className: 'color-bg ' },
        ]
    },

    // Layout 3 (corresponds to Image 3)
    layout3: {
        gridSettings: {
            desktop: { columns: 6, rows: 'auto' },
            tablet: { columns: 4, rows: 'auto' },
            mobile: { columns: 2, rows: 'auto' }
        },
        placements: [
            { itemId: 'main-slogan', gridArea: { desktop: '1 / 4 / 2 / 5 ', tablet: '1 / 1 / 3 / 3', mobile: '1 / 1 / 2 / 3' }, className: 'color-bg main-slogan' },
            { itemId: 'image4', gridArea: { desktop: '1 / 3 / 2 / 4', tablet: '1 / 3 / 2 / 5', mobile: '2 / 1 / 3 / 3' }, className: 'image-item,  ' },
            { itemId: 'summary2', gridArea: { desktop: '1 / 1 / 3 / 3', tablet: '3 / 1 / 4 / 3', mobile: '3 / 1 / 4 / 3' }, className: 'color-bg ' },
            { itemId: 'image1', gridArea: { desktop: '1 / 5 / 3 / 7', tablet: '3 / 3 / 5 / 5', mobile: '4 / 1 / 6 / 3' }, className: 'image-item,  ' },
            { itemId: 'summary3', gridArea: { desktop: '2 / 3 / 3 / 4', tablet: '5 / 1 / 6 / 3', mobile: '6 / 1 / 7 / 3' }, className: 'color-bg  ' },
            { itemId: 'data1', gridArea: { desktop: '2 / 4 / 3 / 5', tablet: '5 / 3 / 6 / 5', mobile: '7 / 1 / 8 / 3' }, className: 'data-container ' },
            { itemId: 'image3', gridArea: { desktop: '3 / 1 / 4 / 2', tablet: '6 / 1 / 7 / 2', mobile: '8 / 1 / 9 / 3' }, className: 'image-item,  ' },
            { itemId: 'image2', gridArea: { desktop: '3 / 6 / 4 / 7', tablet: '7 / 3 / 8 / 5', mobile: '10 / 1 / 11 / 3' }, className: 'image-item,  ' },
            { itemId: 'image6', gridArea: { desktop: '3 / 6 / 4 / 7', tablet: '7 / 3 / 8 / 5', mobile: '10 / 1 / 11 / 3' }, className: 'image-item,  ' },
            { itemId: 'image7', gridArea: { desktop: '3 / 6 / 4 / 7', tablet: '7 / 3 / 8 / 5', mobile: '10 / 1 / 11 / 3' }, className: 'image-item,  ' },
            { itemId: 'image8', gridArea: { desktop: '3 / 6 / 4 / 7', tablet: '7 / 3 / 8 / 5', mobile: '10 / 1 / 11 / 3' }, className: 'image-item,  ' },
            { itemId: 'domopalooza', gridArea: { desktop: '3 / 1 / 4 / 3', tablet: '6 / 1 / 7 / 2', mobile: '8 / 1 / 9 / 2' }, className: 'color-bg ' },

            { itemId: 'image9', gridArea: { desktop: '3 / 6 / 4 / 7', tablet: '7 / 3 / 8 / 5', mobile: '10 / 1 / 11 / 3' }, className: 'image-item,  ' },
        ]
    },

    // Layout 4 (corresponds to Image 4)
    layout4: {
        gridSettings: {
            desktop: { columns: 6, rows: 'auto' },
            tablet: { columns: 4, rows: 'auto' },
            mobile: { columns: 2, rows: 'auto' }
        },
        placements: [
            { itemId: 'image2', gridArea: { desktop: '1 / 1 / 2 / 2', tablet: '1 / 1 / 2 / 2', mobile: '1 / 1 / 2 / 2' }, className: 'image-item,  ' },
            { itemId: 'image3', gridArea: { desktop: '1 / 2 / 2 / 3', tablet: '1 / 2 / 2 / 3', mobile: '1 / 2 / 2 / 3' }, className: 'image-item,  ' },
            { itemId: 'image4', gridArea: { desktop: '2 / 1 / 3 / 2', tablet: '2 / 1 / 3 / 2', mobile: '2 / 1 / 3 / 2' }, className: 'image-item,  ' },
            { itemId: 'image6', gridArea: { desktop: '2 / 2 / 2 / 3', tablet: '1 / 3 / 3 / 4', mobile: '2 / 2 / 4 / 3' }, className: 'image-item,  ' },
            { itemId: 'image1', gridArea: { desktop: '1 / 3 / 3 / 4', tablet: '1 / 3 / 3 / 4', mobile: '2 / 2 / 4 / 3' }, className: 'image-item,  ' },
            { itemId: 'data1', gridArea: { desktop: '1 / 4 / 2 / 5', tablet: '2 / 2 / 3 / 3', mobile: '3 / 1 / 4 / 2' }, className: 'data-container' },
            { itemId: 'summary1', gridArea: { desktop: '1 / 5 / 2 / 6', tablet: '3 / 1 / 4 / 2', mobile: '4 / 1 / 5 / 3' }, className: 'color-bg ' },
            { itemId: 'main-slogan', gridArea: { desktop: '1 / 6 / 3 / 7', tablet: '3 / 2 / 5 / 4', mobile: '5 / 1 / 6 / 3' }, className: 'color-bg main-slogan ' },
            { itemId: 'summary5', gridArea: { desktop: '3 / 1 / 4 / 2', tablet: '4 / 1 / 5 / 2', mobile: '6 / 1 / 7 / 2' }, className: 'color-bg ' },
            { itemId: 'data2', gridArea: { desktop: '3 / 2 / 4 / 3', tablet: '5 / 1 / 6 / 3', mobile: '6 / 2 / 7 / 3' }, className: 'data-container ' },
            { itemId: 'summary3', gridArea: { desktop: '3 / 3 / 4 / 4', tablet: '5 / 3 / 6 / 4', mobile: '7 / 1 / 8 / 3' }, className: 'color-bg ' },
            { itemId: 'domopalooza', gridArea: { desktop: '3 / 1 / 4 / 3', tablet: '6 / 1 / 7 / 2', mobile: '8 / 1 / 9 / 2' }, className: 'color-bg ' },
            // { itemId: 'summary4', gridArea: { desktop: '3 / 5 / 4 / 6', tablet: '6 / 2 / 7 / 3', mobile: '8 / 2 / 9 / 3' }, className: 'color-bg ' },
            // { itemId: 'data3', gridArea: { desktop: '3 / 6 / 4 / 7', tablet: '6 / 3 / 7 / 4', mobile: '9 / 1 / 10 / 3' }, className: 'data-container ' },
        ]
    },

    // // Layout 5 (corresponds to Image 5)
    // layout5: {
    //     gridSettings: {
    //         desktop: { columns: 6, rows: 'auto' },
    //         tablet: { columns: 4, rows: 'auto' },
    //         mobile: { columns: 2, rows: 'auto' }
    //     },
    //     placements: [
    //         { itemId: 'data2', gridArea: { desktop: '1 / 1 / 2 / 2', tablet: '1 / 1 / 2 / 2', mobile: '1 / 1 / 2 / 3' }, className: 'data-container ' },
    //         { itemId: 'main-slogan', gridArea: { desktop: '1 / 2 / 3 / 4', tablet: '1 / 2 / 3 / 4', mobile: '2 / 1 / 3 / 3' }, className: 'color-bg main-slogan ' },
    //         { itemId: 'image1', gridArea: { desktop: '1 / 4 / 3 / 5', tablet: '2 / 1 / 4 / 2', mobile: '3 / 1 / 5 / 3' }, className: 'image-item,  ' },
    //         { itemId: 'summary3', gridArea: { desktop: '2 / 1 / 3 / 2', tablet: '3 / 2 / 4 / 3', mobile: '5 / 1 / 6 / 3' }, className: 'color-bg ' },
    //         { itemId: 'image3', gridArea: { desktop: '3 / 1 / 4 / 2', tablet: '4 / 1 / 5 / 2', mobile: '6 / 1 / 7 / 2' }, className: 'image-item,  ' },
    //         { itemId: 'summary2', gridArea: { desktop: '3 / 2 / 4 / 4', tablet: '4 / 2 / 5 / 4', mobile: '6 / 2 / 7 / 3' }, className: 'color-bg   ' },
    //         { itemId: 'summary1', gridArea: { desktop: '3 / 4 / 4 / 5', tablet: '5 / 1 / 6 / 2', mobile: '7 / 1 / 8 / 3' }, className: 'color-bg ' },
    //         { itemId: 'data3', gridArea: { desktop: '3 / 5 / 4 / 6', tablet: '5 / 2 / 6 / 4', mobile: '8 / 1 / 9 / 3' }, className: 'data-container ' },
    //         { itemId: 'image2', gridArea: { desktop: '3 / 6 / 4 / 7', tablet: '6 / 1 / 7 / 2', mobile: '9 / 1 / 10 / 3' }, className: 'image-item,  ' },
    //     ]
    // },

    // // Layout 6 (corresponds to Image 6)
    // layout6: {
    //     gridSettings: {
    //         desktop: { columns: 6, rows: 'auto' },
    //         tablet: { columns: 4, rows: 'auto' },
    //         mobile: { columns: 2, rows: 'auto' }
    //     },
    //     placements: [
    //         { itemId: 'summary1', gridArea: { desktop: '1 / 1 / 2 / 3', tablet: '1 / 1 / 2 / 3', mobile: '1 / 1 / 2 / 3' }, className: 'color-bg' },
    //         { itemId: 'data1', gridArea: { desktop: '1 / 3 / 3 / 5', tablet: '1 / 3 / 3 / 5', mobile: '2 / 1 / 4 / 3' }, className: 'data-container' },
    //         { itemId: 'image1', gridArea: { desktop: '1 / 5 / 3 / 7', tablet: '2 / 1 / 4 / 3', mobile: '4 / 1 / 6 / 3' }, className: 'image-item,  ' },
    //         { itemId: 'main-slogan', gridArea: { desktop: '2 / 5 / 4 / 7', tablet: '3 / 3 / 5 / 5', mobile: '6 / 1 / 7 / 3' }, className: 'color-bg main-slogan' },
    //         { itemId: 'summary3', gridArea: { desktop: '2 / 1 / 3 / 2', tablet: '4 / 1 / 5 / 2', mobile: '7 / 1 / 8 / 2' }, className: 'color-bg' },
    //         { itemId: 'data3', gridArea: { desktop: '2 / 2 / 3 / 3', tablet: '4 / 2 / 5 / 3', mobile: '7 / 2 / 8 / 3' }, className: 'data-container' },
    //         { itemId: 'image3', gridArea: { desktop: '3 / 1 / 4 / 2', tablet: '5 / 1 / 6 / 2', mobile: '8 / 1 / 9 / 2' }, className: 'image-item,  ' },
    //         { itemId: 'image4', gridArea: { desktop: '3 / 2 / 4 / 3', tablet: '5 / 2 / 6 / 3', mobile: '8 / 2 / 9 / 3' }, className: 'image-item,  ' },
    //         { itemId: 'data2', gridArea: { desktop: '3 / 3 / 4 / 5', tablet: '5 / 3 / 6 / 5', mobile: '9 / 1 / 10 / 3' }, className: 'data-container' },
    //         { itemId: 'summary2', gridArea: { desktop: '4 / 3 / 5 / 5', tablet: '6 / 1 / 7 / 3', mobile: '10 / 1 / 11 / 3' }, className: 'color-bg' },
    //         { itemId: 'image2', gridArea: { desktop: '4 / 5 / 5 / 6', tablet: '6 / 3 / 7 / 4', mobile: '11 / 1 / 12 / 2' }, className: 'image-item,  ' },
    //         { itemId: 'data2', gridArea: { desktop: '4 / 6 / 5 / 7', tablet: '6 / 4 / 7 / 5', mobile: '11 / 2 / 12 / 3' }, className: 'data-container' },
    //     ]
    // }
};


export function renderLayout(layoutId, contentItems, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Get the layout definition
    const layoutDef = layoutDefinitions[layoutId];
    if (!layoutDef) {
        console.error(`Layout ${layoutId} not found`);
        return;
    }

    // Clear the container
    container.innerHTML = '';

    // Set up the grid container based on screen size
    const screenSize = getScreenSize();
    const gridSettings = layoutDef.gridSettings[screenSize];

    container.style.display = 'grid';
    container.style.gridTemplateColumns = `repeat(${gridSettings.columns}, 1fr)`;
    container.style.gridTemplateRows = gridSettings.rows;
    container.style.gap = '0px';

    // Create and add grid items based on placements
    layoutDef.placements.forEach(placement => {
        // Find the content item by ID
        const contentItem = contentItems.find(item => item.id === placement.itemId);
        if (!contentItem) {
            console.warn(`Content item with ID ${placement.itemId} not found`);
            return;
        }

        // Create the grid item
        const gridItem = createGridItem(contentItem, placement, screenSize);
        container.appendChild(gridItem);
    });
}


function createGridItem(contentItem, placement, screenSize) {
    const gridItem = document.createElement('div');
    gridItem.className = ` ${placement.className } grid-item`;
    gridItem.dataset.contentId = contentItem.id;
    gridItem.dataset.contentType = contentItem.type;

    // Use the stored colors with their corresponding text colors
    const baseColor = window.gridColors.primary.bg;
    const textColor = window.gridColors.primary.text;
    const colorRGBA = hexToRGBA(baseColor, 0.95);

    const textureNum = Math.floor(Math.random() * 4) + 1;
    const textturedBG = `url('textures/texture${textureNum}.png')`;
    const texturedFold = `url('textures/texture-fold.jpg')`;

    // Clear existing content
    gridItem.innerHTML = '';

    // Apply grid positioning based on screen size
    const gridArea = placement.gridArea[screenSize];
    if (gridArea) {
        const [rowStart, colStart, rowEnd, colEnd] = gridArea.split('/').map(s => s.trim());
        gridItem.style.gridRowStart = rowStart;
        gridItem.style.gridRowEnd = rowEnd;
        gridItem.style.gridColumnStart = colStart;
        gridItem.style.gridColumnEnd = colEnd;
    }

    // Add content based on type
    switch (contentItem.type) {
        case CONTENT_TYPES.HERO_TEXT: {
            gridItem.innerHTML = `
                <div class="inner">
                    <div class="content-text" style="background-color: ${colorRGBA}">
                        <div class="bg-texture" style="background-image: ${textturedBG}"></div>
                        <div class="hero-text" style="color: ${textColor}">${contentItem.content}</div>
                    </div>
                </div>
            `;
            gridItem.style.backgroundColor = baseColor;
            break;
        }
        case CONTENT_TYPES.HERO_TEXT_SMALL: {
            gridItem.innerHTML = `
                <div class="inner">
                    <div class="content-text" style="background-color: ${colorRGBA}">
                        <div class="bg-texture" style="background-image: ${texturedFold}"></div>
                        <div class="hero-text-small" style="color: ${textColor}">${contentItem.content}</div>
                    </div>
                </div>
            `;
            gridItem.style.backgroundColor = baseColor;
            break;
        }
        case CONTENT_TYPES.IMAGE: {
            gridItem.innerHTML = `<img src="${contentItem.src}" alt="${contentItem.alt || ''}" loading="lazy">`;
            break;
        }
        case CONTENT_TYPES.TEXT_SUMMARY: {
            gridItem.innerHTML = `
            <div class="inner">
                <div class="content-text" style="background-color: ${colorRGBA}">
                    <div class="bg-texture" style="background-image: ${textturedBG}"></div>
                    <div class="content-idea-text" style="color: ${textColor}">${contentItem.content}</div>
                </div>
            </div>
        `;
            break;
        }
        case 'DOMO': {
            const container = document.createElement('div');
            container.style.cssText = 'width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;';

            const img = document.createElement('img');
            img.src = 'domopalooza.png';
            img.alt = 'Domopalooza';
            img.style.cssText = 'max-width: 600px; max-height: 100%; object-fit: contain';

            container.appendChild(img);
            gridItem.appendChild(container);

            gridItem.style.padding = '10px';
            gridItem.style.backgroundColor = '#212121'; // Always use this specific color
            break;
        }
        case CONTENT_TYPES.DATA_VISUAL: {
            console.log('here is the content item',contentItem.content[0].chartType)
            const chartContainer = document.createElement('div');
            chartContainer.className = 'chart-container';
            chartContainer.style.cssText = `
                width: 100%;
                height: 100%;
                position: relative;
                padding: 10px;
                box-sizing: border-box;
            `;
            
            // Import the darkenColor function from gridCharts.js
            import('./gridCharts.js').then(module => {
                // Apply darkened background color
                const darkenedColor = module.darkenColor("#212121");
                gridItem.style.backgroundColor = darkenedColor;
                
                // Create semi-transparent overlay with the darkened color
                const colorRGBA = hexToRGBA(darkenedColor, 0.75);
                
                // Add overlay
                const overlay = document.createElement('div');
                overlay.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: ${colorRGBA};
                    z-index: 1;
                `;
                gridItem.appendChild(overlay);
            });
            
            gridItem.style.position = 'relative';
            
            // Create chart div with unique ID
            const chartId = `chart-${Math.random().toString(36).substring(2, 9)}`;
            const chartDiv = document.createElement('div');
            chartDiv.style.cssText = `
                width: 100%;
                height: 100%;
                position: relative;
                z-index: 2;
                padding: 10px;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: center;
                color: ${window.gridColors.primary.text};
            `;
            
            // Create a wrapper for better sizing control
            const chartWrapper = document.createElement('div');
            chartWrapper.style.cssText = `
                width: 100%;
                height: 100%;
                max-width: 900px;
                max-height: 600px;
                margin: auto;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            
            // Create single canvas element
            const canvas = document.createElement('canvas');
            canvas.id = chartId;
            canvas.style.cssText = `
                width: 100% !important;
                height: 100% !important;
                max-width: 100%;
                max-height: 100%;
            `;
            
            // Append elements in the correct order
            chartWrapper.appendChild(canvas);
            chartDiv.appendChild(chartWrapper);
            chartContainer.appendChild(chartDiv);
            gridItem.appendChild(chartContainer);
            
            // Generate some random data for the chart
            const chartData = generateRandomChartData();
            
            // Determine chart type from content value
            const chartType = contentItem.content[0].chartType || 'Bar Chart';
            
            // Create chart after a short delay to ensure DOM elements are mounted
            setTimeout(() => {
                createChart(chartId, chartType, chartData, {
                    colors: window.gridColors.all,
                    textColor: window.gridColors.primary.text
                });
            }, 0);
            
            break;
        }
        //   case CONTENT_TYPES.DATA_VISUAL:
        //     // Create placeholder for the chart
        //     const chartId = `chart-${contentItem.id}-${Date.now()}`;
        //     gridItem.innerHTML = `<div id="${chartId}" class="data-visual"></div>`;

        //     // Render the appropriate chart after the element is in the DOM
        //     setTimeout(() => {
        //       renderDataVisualization(contentItem, chartId);
        //     }, 0);
        //     break;

        default:
            console.log(contentItem)
            gridItem.textContent = 'Unknown content type';
    }

    return gridItem;
}


function getScreenSize() {
    const width = window.innerWidth;
    if (width >= 1024) return 'desktop';
    if (width >= 768) return 'tablet';
    return 'mobile';
}

/**
 * Handle window resize to adjust layout
 */
function handleResize() {
    const container = document.getElementById('grid-container');
    if (!container || !container.dataset || !container.dataset.currentLayout) {
        return;
    }

    const currentLayout = container.dataset.currentLayout;
    const layoutDef = layoutDefinitions[currentLayout];
    if (!layoutDef) {
        console.error(`Layout ${currentLayout} not found`);
        return;
    }

    // Get current screen size
    const screenSize = getScreenSize();
    const gridSettings = layoutDef.gridSettings[screenSize];
    
    // Apply grid settings for current screen size
    container.style.gridTemplateColumns = gridSettings.columns;
    container.style.gridTemplateRows = gridSettings.rows;

    // Update grid item positions
    const gridItems = container.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        const contentId = item.dataset.contentId;
        const placement = layoutDef.placements.find(p => p.itemId === contentId);
        
        if (placement && placement.gridArea[screenSize]) {
            const [rowStart, colStart, rowEnd, colEnd] = placement.gridArea[screenSize].split('/').map(s => s.trim());
            item.style.gridRowStart = rowStart;
            item.style.gridRowEnd = rowEnd;
            item.style.gridColumnStart = colStart;
            item.style.gridColumnEnd = colEnd;
        }
    });

    // Re-render charts if they exist
    gridItems.forEach(item => {
        if (item.dataset.contentType === CONTENT_TYPES.DATA_VISUAL) {
            const canvas = item.querySelector('canvas');
            if (canvas) {
                const chartData = generateRandomChartData();
                const chartType = gridData.items.find(i => i.id === item.dataset.contentId)?.content[0]?.chartType || 'Bar Chart';
                createChart(canvas.id, chartType, chartData, {
                    colors: window.gridColors.all,
                    textColor: window.gridColors.primary.text
                });
            }
        }
    });
}


function initGridSystem(initialLayoutId, containerId) {
    // Add basic styles
    const style = document.createElement('style');
    style.textContent = `
        .grid-item {
            border-radius: 0px;
            transition: all 0.3s ease-in-out;
        }
        
        .grid-item.hover-enabled:hover,
        .grid-item.focused {
            transform: scale(1.1);
            z-index: 100;
            border-radius: 8px;
            overflow: hidden;
        }
        
        .grid-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    `;

    document.head.appendChild(style);

    // Set the initial layout
    const container = document.getElementById(containerId);
    container.dataset.currentLayout = initialLayoutId;

    // Render the initial layout
    renderLayout(initialLayoutId, gridData.items, containerId);

    // Add resize handler
    window.addEventListener('resize', handleResize);

    // Start the focus animation after a short delay
    setTimeout(() => {
        startGridItemsFocus(containerId);
    }, 1000);
}

/**
 * Cycles through grid items adding a "focused" class temporarily
 * @param {string} containerId - The ID of the grid container
 */
function startGridItemsFocus(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const gridItems = Array.from(container.querySelectorAll('.grid-item'));
    if (gridItems.length === 0) return;

    let currentIndex = 0;
    const focusDuration = 2000; // Duration to keep focus on each item
    const animationDelay = 2500; // Total time between starting each item's focus

    function focusNextItem() {
        // Remove focus from all items
        gridItems.forEach(item => item.classList.remove('focused'));
        
        // Add focus to current item
        const currentItem = gridItems[currentIndex];
        currentItem.classList.add('focused');
        
        // Remove focus after duration
        setTimeout(() => {
            currentItem.classList.remove('focused');
        }, focusDuration);

        // Move to next item
        currentIndex = (currentIndex + 1) % gridItems.length;
    }

    // Start the cycle
    focusNextItem();
    const intervalId = setInterval(focusNextItem, animationDelay);

    // Store the interval ID on the container for cleanup
    container.dataset.focusIntervalId = intervalId;

    // Add event listener to stop animation on hover
    container.addEventListener('mouseenter', () => {
        clearInterval(intervalId);
        gridItems.forEach(item => item.classList.remove('focused'));
    });

    // Optional: Restart animation when mouse leaves
    container.addEventListener('mouseleave', () => {
        const newIntervalId = setInterval(focusNextItem, animationDelay);
        container.dataset.focusIntervalId = newIntervalId;
    });
}




// Example usage:
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('grid-container');
    if (!container) {
        console.error('Grid container element not found. Make sure an element with id "grid-container" exists.');
        return;
    }

    // Generate random layout index (1-6) and get the corresponding layout ID
    const randomLayoutIndex = Math.floor(Math.random() * 4) + 1;
    const selectedLayout = `layout${randomLayoutIndex}`;


    console.log('the layout', selectedLayout)

    // Fetch the data file
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json(); // Parse as JSON instead of text
        })
        .then(jsonData => {
            // Create a color theme
            setRandomThemeColors();

            // Enable hover effects after page load
            requestAnimationFrame(() => {
                const gridItems = document.querySelectorAll('.grid-item');
                for (let item of gridItems) {
                    item.classList.add('hover-enabled');
                }
            });
            gridData = jsonData; // Update the gridData with parsed JSON
            initGridSystem('layout1', 'grid-container'); // Initialize with the randomly selected layout
        })
        .catch(error => {
            console.error('Error loading data:', error);
            container.innerHTML = '<div class="error-message">Error loading grid data</div>';
        });
});



function generateRandomChartData() {
    // Generate between 3-8 data points
    const count = Math.floor(Math.random() * 6) + 3;
    const data = [];
    
    // Generate category names
    const categories = ['Speed', 'Power', 'Handling', 'Control', 'Efficiency', 'Innovation', 'Style', 'Performance'];
    
    for (let i = 0; i < count; i++) {
        data.push({
            category: categories[i % categories.length],
            value: Math.floor(Math.random() * 90) + 10
        });
    }
    
    return data;
}

//Create a chart based on the provided type and data
async function createChart(chartId, chartType, data, colorConfig) {
    console.log('chart type',chartType, chartId)
    // Get the canvas element
    const canvas = document.getElementById(chartId);
    if (!canvas) {
        console.error(`Canvas element with id '${chartId}' not found`);
        return;
    }
    
    // Get theme colors
    const colors = colorConfig.colors || window.gridColors.all || ['#99CCEE', '#39464F', '#B2D7F0', '#222C33'];
    const textColor = colorConfig.textColor || window.gridColors.primary.text || '#000000';

    try {
        // Import chart functions from gridCharts.js
        const module = await import('./gridCharts.js');
        
        // Create chart based on type
        let chart;
        switch(chartType.toLowerCase()) {
            case 'bar chart':
                chart = module.createBarChart(colors[0], chartId, textColor);
                break;
            case 'pie chart':
                chart = module.createPieChart(colors[0], chartId, textColor);
                break;
            case 'area chart':
                chart = module.createPolarAreaChart(colors[0], chartId, textColor);
                break;
            case 'combined chart':
                chart = module.createBubbleChart(colors[0], chartId, textColor);
                break;
            default:
                chart = module.createPieChart(colors[0], chartId, textColor);
        }
    } catch (error) {
        console.error('Error creating chart:', error);
        canvas.parentElement.innerHTML = `
            <div style="
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                color: ${textColor};
                padding: 10px;
                font-size: 12px;
            ">
                Error loading chart: ${error.message}
            </div>
        `;
    }
}
