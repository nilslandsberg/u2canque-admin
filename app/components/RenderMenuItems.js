// reusable component for rendering and editing various menu sections

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

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
  const [editMode, setEditMode] = useState(null);
  const [itemList, setItemList] = useState(menuItems);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    image: '',
    description: '',
    price: '',
    pricePerPound: '',
    bulkPrice: {},
    day: [],
    oneSide: '',
    twoSides: '',
    bread: '',
    size: [],
    holiday: [],
    ...options.reduce((acc, option) => ({ ...acc, [option]: [] }), {}),
  });
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
      case 'holiday-items':
        return 'holiday-items';
      default:
        return null;
    }
  };

  const menuItemType = getMenuItemType(sectionName);

  const handleEdit = (id) => {
    setEditMode(id);
    const item = itemList.find((item) => item._id === id);
    setEditValues({ ...item, ...item.options });
  };

  const handleInputChange = (field, value) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleSave = async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user.token;
      let item = menuItems.find((item) => item._id === id);
      
      const updatedOptions = options.reduce((acc, option) => {
        acc[option] = editValues[option] || [];
        return acc;
      }, {});
      
      item = {
        ...item,
        options: {
          ...item.options,
          ...updatedOptions,
        },
      };

      const priceRegex = /^\d+(\.\d{1,2})?$/;
      if (!priceRegex.test(editValues.price)) {
        alert('Please enter Price as a number with two decimals.');
        return;
      }

      const formattedPrice = parseFloat(editValues.price).toFixed(2);

      const updatedItem = {
        ...item,
        name: editValues.name,
        image: editValues.image,
        description: editValues.description,
        price: formattedPrice,
        [sectionName]: true, // Set the appropriate section flag (e.g., appetizer: true, lunch: true, etc.)
        ...(menuItemType === 'lunch' && {
          day: editValues.day,
          oneSide: editValues.oneSide,
          twoSides: editValues.twoSides,
          bread: editValues.bread,
        }),
        ...(menuItemType === 'sides' && {
          // Include side-specific properties
        }),
        ...(menuItemType === 'bulk' && {
          // Include bulk-specific properties
        }),
        ...(menuItemType === 'holiday-items' && {
          // Include holiday item-specific properties
        }),
        ...(Object.keys(updatedOptions).length > 0 && { options: updatedOptions }),
      };

      await updateItem(token, id, updatedItem);
      setEditMode(null);

      setItemList(itemList.map((item) => (item._id === id ? updatedItem : item)));
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
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

  const handleAddNew = () => {
    setIsAddingNew(true);
    setNewItem({
      name: '',
      description: '',
      price: '',
      image: '',
      ...options.reduce((acc, option) => ({ ...acc, [option]: [] }), {}),
    });
  };

  const handleCancelAddNew = () => {
    setIsAddingNew(false);
  };

  const handleCreateItem = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user.token;
  
      const priceRegex = /^\d+(\.\d{1,2})?$/;
      if (!priceRegex.test(newItem.price)) {
        alert('Please enter Price as a number with two decimals.');
        return;
      }

      const formattedPrice = parseFloat(newItem.price).toFixed(2);
  
      const itemProperties = {
        name: newItem.name,
        image: newItem.image,
        description: newItem.description,
        price: formattedPrice,
        [sectionName]: true, // Set the appropriate section flag (e.g., appetizer: true, lunch: true, etc.)
        ...(menuItemType === 'lunch' && {
          day: newItem.day,
          oneSide: newItem.oneSide,
          twoSides: newItem.twoSides,
          bread: newItem.bread,
        }),
        ...(menuItemType === 'sides' && {
          // Include side-specific properties
        }),
        ...(menuItemType === 'bulk' && {
          // Include bulk-specific properties
        }),
        ...(menuItemType === 'holiday-items' && {
          // Include holiday item-specific properties
        }),
      };
  
      const options = Object.entries(newItem)
        .filter(([key]) => key !== 'name' && key !== 'image' && key !== 'description' && key !== 'price')
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});
  
      const item = {
        ...itemProperties,
        options,
      };
  
      const createdItem = await createItem(token, item);
      handleCreateNewItem(createdItem, sectionName); // Call handleCreateNewItem func from EditMenuOptions to keep states in sync
      setItemList([...itemList, createdItem]);
      setIsAddingNew(false);
      setNewItem({
        name: '',
        image: '',
        description: '',
        price: '',
        ...(Array.isArray(options) ? options.reduce((acc, option) => ({ ...acc, [option]: [] }), {}) : {}),
      });
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  return (
    <div>
      {itemList.map((item) => (
        <div key={item._id}>
          {editMode === item._id ? (
            // Render Editing Fields for Menu Items
            <div className="text-black mb-4">
              <div className="font-bold text-xl text-white">Name:</div>
              <input
                type="text"
                value={editValues.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="font-bold text-xl w-full"
              />
              <div className="relative my-5">
                <span className="font-bold text-xl text-white absolute top-0">Description:</span>
                <textarea
                  value={editValues.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="mt-6 w-full h-20"
                />
              </div>
              <div className="my-5">
                <div className="font-bold text-xl text-white">Price:</div>
                <input
                  className="w-1/2"
                  type="text"
                  value={editValues.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  pattern="^\d+(\.\d{1,2})?$"
                  title="Please enter a valid price with up to two decimal places"
                  required
                />
              </div>
              <div>
                <div className="font-bold text-xl text-white">Image URL:</div>
                <input
                  type="text"
                  value={editValues.image}
                  onChange={(e) => handleInputChange('image', e.target.value)}
                  className="text-l w-1/2"
                />
              </div>

              {options.map((option) => (
                <div className="my-5" key={option}>
                  <h4 className="font-bold text-xl text-white">{option.charAt(0).toUpperCase() + option.slice(1)}:</h4>
                  <ul>
                  {editValues[option] && editValues[option].map((value, index) => (
                    <li key={index}>
                      <div className="flex items-center">
                        <input
                          className="w-1/2"
                          type="text"
                          value={value}
                          onChange={(e) => {
                            const updatedOptions = [...editValues[option]];
                            updatedOptions[index] = e.target.value;
                            handleInputChange(option, updatedOptions);
                          }}
                        />
                        <button
                          className="ml-2 text-red-600"
                          onClick={() => {
                            const updatedOptions = editValues[option].filter((_, i) => i !== index);
                            handleInputChange(option, updatedOptions);
                          }}
                        >
                          <FontAwesomeIcon icon={faTrashCan} style={{ color: "#eb4444" }} />
                        </button>
                      </div>
                    </li>
                  ))}

                  </ul>
                  <div className="flex justify-end w-1/2">
                    <button
                      className="btn btn-orange"
                      onClick={() => handleInputChange(option, [...editValues[option], ''])}
                    >
                      Add New
                    </button>
                  </div>
                </div>
              ))}

              {/* Lunch Editing */}
              {menuItemType === 'lunch' && (
                <div>
                  {/* Day of Week */}
                  <div className="my-6">
                    <div className="text-white">
                      <span className="font-bold text-xl">Days Available: </span>
                      <span className='italic'>(select one or more)</span>
                    </div>
                    <div className="flex flex-wrap my-3">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Every Day'].map((day) => (
                        <div key={day} className="flex items-center mr-4">
                          <input
                            type="checkbox"
                            id={day}
                            checked={editValues.day.includes(day)}
                            onChange={(e) => {
                              const updatedDays = e.target.checked
                                ? [...editValues.day, day]
                                : editValues.day.filter((d) => d !== day);
                              handleInputChange('day', updatedDays);
                            }}
                          />
                          <label htmlFor={day} className="ml-2 text-white">
                            {day}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Number of Sides */}
                  <div className="my-6 w-1/2">
                    <div className="font-bold text-xl text-white mb-2">Number of Sides:</div>
                    <div className="flex">
                      <div className="flex items-center mr-4">
                        <input
                          type="radio"
                          id="oneSide"
                          checked={editValues.oneSide}
                          onChange={() => {
                            handleInputChange('oneSide', true);
                            handleInputChange('twoSides', false);
                          }}
                          className="mr-2"
                        />
                        <label htmlFor="oneSide" className="text-white">
                          One Side
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="twoSides"
                          checked={editValues.twoSides}
                          onChange={() => {
                            handleInputChange('oneSide', false);
                            handleInputChange('twoSides', true);
                          }}
                          className="mr-2"
                        />
                        <label htmlFor="twoSides" className="text-white">
                          Two Sides
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Bread Included */}
                  <div className="my-6 w-1/2">
                    <div className="font-bold text-xl text-white mb-2">Comes with Bread?</div>
                    <div className="flex">
                      <div className="flex items-center mr-4">
                        <input
                          type="radio"
                          id="noBread"
                          checked={!editValues.bread}
                          onChange={() => handleInputChange('bread', false)}
                          className="mr-2"
                        />
                        <label htmlFor="noBread" className="text-white">
                          No
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="yesBread"
                          checked={editValues.bread}
                          onChange={() => handleInputChange('bread', true)}
                          className="mr-2"
                        />
                        <label htmlFor="yesBread" className="text-white">
                          Yes
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {menuItemType === 'sides' && (
                // Render sides fields
                <div>sides fields</div>
              )}

              {menuItemType === 'bulk' && (
                // Render bulk fields
                <div>bulk fields</div>
              )}

              {menuItemType === 'holiday-items' && (
                // Render holiday item fields
                <div>holiday fields</div>
              )}

              <button
                className="btn btn-green mt-3"
                onClick={() => handleSave(item._id)}
              >
                Save
              </button>
              <button className="btn btn-red mt-3" onClick={() => handleDelete(item._id)}>
                Delete
              </button>
            </div>
          ) : (
            // Render Lists for Menu Items
            <div className="mb-8" onClick={() => handleEdit(item._id)}>
              <h3 className="mb-1 font-bold text-xl text-orange-400">{item.name}</h3>
              <div className="text-white mb-1">{item.description}</div>
              <div className="text-white font-bold mb-3">{item.price}</div>
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
                    )
                )}
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
            </div>
          )}
        </div>
      ))}

      {/* Render "Add New" Fields for Menu Items */}
      {isAddingNew && (
        <div className="text-black mb-4">
          <div className="font-bold text-xl text-white">Name:</div>
          <input
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="font-bold text-xl w-full"
          />
          <div className="relative my-2">
            <span className="font-bold text-xl text-white absolute top-0">Description:</span>
            <textarea
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              className="mt-6 w-full h-20"
            />
          </div>
          <div className="my-2">
            <div className="font-bold text-xl text-white">Price:</div>
            <input
              className="w-1/2"
              type="text"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
              pattern="^\d+(\.\d{1,2})?$"
              title="Please enter a valid price with up to two decimal places"
              required
            />
          </div>
          <div>
            <div className="font-bold text-xl text-white">Image URL:</div>
            <input
              type="text"
              value={newItem.image}
              onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
              className="text-xl w-1/2"
            />
          </div>
          {options.map((option) => (
            <div className="my-3" key={option}>
              <h4 className="font-bold text-xl text-white">{option.charAt(0).toUpperCase() + option.slice(1)}:</h4>
              <ul>
                {newItem[option].map((value, index) => (
                  <li key={index}>
                    <div className="flex items-center">
                      <input
                        className="w-1/2"
                        type="text"
                        value={value}
                        onChange={(e) => {
                          const updatedOptions = [...newItem[option]];
                          updatedOptions[index] = e.target.value;
                          setNewItem({ ...newItem, [option]: updatedOptions });
                        }}
                      />
                      <button
                        className="ml-2 text-red-600"
                        onClick={() => {
                          const updatedOptions = newItem[option].filter((_, i) => i !== index);
                          setNewItem({ ...newItem, [option]: updatedOptions });
                        }}
                      >
                        <FontAwesomeIcon icon={faTrashCan} style={{ color: "#eb4444" }} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex justify-end w-1/2">
                <button
                  className="btn btn-orange"
                  onClick={() => setNewItem({ ...newItem, [option]: [...newItem[option], ''] })}
                >
                  Add New
                </button>
              </div>
            </div>
          ))}
          <button
            className="btn btn-green mt-3"
            onClick={handleCreateItem}
          >
            Save
          </button>
          <button className="btn btn-red mt-3" onClick={handleCancelAddNew}>
            Cancel
          </button>
        </div>
      )}

      <button className="btn btn-blue mt-3" onClick={handleAddNew}>
        Add New Item
      </button>
    </div>
  );
};

export default RenderMenuItems;