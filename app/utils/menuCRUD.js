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

// LUNCH
export const getLunches = async (token) => {
  const response = await fetch(`${apiUrl}/lunch`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch lunches');
  }

  return response.json();
};

export const createLunch = async (token, lunch) => {
  try {
    console.log('createLunch called with lunch:', lunch);

    const response = await fetch(`${apiUrl}/lunch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(lunch),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to create lunch:', errorData);
      throw new Error('Failed to create lunch');
    }

    return response.json();
  } catch (error) {
    console.error('Error creating lunch:', error);
    throw error;
  }
};

export const updateLunch = async (token, lunchId, updatedLunch) => {
  const response = await fetch(`${apiUrl}/lunch/${lunchId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(updatedLunch),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update lunch');
  }

  return response.json();
};

export const deleteLunch = async (token, lunchId) => {
  const response = await fetch(`${apiUrl}/lunch/${lunchId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete lunch');
  }

  return response.json();
};

// BULK BBQ
export const getBulkBbq = async (token) => {
  const response = await fetch(`${apiUrl}/bulk-bbq`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch bulk BBQ');
  }

  return response.json();
};

export const createBulkBbq = async (token, bulkBbq) => {
  try {
    console.log('createBulkBbq called with bulkBbq:', bulkBbq);

    const response = await fetch(`${apiUrl}/bulk-bbq`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(bulkBbq),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to create bulk BBQ:', errorData);
      throw new Error('Failed to create bulk BBQ');
    }

    return response.json();
  } catch (error) {
    console.error('Error creating bulk BBQ:', error);
    throw error;
  }
};

export const updateBulkBbq = async (token, bulkBbqId, updatedBulkBbq) => {
  const response = await fetch(`${apiUrl}/bulk-bbq/${bulkBbqId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(updatedBulkBbq),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update bulk BBQ');
  }

  return response.json();
};

export const deleteBulkBbq = async (token, bulkBbqId) => {
  const response = await fetch(`${apiUrl}/bulk-bbq/${bulkBbqId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete bulk BBQ');
  }

  return response.json();
};

// SIDES
export const getBulkSides = async (token) => {
  const response = await fetch(`${apiUrl}/sides`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch sides');
  }

  return response.json();
};

export const createBulkSides = async (token, side) => {
  try {
    console.log('createSide called with side:', side);

    const response = await fetch(`${apiUrl}/sides`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(side),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to create side:', errorData);
      throw new Error('Failed to create side');
    }

    return response.json();
  } catch (error) {
    console.error('Error creating side:', error);
    throw error;
  }
};

export const updateBulkSides = async (token, sideId, updatedSide) => {
  const response = await fetch(`${apiUrl}/sides/${sideId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(updatedSide),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update side');
  }

  return response.json();
};

export const deleteBulkSides = async (token, sideId) => {
  const response = await fetch(`${apiUrl}/sides/${sideId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete side');
  }

  return response.json();
};

// HOLIDAY ITEMS
export const getHolidays = async (token) => {
  const response = await fetch(`${apiUrl}/holiday-items`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch holiday items');
  }

  return response.json();
};

export const createHoliday = async (token, holiday) => {
  try {
    console.log('createHoliday called with holiday:', holiday);

    const response = await fetch(`${apiUrl}/holiday-items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(holiday),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to create holiday:', errorData);
      throw new Error('Failed to create holiday');
    }

    return response.json();
  } catch (error) {
    console.error('Error creating holiday:', error);
    throw error;
  }
};

export const updateHoliday = async (token, holidayId, updatedHoliday) => {
  const response = await fetch(`${apiUrl}/holiday-items/${holidayId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(updatedHoliday),
  });

  if (!response.ok) {
    throw new Error('Failed to update holiday');
  }

  return response.json();
};

export const deleteHoliday = async (token, holidayId) => {
  const response = await fetch(`${apiUrl}/holiday-items/${holidayId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete holiday');
  }

  return response.json();
};

// MODIFIERS
export const getModifiers = async (token) => {
  const response = await fetch(`${apiUrl}/modifiers`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch modifiers');
  }

  return response.json();
};

export const updateModifiers = async (token, modifiersId, updatedModifiers) => {
  const response = await fetch(`${apiUrl}/modifiers/${modifiersId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(updatedModifiers),
  });

  if (!response.ok) {
    throw new Error('Failed to update modifiers');
  }

  return response.json();
};