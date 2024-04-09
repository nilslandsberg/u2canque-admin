export function getOrdersForNextBusinessDay(token) {
  const apiEndpoint = 'https://u2canque-server.onrender.com/api/order/nextBusinessDay';
  const bearerToken = token;
  return fetch(apiEndpoint, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + bearerToken
    }),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the JSON data
  })
  .then(data => {
    return data; // Return the parsed data
  })
  .catch(error => {
    console.error('Error:', error);
    throw error; // Re-throw the error for further handling
  });
}
