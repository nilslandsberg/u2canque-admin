export function getOrdersForNextBusinessDay() {
  const apiEndpoint = 'https://u2canque-server.onrender.com/api/order/nextBusinessDay';

  return fetch(apiEndpoint, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the JSON data
  })
  .then(data => {
    console.log("Data:", data); // Log the parsed data
    return data; // Return the parsed data
  })
  .catch(error => {
    console.error('Error:', error);
    throw error; // Re-throw the error for further handling
  });
}
