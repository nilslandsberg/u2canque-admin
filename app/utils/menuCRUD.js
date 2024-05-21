const apiUrl = 'https://u2canque-server.onrender.com/api';


// APPETIZERS
export const getAppetizers = async (token) => {
  const response = await fetch(`${apiUrl}/appetizers`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch appetizers');
  }

  return response.json();
};

export const createAppetizer = async (token, appetizer) => {
  try {
    console.log('createAppetizer called with appetizer:', appetizer);

    const response = await fetch(`${apiUrl}/appetizers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(appetizer),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to create appetizer:', errorData);
      throw new Error('Failed to create appetizer');
    }

    return response.json();
  } catch (error) {
    console.error('Error creating appetizer:', error);
    throw error;
  }
};

export const updateAppetizer = async (token, appetizerId, updatedAppetizer) => {
  const response = await fetch(`${apiUrl}/appetizers/${appetizerId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(updatedAppetizer),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update appetizer');
  }

  return response.json();
};

export const deleteAppetizer = async (token, appetizerId) => {
  const response = await fetch(`${apiUrl}/appetizers/${appetizerId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete appetizer');
  }

  return response.json();
};

// // LUNCH
// getLunches, createLunch, updateLunch, deleteLunch,

// // BULK
// getBulkBbq, createBulkBbq, updateBulkBbq, deleteBulkBbq,

// // SIDES
// getBulkSides, createBulkSides, updateBulkSides, deleteBulkSides,


// // HOLIDAY ITEMS
// getHolidays, createHoliday, updateHoliday, deleteHoliday,

// // MODIFIERS
// getModifiers, updateModifiers,