
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Add a small performance optimization to defer hover effects until after page load
  setTimeout(() => {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
      item.classList.add('hover-enabled');
    });
  }, 100);
});
