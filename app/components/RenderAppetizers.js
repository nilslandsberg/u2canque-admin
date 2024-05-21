import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const AppetizerItem = (({
  appetizer,
  editMode,
  handleEdit,
  handleSave,
  handleDelete,
  }) => {
  const isEditMode = editMode === appetizer._id;
  const [name, setName] = useState(appetizer.name);
  const [price, setPrice] = useState(appetizer.price);
  const [image, setImage] = useState(appetizer.image || ''); 
  const [description, setDescription] = useState(appetizer.description);
  const [sauces, setSauces] = useState(appetizer.options?.sauce || []);
  const [dressings, setDressings] = useState(appetizer.options?.dressing || []);

  useEffect(() => {
    setName(appetizer.name);
    setPrice(appetizer.price);
    setImage(appetizer.image || '');
    setDescription(appetizer.description);
    setSauces(appetizer.options?.sauce || []);
    setDressings(appetizer.options?.dressing || []);
  }, [appetizer]);

  const handleAddSauce = () => {
    setSauces([...sauces, '']);
  };

  const handleSauceChange = (index, value) => {
    const newSauces = [...sauces];
    newSauces[index] = value;
    setSauces(newSauces);
  };

  const handleDeleteSauce = (index) => {
    const newSauces = sauces.filter((_, i) => i !== index);
    setSauces(newSauces);
  };

  const handleAddDressing = () => {
    setDressings([...dressings, '']);
  };

  const handleDressingChange = (index, value) => {
    const newDressings = [...dressings];
    newDressings[index] = value;
    setDressings(newDressings);
  };

  const handleDeleteDressing = (index) => {
    const newDressings = dressings.filter((_, i) => i !== index);
    setDressings(newDressings);
  };

  return (
    <div key={appetizer._id}>
      {isEditMode ? (
        // render input fields for editing menu items
        <div className="text-black mb-4">
          <div className="font-bold text-l text-white">Name: </div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="font-bold text-xl w-full"
          />
          <div className="relative my-2">
            <span className="font-bold text-l text-white absolute top-0">Description:</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-6 w-full h-20"
            />
          </div>
          <div className='my-2'>
            <div className="font-bold text-l text-white">Price: </div>
            <input
             className='w-1/2'
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              pattern="^\d+(\.\d{1,2})?$"
              title="Please enter a valid price with up to two decimal places"
              required
            />
          </div>
          <div>
            <div className="font-bold text-l text-white">Image URL:</div>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="text-l w-1/2"
            />
          </div>
          <div className='my-3'>
            <h4 className="font-bold text-l text-white">Sauces: </h4>
            <ul>
              {sauces.map((sauce, index) => (
                <li key={index}>
                  <div className="flex items-center">
                    <input
                      className="w-1/2"
                      type="text"
                      value={sauce}
                      onChange={(e) => handleSauceChange(index, e.target.value)}
                    />
                    <button className="ml-2 text-red-600" onClick={() => handleDeleteSauce(index)}>
                      <FontAwesomeIcon icon={faTrashCan} style={{ color: "#eb4444" }} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-end w-1/2">
              <button className="btn btn-orange" onClick={handleAddSauce}>
                Add New
              </button>
            </div>
          </div>
          <div className='my-3'>
            <h4 className="font-bold text-l text-white">Dressings: </h4>
            <ul>
              {dressings.map((dressing, index) => (
                <li key={index}>
                  <div className="flex items-center">
                    <input
                      className="w-1/2"
                      type="text"
                      value={dressing}
                      onChange={(e) => handleDressingChange(index, e.target.value)}
                    />
                    <button className="ml-2 text-red-600" onClick={() => handleDeleteDressing(index)}>
                      <FontAwesomeIcon icon={faTrashCan} style={{ color: "#eb4444" }} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-end w-1/2">
              <button className="btn btn-orange" onClick={handleAddDressing}>
                Add New
              </button>
            </div>
          </div>
          <button
            className="btn btn-green mt-3"
            onClick={() => {
              const updatedSauces = sauces.filter(Boolean);
              const updatedDressings = dressings.filter(Boolean);
              handleSave(appetizer._id, {
                name,
                image,
                description,
                price,
                sauces: updatedSauces,
                dressings: updatedDressings,
              });
            }}
          >
            Save
          </button>
          <button className="btn btn-red mt-3" onClick={() => handleDelete(appetizer._id)}>
            Delete
          </button>
        </div>
      ) : (
        // render list of menu items
        <div className='mb-4' onClick={() => handleEdit(appetizer._id)}>
          <h3 className="font-bold text-xl">{appetizer.name}</h3>
          <div>
            <span className="font-bold text-l">Description: </span>
            <span>{appetizer.description}</span>
          </div>
          <div>
            <span className="font-bold text-l">Price: </span>
            <span>{appetizer.price}</span>
          </div>
      
          {(appetizer.options?.sauce?.length > 0 || appetizer.options?.dressing?.length > 0) && (
            <div>
              <h4 className="font-bold text-l">Options:</h4>
              {appetizer.options.sauce?.length > 0 && (
                <div className="ml-4">
                  <span className="font-bold text-l">Sauces: </span>
                  <ul>
                    {appetizer.options.sauce.map((sauce, index) => (
                      <li key={index}>
                        <div className="ml-6">{sauce}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {appetizer.options.dressing?.length > 0 && (
                <div className="ml-4">
                  <span className="font-bold text-l">Dressings: </span>
                  <ul>
                    {appetizer.options.dressing.map((dressing, index) => (
                      <li key={index}>
                        <div className="ml-6">{dressing}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      <br />
    </div>
  );
});
      
      
const RenderAppetizers = ({ appetizers, handleRemoveAppetizer, createAppetizer, updateAppetizer, deleteAppetizer }) => {
  const [editMode, setEditMode] = useState(null);
  const [appetizerList, setAppetizerList] = useState(appetizers);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newAppetizer, setNewAppetizer] = useState({
    name: '',
    image: '',
    description: '',
    price: '',
    sauces: [],
    dressings: [],
  });

  useEffect(() => {
  setAppetizerList(appetizers);
  }, [appetizers]);


  const handleEdit = (id) => {
  setEditMode(id);
  };

  const handleSave = async (id, updatedFields) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user.token;
      let appetizer = appetizers.find((appetizer) => appetizer._id === id);

      const updatedOptions = {};

      // Sauces logic
      if (updatedFields.sauces.length > 0) {
        updatedOptions.sauce = updatedFields.sauces;
      }

      // Dressings logic
      if (updatedFields.dressings.length > 0) {
        updatedOptions.dressing = updatedFields.dressings;
      }

      // Update the appetizer object with the latest sauces and dressings
      appetizer = {
        ...appetizer,
        options: {
          ...(updatedFields.options),
          sauce: updatedFields.sauces,
          dressing: updatedFields.dressings,
        },
      };

      // Validate the price input
      const priceRegex = /^\d+(\.\d{1,2})?$/;
      if (!priceRegex.test(updatedFields.price)) {
        alert('Please enter Price as a number with two decimals.');
        return;
      }

      const formattedPrice = parseFloat(updatedFields.price).toFixed(2);

      const updatedAppetizer = {
        ...appetizer,
        name: updatedFields.name,
        image: updatedFields.image,
        description: updatedFields.description,
        price: formattedPrice,
        ...(Object.keys(updatedOptions).length > 0 && { options: updatedOptions }),
      };

      await updateAppetizer(token, id, updatedAppetizer);
      setEditMode(null);

      // Update the local appetizer list with the new data
      setAppetizerList(appetizerList.map((item) => (item._id === id ? updatedAppetizer : item)));
      console.log(`Update successful: ${appetizer}`);
    } catch (error) {
      console.error('Error updating appetizer:', error);
    }
  };

  const handleDelete = async (id) => {
  if (window.confirm('Are you sure you want to delete this item?')) {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user.token;
      await deleteAppetizer(token, id);
      handleRemoveAppetizer(id);
      setAppetizerList(appetizerList.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting appetizer:', error);
    }
  }
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setNewAppetizer({
      name: '',
      description: '',
      price: '',
      sauces: [],
      dressings: [],
    });
  };

  const handleCancelAddNew = () => {
    setIsAddingNew(false);
  };

  const handleCreateAppetizer = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user.token;
      
      // Validate the price input
      const priceRegex = /^\d+(\.\d{1,2})?$/;
      if (!priceRegex.test(newAppetizer.price)) {
        alert('Please enter Price as a number with two decimals.');
        return;
      }

      const updatedSauces = newAppetizer.sauces.filter(Boolean);
      const updatedDressings = newAppetizer.dressings.filter(Boolean);

      const options = {};

      if (updatedSauces.length > 0) {
        options.sauce = updatedSauces;
      }

      if (updatedDressings.length > 0) {
        options.dressing = updatedDressings;
      }

      const appetizer = {
        name: newAppetizer.name,
        image: newAppetizer.image,
        description: newAppetizer.description,
        price: newAppetizer.price,
        options: options, // Use the conditionally created options object
        appetizer: true,
      };

      const createdAppetizer = await createAppetizer(token, appetizer);
      setAppetizerList([...appetizerList, createdAppetizer]);
      setIsAddingNew(false);
      setNewAppetizer({
        name: '',
        image: '',
        description: '',
        price: '',
        sauces: [],
        dressings: [],
      });
    } catch (error) {
      console.error('Error creating appetizer:', error);
    }
  };

  return (
    <div>
      {appetizerList.map((appetizer) => (
        <AppetizerItem
          key={appetizer._id}
          appetizer={appetizer}
          editMode={editMode}
          handleEdit={handleEdit}
          handleSave={handleSave}
          handleDelete={handleDelete}
        />
      ))}
      {!isAddingNew && (
        <button onClick={handleAddNew} className="btn btn-blue ">
          Add New Appetizer
        </button>
      )}
      {isAddingNew && (
        <div className="text-black">
          <h2 className="text-2xl font-bold">New Appetizer</h2>
          <div className="mb-4">
            <div className="font-bold text-l text-white">Name:</div>
            <input
              type="text"
              value={newAppetizer.name}
              onChange={(e) => setNewAppetizer({ ...newAppetizer, name: e.target.value })}
              className="font-bold text-xl w-full"
            />
          </div>
          <div className="mb-4">
          <div className="relative mb-4">
            <span className="font-bold text-l text-white absolute top-0">Description:</span>
            <textarea
              value={newAppetizer.description}
              onChange={(e) => setNewAppetizer({ ...newAppetizer, description: e.target.value })}
              className="mt-6 w-full h-20"
            />
          </div>
          <div className="mb-4">
            <div className="font-bold text-l text-white">Price:</div>
            <input
              className="w-1/2"
              type="text"
              value={newAppetizer.price}
              onChange={(e) => setNewAppetizer({ ...newAppetizer, price: e.target.value })}
              pattern="^\d+(\.\d{1,2})?$"
              title="Please enter a valid price with up to two decimal places"
              required
            />
          </div>
          <div>
              <div className="font-bold text-l text-white">Image URL:</div>
              <input
                type="text"
                value={newAppetizer.image}
                onChange={(e) => setNewAppetizer({ ...newAppetizer, image: e.target.value })}
                className="text-l w-1/2"
              />
            </div>
          </div>

          {/* Sauces */}
          <div className='my-3'>
            <h4 className="font-bold text-l text-white">Sauces:</h4>
            <ul>
              {newAppetizer.sauces.map((sauce, index) => (
                <li key={index}>
                  <div className="flex items-center">
                    <input
                      className="w-1/2"
                      type="text"
                      value={sauce}
                      onChange={(e) => {
                        const newSauces = [...newAppetizer.sauces];
                        newSauces[index] = e.target.value;
                        setNewAppetizer({ ...newAppetizer, sauces: newSauces });
                      }}
                    />
                    <button
                      className="ml-2 text-red-600"
                      onClick={() => {
                        const newSauces = newAppetizer.sauces.filter((_, i) => i !== index);
                        setNewAppetizer({ ...newAppetizer, sauces: newSauces });
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
                onClick={() => setNewAppetizer({ ...newAppetizer, sauces: [...newAppetizer.sauces, ''] })}
              >
                Add New
              </button>
            </div>
          </div>

          {/* Dressings */}
          <div className='my-3'>
            <h4 className="font-bold text-l text-white">Dressings:</h4>
            <ul>
              {newAppetizer.dressings.map((dressing, index) => (
                <li key={index}>
                  <div className="flex items-center">
                    <input
                      className="w-1/2"
                      type="text"
                      value={dressing}
                      onChange={(e) => {
                        const newDressings = [...newAppetizer.dressings];
                        newDressings[index] = e.target.value;
                        setNewAppetizer({ ...newAppetizer, dressings: newDressings });
                      }}
                    />
                    <button
                      className="ml-2 text-red-600"
                      onClick={() => {
                        const newDressings = newAppetizer.dressings.filter((_, i) => i !== index);
                        setNewAppetizer({ ...newAppetizer, dressings: newDressings });
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
                onClick={() => setNewAppetizer({ ...newAppetizer, dressings: [...newAppetizer.dressings, ''] })}
              >
                Add New
              </button>
            </div>
          </div>

          <button onClick={handleCreateAppetizer} className="btn btn-blue">
            Add Appetizer
          </button>
          <button onClick={handleCancelAddNew} className="btn btn-red ml-4">
            Cancel
          </button>
        </div>
      )}

    </div>
  );
};

export default RenderAppetizers;