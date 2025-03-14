const layout1 = [
    // First row
    // Top Left stacked Grid items
    {
        rowStart: 1, rowEnd: 2, colStart: 1, colEnd: 2, // First column, first row
        content: { type: 'image', src: '/images/item1.jpg', alt: 'Item 1' }
    },
    {
        rowStart: 2, rowEnd: 3, colStart: 1, colEnd: 2, // First column, second row
        content: { type: 'image', src: '/images/item2.jpg', alt: 'Item 2' }
    },
    {
        rowStart: 1, rowEnd: 3, colStart: 2, colEnd: 5, // Columns 2-4, spanning both rows
        content: { type: 'image', src: '/images/large-image.jpg', alt: 'Large image' }
    },

    
    // Big Text column 3
    {
      rowStart: 1, rowEnd: 2, colStart: 5, colEnd: 7,
      bgColor: '#5da03a',
      content: { 
        type: 'text', 
        tag: 'h2', 
        className: 'promo-header',
        text: 'IHERB ANNIVERSARY SALE: 20% OFF ALL SUPPLEMENTS!' 
      }
    },
    // Big Image column 4
    {
      rowStart: 1, rowEnd: 2, colStart: 7, colEnd: 9,
      content: { 
        type: 'product', 
        src: '/images/vitamin-d.jpg', 
        name: 'Vitamin D3' 
      }
    },
    
    // Second row
    {
      rowStart: 2, rowEnd: 3, colStart: 1, colEnd: 3,
      content: { type: 'image', src: '/images/forest-meditation.jpg', alt: 'Person meditating in forest' }
    },
    {
      rowStart: 2, rowEnd: 3, colStart: 3, colEnd: 5,
      content: { type: 'image', src: '/images/rainbow-bowls.jpg', alt: 'Colorful stacked bowls' }
    },
    {
      rowStart: 2, rowEnd: 3, colStart: 5, colEnd: 7,
      overlayText: 'MACA ROOT POWDER FOR ENDURING STRENGTH AND REDUCED FATIGUE IN YOUR WORKOUTS.',
      bgColor: '#5da03a'
    },
    {
      rowStart: 2, rowEnd: 3, colStart: 7, colEnd: 9,
      content: { 
        type: 'text', 
        text: 'LIGHT GREEN / SYMBOLIZES GROWTH, ENERGY, AND VITALITY IN NATURE.' 
      },
      bgColor: '#8ebb76'
    },
    
    // Third row
    {
      rowStart: 3, rowEnd: 4, colStart: 1, colEnd: 3,
      content: { type: 'image', src: '/images/yoga-mat.jpg', alt: 'Green yoga mat' },
      overlayText: 'PASTEL SAGE / OFFERS A SOOTHING, HARMONIOUS COMPLEMENT TO THE PRIMARY COLORS.'
    },
    {
      rowStart: 3, rowEnd: 4, colStart: 3, colEnd: 5,
      content: { type: 'image', src: '/images/iherb-bag.jpg', alt: 'iHerb bag' }
    },
    {
      rowStart: 3, rowEnd: 4, colStart: 5, colEnd: 7,
      content: { 
        type: 'product', 
        src: '/images/spirulina.jpg', 
        name: 'Spirulina' 
      }
    },
    {
      rowStart: 3, rowEnd: 4, colStart: 7, colEnd: 9,
      content: { type: 'image', src: '/images/water-bottle.jpg', alt: 'Stainless steel water bottle' },
      overlayText: 'PASTEL OLIVE / REFLECTS THE EARTHY, NATURAL TONES FOUND IN OUTDOOR ENVIRONMENTS.'
    }
  ];