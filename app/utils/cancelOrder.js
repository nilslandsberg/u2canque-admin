export function cancelOrder(orderId) {
  const apiEndpoint = `https://u2canque-server.onrender.com/api/order/${orderId}`;

  return fetch(apiEndpoint, {
    method: 'DELETE',
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
  .catch(error => {
    console.error('Error:', error);
    throw error; // Re-throw the error for further handling
  });
}
