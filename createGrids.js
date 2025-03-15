const domopaloozaImages = [
    "/images/1.png",
    "/images/3.png",
    "/images/8.png",
    "/images/9.png",
    "/images/15.png",
    "/images/16.png",
    "/images/31.png",
    "/images/46.png",
    "/images/11.png",
    "/images/20.png",
    "/images/32.png",
    "/images/37.png",
    "/images/26.png",
    "/images/41.png",
    "/images/6.png",
    "/images/21.png"
]






let imagePool = []
let usedImages = []

let titlePool = []
let usedTitles = []

let summaryPool = []
let usedSummaries = []
let summaryCount = 0

let kpi
let kpiSummary





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
            colors: ['#7A3CA3', '#9563B5', '#AF8AC8', '#CAB1DA'],
            textColors: ['#CAB1DA', '#CAB1DA', '#F2EBF6', '#CAB1DA']
        },
        green: {
            colors: ['#569C3C', '#78B063', '#9AC48A', '#BBD7B1'],
            textColors: ['#F2EBF6', '#3D8223', '#F2EBF6', '#3D8223']
        },
        pink: {
            colors: ['#A82593', '#B13B9E', '#C266B3', '#D392C9'],
            textColors: ['#E5BEDF', '#E5BEDF', '#E5BEDF', '#E5BEDF']
        }
    };

    // Get all available theme names
    const themeNames = Object.keys(COLOR_ARRAYS);

    // Choose a random theme
    const randomTheme = themeNames[Math.floor(Math.random() * themeNames.length)];
    const colorSet = COLOR_ARRAYS[randomTheme];

    // Store the colors and their corresponding text colors
    window.gridColors = {
        primary: { bg: colorSet.colors[0], text: colorSet.textColors[0] },
        secondary: { bg: colorSet.colors[1], text: colorSet.textColors[1] },
        tertiary: { bg: colorSet.colors[2], text: colorSet.textColors[2] },
        quaternary: { bg: colorSet.colors[3], text: colorSet.textColors[3] },
        all: colorSet.colors,
        currentTheme: randomTheme // Store the current theme name for reference
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
                columns: "repeat(8, 1fr)",
                rows: "repeat(3, 1fr)"

 
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
            {
                itemId: 'main-slogan',
                gridArea: {
                    desktop: '1 / 1 / span 2 / span 2',
                    tablet: '1 / 1 / span  / span 2',
                    mobile: '1 / 1 / 2 / 3'
                }, className: 'color-bg main-slogan grid-item '
            },

            {
                itemId: 'image1',
                gridArea: {
                    desktop: '1 / 3 / span 2 / span 1',
                    tablet: '1 / 3 / span 2 / span 1',
                    mobile: '1 / 3 / span 2 / span 1'
                }, className: 'image-item'
            },
            // { itemId: 'image11', gridArea: { desktop: '1 / 6 / span 2 / span 1', tablet: '4 / 1 / 5 / 2', mobile: '4 / 1 / 5 / 2' }, className: 'image-item ' },
            { itemId: 'summary1', gridArea: { desktop: '2 / 4 / auto / span 2', tablet: '4 / 2 / 6 / 4', mobile: '5 / 1 / 7 / 3' }, className: 'image-item ' },
            // { itemId: 'image4', gridArea: { desktop: '3 / 6 / 4 / 7', tablet: '6 / 1 / 7 / 2', mobile: '7 / 1 / 8 / 3' }, className: 'image-item ' },

            {
                itemId: 'data2', 
                gridArea: {
                    desktop: '1 / 6 / span 2 / span 2',
                    tablet: '2 / 1 / span 1 / span 2',
                    mobile: '2 / 1 / 3 / 3'
                }, 
                className: 'data-container chart-wrapper'
            },

            {
                itemId: 'data1', 
                gridArea: {
                    desktop: '1 / 4 / span 2 / span 2',
                    tablet: '4 / 1 / span 2 / span 3',
                    mobile: '3 / 1 / 4 / 3'
                }, 
                className: 'data-container chart-wrapper'
            },

            {
                itemId: 'data3', 
                gridArea: {
                    desktop: '3 / 5 / span 1 / span 2',
                    tablet: '7 / 1 / span 1 / span 2',
                    mobile: '4 / 1 / 5 / 3'
                }, 
                className: 'data-container chart-wrapper'
            },
           

            {
                itemId: 'domopalooza', gridArea: {
                    desktop: '3 / 1 / auto  / span 2',
                    tablet: '3 / 1 / span 1 / span 3',
                    mobile: '6 / 1 / 3 / 3'
                }, className: 'color-bg'
            },
            { itemId: 'image2', gridArea: { desktop: '3 / 3 / span 1 / span 2', tablet: '9 / 1 / 10 / 2', mobile: '10 / 1 / 11 / 3' }, className: 'color-bg' },


            { itemId: 'titleCard', gridArea: { desktop: '3 / 4 / auto / span 1', tablet: '8 / 1 / 9 / 3', mobile: '9 / 1 / 10 / 3' }, className: 'color-bg' },

            { itemId: 'summary2', gridArea: { desktop: '3 / 6 / auto / span 2', tablet: '6 / 1 / span 1 / span 3', mobile: '9 / 1 / 10 / 3' }, className: 'color-bg' },
            { itemId: 'image3', gridArea: { desktop: '3 / 3 / auto / span 1', tablet: '9 / 1 / 10 / 2', mobile: '10 / 1 / 11 / 3' }, className: 'color-bg ' },
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
            { itemId: 'data3', gridArea: { desktop: '1 / 3 / 3 / span 2', tablet: '1 / 3 / span 2 / span 2', mobile: '3 / 1 / span 3 / 3' }, className: 'data-container ' },
            { itemId: 'summary3', gridArea: { desktop: '1 / 1 / 2 / 2', tablet: '4 / 1 / span 2 / span 4', mobile: '6 / 1 / span 2 / 3' }, className: 'color-bg main-slogan ' },
            { itemId: 'image5', gridArea: { desktop: '2 / 1 / 3 / 2', tablet: '3 / 3 / 4 / 5', mobile: '8 / 1 / span 1 / span 1' }, className: 'image-item,  ' },
            { itemId: 'summary2', gridArea: { desktop: '2 / 2 / 3 / 3', tablet: '11 / 3 / span 1 / span 2', mobile: '8 / 2 / span 1 / span 1' }, className: 'color-bg ' },
            { itemId: 'image3', gridArea: { desktop: '3 / 3 / auto / span 1', tablet: '11 / 1 / span 1 / span 2', mobile: '13 / 1 / span 1 / 3' }, className: 'color-bg ' },
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
    gridItem.className = `${placement.className} grid-item loading`;
    gridItem.dataset.contentId = contentItem.id;
    gridItem.dataset.contentType = contentItem.type;

    // Add loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading-indicator';
    gridItem.appendChild(loadingIndicator);

    // Calculate stagger delay based on grid position
    const gridArea = placement.gridArea[screenSize];
    let [rowStart, colStart] = gridArea.split('/').map(s => s.trim());
    rowStart = parseInt(rowStart);
    colStart = parseInt(colStart);
    const staggerDelay = (rowStart + colStart) * 100; // 100ms delay per position

    // Function to remove loading state with stagger
    const removeLoading = () => {
        setTimeout(() => {
            gridItem.classList.remove('loading');
            // Add a fade-in class for smooth appearance
            gridItem.classList.add('fade-in');
        }, 500 + staggerDelay); // Base delay + stagger delay
    };

    // Use the stored colors with their corresponding text colors
    const baseColor = window.gridColors.primary.bg;
    const textColor = window.gridColors.primary.text;
    const colorRGBA = hexToRGBA(baseColor, 0.95);

    const textTuredBGOptions = ['textures/texture2.jpg', 'textures/texture3.jpg']
    const randomTextureIndex = Math.floor(Math.random() * textTuredBGOptions.length);
    const textturedBG = `url('${textTuredBGOptions[randomTextureIndex]}')`;
    const titleCardBg = `url('textures/texture1.jpg')`;

    // Clear existing content
    gridItem.innerHTML = '';
    gridItem.appendChild(loadingIndicator);

    // Apply grid positioning based on screen size
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
                <div class="loading-indicator"></div>
                <div class="inner">
                    <div class="content-text hero-text-wrapper" style="background-color: ${colorRGBA}">
                        <div class="bg-texture" style="background-image: ${titleCardBg}"></div>
                        
                        <div class="hero-text kpi-text" style="color: ${textColor}">${contentItem.content}</div>

                        <div class="hero-text" style="color: ${textColor}">${contentItem.contentSummary}</div>
                    </div>
                </div>
            `;
            gridItem.style.backgroundColor = baseColor;
            removeLoading();
            break;
        }
        case CONTENT_TYPES.HERO_TEXT_SMALL: {
            summaryCount += 1

            console.log('summaryCount', summaryCount)
            gridItem.innerHTML = `
                <div class="loading-indicator"></div>
                <div class="inner">
                    <div class="content-text hero-text-small-wrapper" style="background-color: ${colorRGBA}">
                        <div class="bg-texture" style="background-image: ${textturedBG}"></div>
                        <div class="hero-text-small" style="color: ${textColor}">${contentItem.content}</div>
                    </div>
                </div>
            `;
            gridItem.style.backgroundColor = baseColor;
            removeLoading();
            break;
        }
        case CONTENT_TYPES.IMAGE: {
            const img = new Image();
            // img.src = contentItem.src;
            img.src = domopaloozaImages[contentItem.index];
            img.alt = contentItem.alt || '';
            img.loading = 'lazy';
            img.onload = removeLoading;
            gridItem.appendChild(img);
            break;
        }
        // case CONTENT_TYPES.TEXT_SUMMARY: {
        //     gridItem.innerHTML = `
        //         <div class="loading-indicator"></div>
        //         <div class="inner">
        //             <div class="content-text" style="background-color: ${colorRGBA}">
        //                 <div class="bg-texture" style="background-image: ${textturedBG}"></div>
        //                 <div class="content-idea-text" style="color: ${textColor}">${contentItem.content}</div>
        //             </div>
        //         </div>
        //     `;
        //     removeLoading();
        //     break;
        // }
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
            removeLoading();
            break;
        }
        case CONTENT_TYPES.DATA_VISUAL: {
            console.log('Creating data visualization for:', contentItem);
            
            // Get chart data and type
            const chartData = contentItem.content[0].data || generateRandomChartData();
            const chartType = contentItem.content[0].chartType || 'Bar Chart';
            const chartId = `chart-${contentItem.id}-${Math.random().toString(36).substring(2, 9)}`;

            console.log(`Setting up chart ${chartType} with ID ${chartId}`, { data: chartData });

            // Create a container for the chart
            const chartContainer = document.createElement('div');
            chartContainer.className = 'chart-container';
            chartContainer.style.cssText = `
                width: 100%;
                height: 100%;
                min-height: 300px;
                position: relative;
                z-index: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: rgba(33, 33, 33, 0.75);
                padding: 20px;
            `;

            // Create canvas element
            const canvas = document.createElement('canvas');
            canvas.id = chartId;
            canvas.style.cssText = `
                width: 100% !important;
                height: 100% !important;
                max-width: 100%;
                max-height: 100%;
                position: relative;
                z-index: 3;
            `;

            // Append canvas to container
            chartContainer.appendChild(canvas);
            
            // Append container to grid item
            gridItem.appendChild(chartContainer);

            // Create chart after ensuring the container is in the DOM
            const createChartWithRetry = async (attempts = 0) => {
                const maxAttempts = 10;
                const retryDelay = 100;

                if (attempts >= maxAttempts) {
                    console.error(`Failed to create chart after ${maxAttempts} attempts`);
                    return;
                }

                try {
                    const canvasElement = document.getElementById(chartId);
                    if (!canvasElement) {
                        setTimeout(() => createChartWithRetry(attempts + 1), retryDelay);
                        return;
                    }

                    const module = await import('./gridCharts.js');
                    let chart;

                    if (chartType.toLowerCase().includes('pie')) {
                        chart = await module.createPieChart(window.gridColors.all[0], chartId, chartData);
                    } else if (chartType.toLowerCase().includes('bar')) {
                        chart = await module.createBarChart(window.gridColors.all[0], chartId, chartData);
                    } else if (chartType.toLowerCase().includes('area')) {
                        chart = await module.createAreaChart(window.gridColors.all[0], chartId, chartData);
                    } else {
                        chart = await module.createBarChart(window.gridColors.all[0], chartId, chartData);
                    }

                    if (chart) {
                        console.log('Chart created successfully:', chart);
                        removeLoading();
                    }
                } catch (error) {
                    console.error('Error creating chart:', error);
                    if (attempts < maxAttempts - 1) {
                        setTimeout(() => createChartWithRetry(attempts + 1), retryDelay);
                    } else {
                        const errorDiv = document.createElement('div');
                        errorDiv.style.cssText = `
                            width: 100%;
                            height: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            text-align: center;
                            color: ${window.gridColors.primary.text};
                            padding: 10px;
                            font-size: 12px;
                            background-color: rgba(33, 33, 33, 0.75);
                        `;
                        errorDiv.textContent = `Error creating chart: ${error.message}`;
                        chartContainer.innerHTML = '';
                        chartContainer.appendChild(errorDiv);
                        removeLoading();
                    }
                }
            };

            // Start the chart creation process
            requestAnimationFrame(() => {
                setTimeout(() => createChartWithRetry(), 50);
            });

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
            removeLoading();
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
                createChart(chartType, canvas.id, chartData, {
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
            position: relative;
            background-color: rgba(33, 33, 33, 0.2);
            opacity: 1;
            transform: translateY(0);
        }
        
        .grid-item.fade-in {
            opacity: 1;
            transform: translateY(0);
            transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }
        
        .grid-item.loading {
            opacity: 0.7;
            background-color: rgba(33, 33, 33, 0.2);
        }
        
        .grid-item.loading .inner,
        .grid-item.loading img,
        .grid-item.loading .chart-container,
        .grid-item.loading .content-text {
            opacity: 0;
            visibility: hidden;
        }

        .grid-item .inner,
        .grid-item img,
        .grid-item .chart-container,
        .grid-item .content-text {
            opacity: 1;
            visibility: visible;
            transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
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

        .loading-indicator {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 40px;
            height: 40px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: #fff;
            animation: spin 1s ease-in-out infinite;
            opacity: 0;
            visibility: hidden;
        }

        .grid-item.loading .loading-indicator {
            opacity: 1;
            visibility: visible;
        }

        @keyframes spin {
            to { transform: translate(-50%, -50%) rotate(360deg); }
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
    const layouts = ['layout1', 'layout2'];
    // const selectedLayout = layouts[Math.floor(Math.random() * layouts.length)];
    const selectedLayout = 'layout1';
    // console.log('Selected layout:', selectedLayout);

    // Fetch the data file
    fetch('data/marketingData.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then(jsonData => {
            // Create a color theme
            setRandomThemeColors();

            // Get random selection of objects
            const randomObjects = getRandomObjects(jsonData);

            // Update gridData with random selection
            gridData = { items: randomObjects };

            // Enable hover effects after page load
            requestAnimationFrame(() => {
                const gridItems = document.querySelectorAll('.grid-item');
                for (let item of gridItems) {
                    item.classList.add('hover-enabled');
                }
            });

            initGridSystem(selectedLayout, 'grid-container');
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

// Create a chart based on the provided type and data
async function createChart(chartType, chartId, data, colorConfig) {
    console.log('Creating chart with:', { chartType, chartId, data, colorConfig });

    try {
        // Import chart functions from gridCharts.js
        const module = await import('./gridCharts.js');

        // Create chart container with a fixed height to ensure proper rendering
        const chartContainer = document.createElement('div');
        chartContainer.className = 'chart-container';
        chartContainer.style.cssText = `
            width: 100%;
            height: 100%;
            min-height: 300px;
            position: relative;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgba(33, 33, 33, 0.75);
            padding: 20px;
        `;

        // Create canvas element
        const canvas = document.createElement('canvas');
        canvas.id = chartId;
        canvas.style.cssText = `
            width: 100% !important;
            height: 100% !important;
            max-width: 100%;
            max-height: 100%;
            position: relative;
            z-index: 3;
        `;

        // Append canvas directly to container
        chartContainer.appendChild(canvas);

        // Create and return a promise that resolves when the chart is created
        return new Promise((resolve) => {
            // Function to create the chart
            const createChartInstance = async () => {
                try {
                    // Normalize chart type
                    const normalizedChartType = (chartType || '').toLowerCase().trim();
                    console.log(`Creating ${normalizedChartType} chart with ID: ${chartId}`);

                    // Create chart based on type
                    let chart;
                    if (normalizedChartType.includes('pie')) {
                        console.log('Creating pie chart with data:', data);
                        chart = await module.createPieChart(colorConfig.colors[0], chartId, data);
                    } else if (normalizedChartType.includes('bar')) {
                        chart = await module.createBarChart(colorConfig.colors[0], chartId, data);
                    } else if (normalizedChartType.includes('area')) {
                        chart = await module.createAreaChart(colorConfig.colors[0], chartId, data);
                    } else {
                        console.warn(`Unknown chart type: ${chartType}, defaulting to bar chart`);
                        chart = await module.createBarChart(colorConfig.colors[0], chartId, data);
                    }

                    console.log(`Chart created successfully:`, chart);
                    resolve(chartContainer);
                } catch (error) {
                    console.error('Error creating chart:', error);
                    const errorDiv = document.createElement('div');
                    errorDiv.style.cssText = `
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        text-align: center;
                        color: ${colorConfig.textColor};
                        padding: 10px;
                        font-size: 12px;
                        background-color: rgba(33, 33, 33, 0.75);
                    `;
                    errorDiv.textContent = `Error creating chart: ${error.message}`;
                    chartContainer.innerHTML = '';
                    chartContainer.appendChild(errorDiv);
                    resolve(chartContainer);
                }
            };

            // Wait for next frame to ensure DOM is ready
            requestAnimationFrame(() => {
                // Small delay to ensure canvas is in DOM
                setTimeout(createChartInstance, 50);
            });
        });
    } catch (error) {
        console.error('Error in chart creation process:', error);
        const errorContainer = document.createElement('div');
        errorContainer.style.cssText = `
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: ${colorConfig.textColor};
            padding: 10px;
            font-size: 12px;
            background-color: rgba(33, 33, 33, 0.75);
        `;
        errorContainer.textContent = `Error in chart creation: ${error.message}`;
        return errorContainer;
    }
}


function shuffleArray(array) {
    const newArray = [...array];
    let i = newArray.length;
    while (i > 0) {
        const j = Math.floor(Math.random() * i--);
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function getRandomObjects(jsonData) {
    // Select a random array item from the JSON data
    const randomArrayItem = Math.floor(Math.random() * jsonData.length);
    const gridDataArray = jsonData[randomArrayItem];

    // Shuffle and store summary options
    summaryPool = shuffleArray(gridDataArray.summaryOptions);

    // Store KPI data
    kpi = gridDataArray.kpiCards[0].kpi;
    kpiSummary = gridDataArray.kpiCards[0].summary;

    // Create a shuffled pool of images
    const shuffledImages = shuffleArray([...domopaloozaImages]);
    let currentImageIndex = 0;

    let currentDataVisualIndex = 0;

    // Collect all unique image IDs from the layout definitions
    const imageIds = new Set();
    Object.values(layoutDefinitions).forEach(layout => {
        layout.placements.forEach(placement => {
            if (placement.itemId.startsWith('image')) {
                imageIds.add(placement.itemId);
            }
        });
    });

    // Create a map of image objects for each image ID
    const imageObjects = {};
    Array.from(imageIds).forEach(imageId => {
        const image = shuffledImages[currentImageIndex % shuffledImages.length];
        imageObjects[imageId] = {
            id: imageId,
            type: CONTENT_TYPES.IMAGE,
            src: image,
            alt: `Grid Image ${imageId}`,
            index: currentImageIndex
        };
        currentImageIndex++;
    });

    const selectedObjects = [];
    const numObjectsNeeded = 12;

    // Create objects for each grid position
    for (let i = 0; i < numObjectsNeeded; i++) {
        let transformedObject;

        switch (i) {
            case 0:
                // Main slogan with KPI data
                transformedObject = {
                    id: 'main-slogan',
                    type: CONTENT_TYPES.HERO_TEXT,
                    content: kpi,
                    contentSummary: kpiSummary
                };
                break;

            case 1:
            case 2:
                // Text summaries
                transformedObject = {
                    id: `summary${i}`,
                    type: CONTENT_TYPES.HERO_TEXT_SMALL,
                    content: summaryPool[i - 1] || 'Summary content'
                };
                break;

            case 3:
                transformedObject = {
                    id: 'domopalooza',
                    type: 'DOMO'
                };
                break;

            case 4:
            case 5:
                // Images - use pre-created image objects
                const imageId = `image${i-3}`; // This will create image1, image2, etc.
                transformedObject = imageObjects[imageId] || {
                    id: imageId,
                    type: CONTENT_TYPES.IMAGE,
                    src: shuffledImages[currentImageIndex % shuffledImages.length],
                    alt: `Grid Image ${i}`,
                    index: currentImageIndex++
                };
                break;

            case 6:
                // Title card
                transformedObject = {
                    id: 'titleCard',
                    type: CONTENT_TYPES.HERO_TEXT_SMALL,
                    content: summaryPool[i - 1] || 'Summary content'
                };
                break;

            case 7:
                transformedObject = {
                    id: `summary${i}`,
                    type: CONTENT_TYPES.HERO_TEXT_SMALL,
                    content: summaryPool[i - 1] || 'Summary content'
                };
                break;

            case 8:
            case 9:
            case 10: {
                // Data visualizations with proper index handling
                const chartIndex = i - 8; // This will give us 0, 1, 2 for the three chart positions
                const chartId = `data${i-7}`;
                
                // Get chart data from the array or generate fallback
                let chartData;
                let chartType;
                
                if (gridDataArray.charts && gridDataArray.charts[chartIndex] && gridDataArray.charts[chartIndex].content[0]) {
                    chartData = gridDataArray.charts[chartIndex].content[0].data;
                    chartType = gridDataArray.charts[chartIndex].content[0].chartType;
                } else {
                    chartData = generateRandomChartData();
                    chartType = chartIndex === 0 ? 'Bar Chart' : chartIndex === 1 ? 'Pie Chart' : 'Area Chart';
                }

                console.log(`Creating chart ${chartId} of type ${chartType}`, { chartData });

                transformedObject = {
                    id: chartId,
                    type: CONTENT_TYPES.DATA_VISUAL,
                    content: [{
                        chartType: chartType,
                        data: chartData
                    }]
                };
                break;
            }
     

            default:
                // Additional items alternate between images and summaries
                if (i % 2 === 0) {
                    const fallbackImageId = `image${Math.floor(i/2)}`;
                    transformedObject = imageObjects[fallbackImageId] || {
                        id: fallbackImageId,
                        type: CONTENT_TYPES.IMAGE,
                        src: shuffledImages[currentImageIndex % shuffledImages.length],
                        alt: `Grid Image ${i}`,
                        index: currentImageIndex++
                    };
                } else {
                    transformedObject = {
                        id: `summary${i}`,
                        type: CONTENT_TYPES.HERO_TEXT_SMALL,
                        content: summaryPool[i] || 'Additional content'
                    };
                }
        }

        selectedObjects.push(transformedObject);
    }

    // Add any remaining image objects that weren't added in the switch statement
    Object.values(imageObjects).forEach(imageObj => {
        if (!selectedObjects.some(obj => obj.id === imageObj.id)) {
            selectedObjects.push(imageObj);
        }
    });

    return selectedObjects;
}
