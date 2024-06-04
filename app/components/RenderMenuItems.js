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
  
      // Validate price format
      if (!isValidPrice(editValues.price)) {
        alert('Please enter Price as a number with two decimals.');
        return;
      }
  
      const formattedPrice = editValues.price ? parseFloat(editValues.price).toFixed(2) : undefined;
  
      const updatedItem = {
        name: editValues.name,
        image: editValues.image,
        description: editValues.description,
        price: editValues.price,
        size: editValues.size,
        pricePerPound: editValues.pricePerPound,
        [sectionName]: true,
        ...(menuItemType === 'lunch' && {
          day: editValues.day,
          oneSide: editValues.oneSide,
          twoSides: editValues.twoSides,
          bread: editValues.bread,
        }),
        type: editValues.type,
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
          size: editValues.size || existingItem.size,
          pricePerPound: editValues.pricePerPound || existingItem.pricePerPound,
          [sectionName]: true,
          ...(menuItemType === 'lunch' && {
            day: editValues.day,
            oneSide: editValues.oneSide,
            twoSides: editValues.twoSides,
            bread: editValues.bread,
          }),
          type: editValues.type,
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