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

// Separate function to validate the form
function validateForm(formData) {
  // Check if all fields are filled
  if (!formData.storyTitle || !formData.catDescription || !formData.emotion || !formData.inspirationStory || !formData.numParts) {
    alert('Please fill out all fields');
    return false;
  }

  // Check if numParts is a number
  if (isNaN(formData.numParts)) {
    alert('Please enter a valid number for the number of parts');
    return false;
  }

  return true;
}

// Function to send data to the backend
function sendDataToBackend(data) {
  // Validate the form data
  if (!validateForm(data)) {
    return;
  }

// This function takes the object data and returns an array of images
function getImageUrls(data) {
  // Check if the input is valid
  if (!data || !Array.isArray(data.script)) {
    throw new Error('Invalid input data');
  }

  // Map through the script array and extract the image URLs
  return data.script.map(scene => {
    if (scene && typeof scene['Image URL'] === 'string') {
      return scene['Image URL'];
    }
    throw new Error('Invalid scene format');
  });
}


  // Fetch the data from the backend
  fetch(`http://127.0.0.1:5000/meowGeneration/${data.storyTitle}/${data.catDescription}/${data.emotion}/${data.inspirationStory}/${data.numParts}`)
    .then(response => response.json())
    .then(data => {
      if ("error" in data) {
        alert("Error: " + data.error);
        return;
      } else {
        alert("Success");
        console.log(data);

        let imagesArray;
        imagesArray = getImageUrls(data);
        // works
        generateCarouselImages(imagesArray);
        //alert(imagesArray);

        // Display video
        console.log("Display the video here: ", data["Video Url"]);
        displayVideo(data["Video Url"]);
        
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert("Error: " + error);
    });

  console.log('Sending data to the backend:', data);
}

// Function to display video
// Function to display video
function displayVideo(videoUrl) {
  const videoDisplay = document.getElementById('videoDisplay');

  // Apply the CSS styles to the videoDisplay element
  videoDisplay.style.width = '100%';
  videoDisplay.style.height = '200px';
  videoDisplay.style.backgroundColor = '#fff';
  videoDisplay.style.display = 'flex';
  videoDisplay.style.alignItems = 'center';
  videoDisplay.style.justifyContent = 'center';
  videoDisplay.style.borderRadius = '8px';
  videoDisplay.style.overflow = 'hidden'; // Optional: Ensures that the video doesn't overflow the container

  // Check if the videoUrl is valid
  if (videoUrl) {
    videoDisplay.innerHTML = `
      <video width="100%" height="100%" controls>
        <source src="${videoUrl}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    `;
  } else {
    videoDisplay.innerHTML = 'No video available.';
  }
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
