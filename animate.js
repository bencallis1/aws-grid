// Function to get the center position of an element
function getElementCenter(element) {
    const rect = element.getBoundingClientRect();
    return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
    };
}

// Function to get the center of the grid container
function getGridCenter(gridContainer) {
    const rect = gridContainer.getBoundingClientRect();
    return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
    };
}

// Function to calculate the distance and angle between two points
function getDistanceAndAngle(from, to) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    return {
        distance: Math.sqrt(dx * dx + dy * dy),
        angle: Math.atan2(dy, dx)
    };
}

// Main animation function
export function animateGridItemsFromCenter(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const gridItems = container.querySelectorAll('.grid-item');
    const gridCenter = getGridCenter(container);

    // First pass: Store final positions
    const finalPositions = new Map();
    gridItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        finalPositions.set(item, {
            rect,
            transform: item.style.transform || '',
            position: item.style.position || '',
            left: item.style.left || '',
            top: item.style.top || ''
        });
    });

    // Second pass: Animate items
    gridItems.forEach(item => {
        const finalPos = finalPositions.get(item);
        
        // Force item to be visible but transparent
        item.style.opacity = '0';
        item.style.visibility = 'visible';
        
        // Set initial position
        item.style.position = 'fixed';
        item.style.left = `${gridCenter.x}px`;
        item.style.top = `${gridCenter.y}px`;
        item.style.transform = 'translate(-50%, -50%) scale(0.5)';
        
        // Force a reflow
        item.offsetHeight;

        // Calculate the movement needed
        const { distance } = getDistanceAndAngle(
            gridCenter,
            { x: finalPos.rect.left + finalPos.rect.width / 2, y: finalPos.rect.top + finalPos.rect.height / 2 }
        );
        
        const delay = Math.random() * 0.3; // Random delay between 0 and 0.3 seconds
        const duration = 0.6 + (distance / 1000); // Base duration plus distance factor

        // Set up the animation
        item.style.transition = `all ${duration}s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s`;
        
        // Animate to final position
        requestAnimationFrame(() => {
            item.style.opacity = '1';
            item.style.transform = finalPos.transform || 'none';
            item.style.position = finalPos.position;
            item.style.left = finalPos.left;
            item.style.top = finalPos.top;

            // Clean up after animation
            item.addEventListener('transitionend', function cleanup(e) {
                if (e.propertyName === 'transform') {
                    item.style.transition = '';
                    item.removeEventListener('transitionend', cleanup);
                }
            });
        });
    });
}

// Function to prepare grid items for animation
export function prepareGridItemsForAnimation(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const style = document.createElement('style');
    style.textContent = `
        .grid-item {
            visibility: hidden;
            will-change: transform, opacity;
        }
    `;
    document.head.appendChild(style);
}

// Example usage in your grid initialization:
/*
document.addEventListener('DOMContentLoaded', () => {
    prepareGridItemsForAnimation('grid-container');
    // ... your other grid initialization code ...
    
    // Start the animation after the grid is ready
    requestAnimationFrame(() => {
        animateGridItemsFromCenter('grid-container');
    });
});
*/ 