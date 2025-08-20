const carousel = document.querySelector('#carouselExampleCaptions .carousel-inner');
const items = document.querySelectorAll('.carousel-item');
let isDragging = false;
let startX, scrollLeft, currentIndex = 0;
let transitionEnabled = true;

const setActiveItem = (index) => {
  items.forEach((item, i) => {
    if (i === index) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
};

// Disable Bootstrap's automatic slide
const carouselElement = document.querySelector('#carouselExampleCaptions');
carouselElement.addEventListener('slide.bs.carousel', (event) => {
  event.preventDefault();
});

// Mouse down event to start dragging
carousel.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX;
  scrollLeft = carousel.scrollLeft;
  carousel.style.cursor = 'grabbing';
  transitionEnabled = false; // Disable transition during drag
});

// Mouse up event to stop dragging
carousel.addEventListener('mouseup', () => {
  isDragging = false;
  carousel.style.cursor = 'grab';
  transitionEnabled = true; // Enable transition after drag

  // Adjust sliding threshold
  const threshold = 50; // Minimum distance to consider as slide

  if (Math.abs(startX - scrollLeft) > threshold) {
    if (startX > scrollLeft) {
      // Move to next slide
      currentIndex = (currentIndex + 1) % items.length; // Loop to the first slide
    } else {
      // Move to previous slide
      currentIndex = (currentIndex - 1 + items.length) % items.length; // Loop to the last slide
    }
  }

  setActiveItem(currentIndex);
});

// Mouse leave event to stop dragging
carousel.addEventListener('mouseleave', () => {
  isDragging = false;
  carousel.style.cursor = 'grab';
});

// Mouse move event to handle dragging
carousel.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();

  const x = e.pageX;
  const walk = (x - startX) * 2; // Adjust scroll speed by multiplying
  carousel.scrollLeft = scrollLeft - walk;
});

// Support for touch devices
carousel.addEventListener('touchstart', (e) => {
  startX = e.touches[0].pageX;
  scrollLeft = carousel.scrollLeft;
  isDragging = true;
});

carousel.addEventListener('touchend', () => {
  isDragging = false;
});

carousel.addEventListener('touchmove', (e) => {
  if (!isDragging) return;

  const x = e.touches[0].pageX;
  const walk = (x - startX) * 2;
  carousel.scrollLeft = scrollLeft - walk;
});

// Arrow button controls
document.querySelector('.carousel-control-prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + items.length) % items.length; // Move to previous slide
  setActiveItem(currentIndex);
});

document.querySelector('.carousel-control-next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % items.length; // Move to next slide
  setActiveItem(currentIndex);
});