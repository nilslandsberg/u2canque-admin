export function getMemorialDayOrders(token) {
  const apiEndpoint = 'https://u2canque-server.onrender.com/api/order/holiday/memorial-day';

  return fetch(apiEndpoint, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }),
  })
  .then(response => {
    if (!response.ok) {
      console.log(response)
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the JSON data
  })
  .then(data => {
    console.log(data)
    return data; // Return the parsed data
  })
  .catch(error => {
    console.error('Error:', error);
    throw error; // Re-throw the error for further handling
  });
}