import React, { useState, useEffect } from 'react';
import MenuItemForm from './MenuItemForm';
import { capitalizeFirstLetter } from '../utils/stringManipulation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const RenderMenuItems = ({
  menuItems,
  createItem,
  deleteItem,
  updateItem,
  handleRemoveItem,
  handleCreateNewItem,
  sectionName,
  options = [],
}) => {

  const [itemList, setItemList] = useState(menuItems);
  const [editingMode, setEditingMode] = useState(null);
  const [addingNewMode, setaddingNewMode] = useState(false);
  const [editValues, setEditValues] = useState({});

  useEffect(() => {
    setItemList(menuItems);
  }, [menuItems]);

  const getMenuItemType = (sectionName) => {
    switch (sectionName) {
      case 'appetizer':
        return 'appetizer';
      case 'lunch':
        return 'lunch';
      case 'sides':
        return 'sides';
      case 'bulk':
        return 'bulk';
      case 'holiday':
        return 'holiday';
      default:
        return null;
    }
  };

  const menuItemType = getMenuItemType(sectionName);

  const handleInputChange = (field, value) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const isValidPrice = (price) => {
    // Check if the price is a string
    if (typeof price === 'string') {
      // Use a regular expression to validate the string format
      const priceRegex = /^\d+(\.\d{1,2})?$/;
      return priceRegex.test(price.trim());
    }
    // Check if the price is a number
    else if (typeof price === 'number') {
      return true;
    }
    // Check if the price is an object
    else if (typeof price === 'object' && price !== null) {
      // Iterate over the object values and validate each one
      const validValues = Object.values(price).filter((value) => {
        // If the value is a string
        if (typeof value === 'string') {
          // Trim the string and validate it using the regular expression
          const priceRegex = /^\d+(\.\d{1,2})?$/;
          return priceRegex.test(value.trim());
        }
        // If the value is a number, it's valid
        else if (typeof value === 'number') {
          return true;
        }
        // If the value is not a string or a number, it's invalid
        else {
          return false;
        }
      });
      // If at least one value is valid, the price object is considered valid
      return validValues.length > 0;
    }
    // If the price is not a string, number, or object, it's invalid
    else {
      return false;
    }
  };

  const handleEdit = (id) => {
    if (id) {
      setEditingMode(id);
      const item = itemList.find((item) => item._id === id);
      setEditValues({ ...item, ...item.options });
      setaddingNewMode(false);
    } else {
      setEditingMode(null);
      setEditValues({
        name: '',
        image: '',
        description: '',
        price: '',
        pricePerPound: '',
        ...options.reduce((acc, option) => ({ ...acc, [option]: [] }), {}),
      });
      setaddingNewMode(true);
    }
  };

  const handleSave = async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user.token;
  
      // Check if all required inputs are filled out
      const requiredFields = ['name', 'image', 'description'];
      const missingFields = requiredFields.filter((field) => !editValues[field]);
  
      // Validate required fields
      if (missingFields.length > 0) {
        alert('Please fill out all required fields.');
        return;
      }
  
      // Ensure options defaults to empty arrays if no options provided
      const updatedOptions = options.reduce((acc, option) => {
        acc[option] = editValues[option] || [];
        return acc;
      }, {});
  
      // Define the price keys for each menu item type
      const priceKeysMap = {
        bulk: ['onePound', 'threePounds', 'fivePounds', 'halfPan', 'fullPan'],
        sides: ['pint', 'quart', 'halfPan', 'fullPan'],
        holiday: ['default', 'fourPounds', 'fivePounds', 'sixPounds', 'sevenPounds', 'eightPounds', 'ninePounds', 'tenPounds', 'halfPan', 'fullPan']
      };
  
      // Define the required price keys for validation
      const requiredPriceFields = {
        bulk: 'onePound',
        holiday: 'default'
      };
  
      // Get the price keys and required field for the current menu item type
      const priceKeys = priceKeysMap[menuItemType] || [];
      const requiredPriceField = requiredPriceFields[menuItemType];

      // Regular expression to validate price format (e.g., 9.00, 10.50, 100.00)
      const priceRegex = /^\d+\.\d{2}$/;
      
      // Validate the price fields
      if (typeof editValues.price === 'object') {
        // For bulk, sides, and holiday items
        for (let key of priceKeys) {
          const value = editValues.price?.[key];
          
          if (key === requiredPriceField) {
            if (!value || !priceRegex.test(value)) {
              alert(`Please enter a valid price with two decimal places for ${key} (e.g., 9.00, 10.50).`);
              return;
            }
          } else if (value) {
            if (!priceRegex.test(value)) {
              alert(`Please enter a valid price with two decimal places for ${key} (e.g., 9.00, 10.50).`);
              return;
            }
          }
        }
      } else {
        // For items with price as a string (e.g., lunch items)
        if (!editValues.price || !priceRegex.test(editValues.price)) {
          alert('Please enter a valid price with two decimal places (e.g., 9.00, 10.50).');
          return;
        }
      }

      const formattedSize = formatSizeArray(menuItemType, editValues);
  
      const updatedItem = {
        name: editValues.name,
        image: editValues.image,
        description: editValues.description,
        price: editValues.price,
        size: formattedSize,
        pricePerPound: editValues.pricePerPound,
        [sectionName]: true,
        ...(menuItemType === 'lunch' && {
          day: editValues.day,
          oneSide: editValues.oneSide,
          twoSides: editValues.twoSides,
          bread: editValues.bread,
        }),
        type: editValues.type,
        side: editValues.side || false,
        ...(Object.keys(updatedOptions).length > 0 && { options: updatedOptions }),
      };
  
      if (addingNewMode) {
        // If adding new item, create the new item
        const createdItem = await createItem(token, updatedItem);
        handleCreateNewItem(createdItem, sectionName);
        setItemList([...itemList, createdItem]);
        setEditingMode(null);
        setaddingNewMode(false);
      } else {
        // If editing an existing item, update it
        const existingItem = itemList.find((item) => item._id === id);
        const updatedItem = {
          ...existingItem,
          name: editValues.name,
          image: editValues.image,
          description: editValues.description,
          price: editValues.price || existingItem.price,
          size: formattedSize || existingItem.size,
          pricePerPound: editValues.pricePerPound || existingItem.pricePerPound,
          [sectionName]: true,
          ...(menuItemType === 'lunch' && {
            day: editValues.day,
            oneSide: editValues.oneSide,
            twoSides: editValues.twoSides,
            bread: editValues.bread,
          }),
          type: editValues.type,
          side: editValues.side || false,
          ...(Object.keys(updatedOptions).length > 0 && { options: updatedOptions }),
        };
        await updateItem(token, id, updatedItem);
        setItemList(itemList.map((item) => (item._id === id ? updatedItem : item)));
        setEditingMode(null);
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleCancel = () => {
    setaddingNewMode(false);
    setEditingMode(null);
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?.')) {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user.token;
        await deleteItem(token, id);
        handleRemoveItem(id);
        setItemList(itemList.filter((item) => item._id !== id));
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const formatBulkPrice = (priceObj) => {
    return Object.entries(priceObj).map(([key, value]) => {
      const formattedKey = key.replace(/([A-Z])/g, ' $1').trim(); // Add space before uppercase letters
      const formattedValue = !isNaN(parseFloat(value)) ? `$${parseFloat(value).toFixed(2)}` : value; // Format decimals
      return (
        <div key={key} className="text-white my-2">
          <span className="font-bold text-l text-white my-2">
            {formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1)}: 
          </span>
          <span className="text-white indent-2 my-1"> {formattedValue}</span>
        </div>
      );
    });
  };

  const formatSizeArray = (menuItemType, editValues) => {
    if (menuItemType === 'bulk' || menuItemType === 'sides') {
      const bulkPriceKeys = ['onePound', 'threePounds', 'fivePounds', 'pint', 'quart', 'halfPan', 'fullPan'];
      const servingsMap = {
        onePound: '1lb (serves 3-4)',
        threePounds: '3lbs (serves 9-12)',
        fivePounds: '5lbs (serves 15-20)',
        pint: 'Pint (serves 2-3)',
        quart: 'Quart (serves 4-6)',
        halfPan: 'Half-Pan (Serves 12-14)',
        fullPan: 'Full-Pan (Serves 24-28)',
      };
  
      return bulkPriceKeys
        .filter((key) => editValues.price?.[key])
        .map((key) => {
          const price = parseFloat(editValues.price[key]).toFixed(2);
          return `${servingsMap[key]}: $${price}`;
        });
    } else if (menuItemType === 'holiday') {
      const holidayPriceKeys = ['default', 'fourPounds', 'fivePounds', 'sixPounds', 'sevenPounds', 'eightPounds', 'ninePounds', 'tenPounds', 'pint', 'quart', 'halfPan', 'fullPan'];
      const holidayServingsMap = {
        fourPounds: '4lbs',
        fivePounds: '5lbs',
        sixPounds: '6lbs',
        sevenPounds: '7lbs',
        eightPounds: '8lbs',
        ninePounds: '9lbs',
        tenPounds: '10lbs',
        pint: 'Pint (serves 2-3)',
        quart: 'Quart (serves 4-6)',
        halfPan: 'Half-Pan (Serves 12-14)',
        fullPan: 'Full-Pan (Serves 24-28)',
      };
  
      return holidayPriceKeys
        .filter((key) => editValues.price?.[key])
        .map((key) => {
          const price = parseFloat(editValues.price[key]).toFixed(2);
          return `${holidayServingsMap[key]} : $${price}`;
        });
    }
  
    return [];
  };
  
  const renderPrice = (item) => {
    if (typeof item.price === 'string') {
      return (
        <div className="text-white my-2 mb-3">
          <span className="font-bold">Price: </span>${item.price}
        </div>
      );
    } else if (typeof item.price === 'number') {
      const formattedValue = !isNaN(parseFloat(item.price)) ? `$${item.price.toFixed(2)}` : item.price;
      return (
        <div className="text-white my-2 mb-3">
          <span className="font-bold">Price: </span>{formattedValue}
        </div>
      );
    } else if (typeof item.price === 'object' && item.price !== null) {
      return (
        <h1>{formatBulkPrice(item.price)}</h1>
      );
    } else {
      return null;
    }
  };  

  const renderOptions = (item) => {
    return item.options &&
      Object.entries(item.options).map(
        ([option, values]) =>
          values.length > 0 && (
            <div key={option} className="text-white my-2">
              <h4 className="font-bold text-l text-white my-1">
                {option.charAt(0).toUpperCase() + option.slice(1)}:
              </h4>
              <ul>
                {values.map((value, index) => (
                  <li key={index} className="text-white indent-2 my-1">
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          )
      );
  };

  const renderLunchProps = (item) => (
    <div className="text-white my-2">
      <h4 className="font-bold text-l text-white my-1">Days Available:</h4>
      {Array.isArray(item.day) ? (
        <ul>
          {item.day.map((day, index) => (
            <li key={index} className="text-white indent-2 my-1">
              {day}
            </li>
          ))}
        </ul>
      ) : typeof item.day === 'string' ? (
        <div className="text-white indent-2 my-1">{item.day}</div>
      ) : (
        <div className="text-white indent-2 my-1">No days available</div>
      )}
      <div className="text-white my-2">
        <h4 className="font-bold text-l text-white my-1">Number of Sides:</h4>
        {item.oneSide ? (
          <div className="text-white indent-2 my-1">One Side</div>
        ) : item.twoSides ? (
          <div className="text-white indent-2 my-1">Two Sides</div>
        ) : (
          <div className="text-white indent-2 my-1">No Sides</div>
        )}
      </div>
      <div className="text-white my-2">
        <h4 className="font-bold text-l text-white my-1">Comes with Bread?</h4>
        <div className="text-white indent-2 my-1">{item.bread ? 'Yes' : 'No'}</div>
      </div>
    </div>
  );

  const renderHolidayProps = (item) => (
    <div className="text-white my-2">
        <h4 className="font-bold text-l text-white">Holiday(s) Available:</h4>
        {Array.isArray(item.type) ? (
          <ul>
            {item.type.map((type, index) => (
              <li key={index} className="text-white my-1 indent-2">
                {type}
              </li>
            ))}
          </ul>
        ) : (
          <div className='indent-2'>{item.type}</div>
        )}
      <div className="text-white my-2">
        <h4 className="font-bold text-l text-white my-1">Is a Side?</h4>
        <div className="text-white indent-2 my-1">{item.side ? 'Yes' : 'No'}</div>
      </div>
    </div>
  );
  
  return (
    <div>
      {/* Map over menu items and render list or edit view depending on editingMode / addingNewMode */}
      {itemList.map((item) => (
        <div key={item._id}>
          {/* Edit Item Mode */}
          {(editingMode === item._id) && (
            <MenuItemForm
              editingMode={editingMode}
              addingNewMode={false}
              editValues={editValues}
              handleInputChange={handleInputChange}
              handleSave={handleSave}
              handleCancel={handleCancel}
              handleDelete={handleDelete}
              options={options}
              menuItemType={menuItemType}
              sectionName={sectionName}
            />
          )}

          {/* View List Mode */}
          {!(editingMode === item._id) && (
            <div className="mb-8">
              <div className='flex justify-between items-center mb-1 font-bold text-orange-400'>
                <span className="text-xl">{item.name}</span>
                <button className='btn btn-orange' onClick={() => handleEdit(item._id)}>
                  <FontAwesomeIcon icon={faPen} className='mr-2'/> Edit
                </button>
              </div>
              <div className="text-white mb-1">{item.description}</div>
              <div className="text-white mb-1">{renderPrice(item)}</div>   
              <div className="text-white mb-1">{renderOptions(item)}</div>   
              <div className="text-white mb-1">{menuItemType === 'lunch' && renderLunchProps(item)}</div>   
              <div className="text-white mb-1">{menuItemType === 'holiday' && renderHolidayProps(item)}</div>
            </div>
          )}
        </div>
      ))}

      {/* Add New Item Mode */}
      {addingNewMode ? (
        <MenuItemForm
          editingMode={null}
          addingNewMode={true}
          editValues={editValues}
          handleInputChange={handleInputChange}
          handleSave={handleSave}
          handleCancel={handleCancel}
          options={options}
          menuItemType={menuItemType}
          sectionName={sectionName}
        />
      ) : (
        // Add New Item Button
        <button className="btn btn-blue mt-3" onClick={() => handleEdit(null)}>
          Add New {capitalizeFirstLetter(sectionName)} Item
        </button>
      )}
    </div>
  );
};

export default RenderMenuItems;