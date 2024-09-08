// Function to collect all user input from the form
function collectFormData() {
  const storyTitle = document.getElementById('storyTitle').value;
  const catDescription = document.getElementById('catDescription').value;
  const emotion = document.getElementById('emotion').value;
  const inspirationStory = document.getElementById('inspirationStory').value;
  const numParts = document.getElementById('numParts').value;

  // Creating a data object to send to the backend
  const formData = {
    storyTitle: storyTitle,
    catDescription: catDescription,
    emotion: emotion,
    inspirationStory: inspirationStory,
    numParts: parseInt(numParts), // Convert to integer if it's a number
  };

  return formData;
}

// Function to log form data to the console for debugging
function consoleLogFormData(data) {
  console.log('User Entered Data:', data);
}

// Function to send data to the backend
function sendDataToBackend(data) {
  fetch('http://your-backend-url/endpoint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

// Function to dynamically generate carousel images
function generateCarouselImages(images) {
  const carouselInner = document.getElementById('carouselInner');
  carouselInner.innerHTML = ''; // Clear existing content

  // Loop to create the image elements
  images.forEach((imageSrc, index) => {
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    if (index === 0) carouselItem.classList.add('active'); // Make the first item active by default

    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = `Cute Cat ${index + 1}`;

    carouselItem.appendChild(img);
    carouselInner.appendChild(carouselItem);
  });
}

// Variables to track the current carousel index
let currentIndex = 0;
let totalImages = 5; // Fixed number of images (5 cat images)

// Function to move to the next image
function nextImage() {
  const carouselInner = document.getElementById('carouselInner');
  currentIndex = (currentIndex + 1) % totalImages;
  carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Function to move to the previous image
function prevImage() {
  const carouselInner = document.getElementById('carouselInner');
  currentIndex = (currentIndex - 1 + totalImages) % totalImages;
  carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Event listeners for carousel controls
document.getElementById('nextBtn').addEventListener('click', nextImage);
document.getElementById('prevBtn').addEventListener('click', prevImage);

// Event listener for when the user submits the form
document.addEventListener('DOMContentLoaded', () => {
  const submitButton = document.getElementById('submitButton');

  if (submitButton) {
    submitButton.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default form submission behavior

      const formData = collectFormData(); // Collect user input
      consoleLogFormData(formData); // Log the data to the console for debugging
      sendDataToBackend(formData); // Send data to backend
    });
  }
  images = [
    'https://cdn2.thecatapi.com/images/MTYwNjA2OA.jpg',
    'https://cdn2.thecatapi.com/images/MTYwNjA2OA.jpg',
    'https://cdn2.thecatapi.com/images/MTYwNjA2OA.jpg',
    'https://cdn2.thecatapi.com/images/MTYwNjA2OA.jpg',
    'https://cdn2.thecatapi.com/images/MTYwNjA2OA.jpg',
  ]

  // Generate carousel with 5 cat images
  generateCarouselImages(images);
});
