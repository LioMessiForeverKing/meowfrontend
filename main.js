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
  // Pseudo code for sending data to a Python backend
  // Use 'fetch' API to POST data to the backend
  fetch('http://your-backend-url/endpoint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Inform backend we're sending JSON data
    },
    body: JSON.stringify(data), // Convert JavaScript object to JSON string
  })
  .then(response => response.json()) // Assuming backend returns a JSON response
  .then(data => {
    console.log('Success:', data); // Handle the response data here
  })
  .catch((error) => {
    console.error('Error:', error); // Handle errors here
  });
}

// Event listener for when the user submits the form
document.addEventListener('DOMContentLoaded', () => {
  // Assuming there is a button to submit
  const submitButton = document.getElementById('submitButton'); // Replace with actual button ID

  if (submitButton) {
    submitButton.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default form submission behavior

      const formData = collectFormData(); // Collect user input
      consoleLogFormData(formData); // Log the data to the console for debugging
      sendDataToBackend(formData); // Send data to backend
    });
  }
});

/*
Python Backend Pseudo Code:

# Import necessary modules (like Flask, FastAPI, or Django)

# Define an endpoint to receive data
def receive_data_endpoint():
    # Parse the incoming JSON data
    # Example using Flask:
    # data = request.get_json()
    
    # Process the data (e.g., save to database, perform calculations, etc.)
    
    # Return a response to the client
    # return jsonify({'status': 'success', 'message': 'Data received successfully'})
    
    # Placeholder: Implement backend logic here

*/
