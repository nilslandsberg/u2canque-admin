import React, { useState, useEffect } from 'react';
import MenuItemForm from './MenuItemForm';
import { capitalizeFirstLetter } from '../utils/stringManipulation';

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
      const requiredFields = ['name', 'image', 'description', 'price'];
      const missingFields = requiredFields.filter(field => !editValues[field]);
  
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
      const priceRegex = /^\d+(\.\d{1,2})?$/;
      if (!priceRegex.test(editValues.price)) {
        alert('Please enter Price as a number with two decimals.');
        return;
      }
      const formattedPrice = parseFloat(editValues.price).toFixed(2);
  
      const updatedItem = {
        name: editValues.name,
        image: editValues.image,
        description: editValues.description,
        price: formattedPrice,
        [sectionName]: true,
        ...(menuItemType === 'lunch' && {
          day: editValues.day,
          oneSide: editValues.oneSide,
          twoSides: editValues.twoSides,
          bread: editValues.bread,
        }),
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
          price: formattedPrice,
          [sectionName]: true,
          ...(menuItemType === 'lunch' && {
            day: editValues.day,
            oneSide: editValues.oneSide,
            twoSides: editValues.twoSides,
            bread: editValues.bread,
          }),
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

  return (
    <div>
      {/* Map over menu items and render list or edit view depending on editingMode / addingNewMode */}
      {itemList.map((item) => (
        <div key={item._id}>
          {/* Editing Mode */}
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

          {/* Lists Mode */}
          {!(editingMode === item._id) && (
            <div className="mb-8" onClick={() => handleEdit(item._id)}>
              <h3 className="mb-1 font-bold text-xl text-orange-400">{item.name}</h3>
              <div className="text-white mb-1">{item.description}</div>
              <div className="text-white font-bold mb-3">{item.price}</div>
              
              {/* Options props */}
              {item.options &&
                Object.entries(item.options).map(
                  ([option, values]) =>
                    values.length > 0 && (
                      <div key={option} className="text-white indent-2 my-1">
                        <h4 className="font-bold text-l text-white">
                          {option.charAt(0).toUpperCase() + option.slice(1)}:
                        </h4>
                        <ul>
                          {values.map((value, index) => (
                            <li key={index} className="text-white indent-4 my-1">
                              {value}
                            </li>
                          ))}
                        </ul>
                      </div>
              ))}
                
              {/* Lunch props */}
              {menuItemType === 'lunch' && (
                <div className="text-white indent-2 my-2">
                  <h4 className="font-bold text-l text-white">Days Available:</h4>
                  <ul>
                    {item.day.map((day, index) => (
                      <li key={index} className="text-white indent-4 my-1">
                        {day}
                      </li>
                    ))}
                  </ul>
                  <div className="text-white indent-2 my-2">
                    <h4 className="font-bold text-l text-white my-1">Number of Sides:</h4>
                    {item.oneSide ? (
                      <div className="text-white indent-4 my-1">One Side</div>
                    ) : item.twoSides ? (
                      <div className="text-white indent-4 my-1">Two Sides</div>
                    ) : (
                      <div className="text-white indent-4 my-1">No Sides</div>
                    )}
                  </div>
                  <div className="text-white indent-2 my-2">
                    <h4 className="font-bold text-l text-white my-1">Comes with Bread?</h4>
                    <div className="text-white indent-4 my-1">{item.bread ? 'Yes' : 'No'}</div>
                  </div>
                </div>
              )}

              {/* Bulk props */}
              {menuItemType === 'bulk' && (
                {/* ... */}
              )}

              {/* Sides props */}
              {menuItemType === 'sides' && (
              {/* ... */}
              )}

              {/* Holiday props */}
              {menuItemType === 'holiday' && (
                {/* ... */}
              )}
            </div>
          )}
        </div>
      ))}

      {/* Render Inputs to Add New Item */}
      {addingNewMode && (
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
      )}

      {/* Add New Item Button */}
      <button className="btn btn-blue mt-3" onClick={() => handleEdit(null)}>
        Add New {capitalizeFirstLetter(sectionName)} Item
      </button>
    </div>
  );
};

export default RenderMenuItems;