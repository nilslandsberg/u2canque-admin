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
        [sectionName]: true,
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
      handleCreateNewItem(createdItem, sectionName); // Call the handleCreateNewItem function from the parent
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
            // Render input fields for editing menu item
            <div className="text-black mb-4">
              <div className="font-bold text-l text-white">Name:</div>
              <input
                type="text"
                value={editValues.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="font-bold text-xl w-full"
              />
              <div className="relative my-2">
                <span className="font-bold text-l text-white absolute top-0">Description:</span>
                <textarea
                  value={editValues.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="mt-6 w-full h-20"
                />
              </div>
              <div className="my-2">
                <div className="font-bold text-l text-white">Price:</div>
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
                <div className="font-bold text-l text-white">Image URL:</div>
                <input
                  type="text"
                  value={editValues.image}
                  onChange={(e) => handleInputChange('image', e.target.value)}
                  className="text-l w-1/2"
                />
              </div>
              {options.map((option) => (
                <div className="my-3" key={option}>
                  <h4 className="font-bold text-l text-white">{option.charAt(0).toUpperCase() + option.slice(1)}:</h4>
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
            // Render list item for menu items
            <div className="mb-4" onClick={() => handleEdit(item._id)}>
              <h3 className="font-bold text-xl text-orange-400">{item.name}</h3>
              <div className="text-white">{item.description}</div>
              <div className="text-white font-bold">{item.price}</div>
              {item.options &&
                Object.entries(item.options).map(
                  ([option, values]) =>
                    values.length > 0 && (
                      <div key={option} className="text-white indent-2">
                        <h4 className="font-bold text-l text-white">
                          {option.charAt(0).toUpperCase() + option.slice(1)}:
                        </h4>
                        <ul>
                          {values.map((value, index) => (
                            <li key={index} className="text-white indent-4">
                              {value}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                )}
            </div>
          )}
        </div>
      ))}

      {/* Render input fields for adding new menu item */}
      {isAddingNew && (
        <div className="text-black mb-4">
          <div className="font-bold text-l text-white">Name:</div>
          <input
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="font-bold text-xl w-full"
          />
          <div className="relative my-2">
            <span className="font-bold text-l text-white absolute top-0">Description:</span>
            <textarea
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              className="mt-6 w-full h-20"
            />
          </div>
          <div className="my-2">
            <div className="font-bold text-l text-white">Price:</div>
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
            <div className="font-bold text-l text-white">Image URL:</div>
            <input
              type="text"
              value={newItem.image}
              onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
              className="text-l w-1/2"
            />
          </div>
          {options.map((option) => (
            <div className="my-3" key={option}>
              <h4 className="font-bold text-l text-white">{option.charAt(0).toUpperCase() + option.slice(1)}:</h4>
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