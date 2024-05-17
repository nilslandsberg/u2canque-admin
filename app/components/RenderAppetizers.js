import React, { memo, useState, useEffect } from 'react';

const AppetizerItem = memo(({ appetizer, editMode, handleEdit, handleSave, handleDelete }) => {
  const isEditMode = editMode === appetizer._id;
  const [newSauces, setNewSauces] = useState([]);
  const [newDressings, setNewDressings] = useState([]);
  const [name, setName] = useState(appetizer.name);
  const [description, setDescription] = useState(appetizer.description);
  const [price, setPrice] = useState(appetizer.price);
  const [sauces, setSauces] = useState(appetizer.options?.sauce || []);
  const [dressings, setDressings] = useState(appetizer.options?.dressing || []);

  useEffect(() => {
    setName(appetizer.name);
    setDescription(appetizer.description);
    setPrice(appetizer.price);
    setSauces(appetizer.options?.sauce || []);
    setDressings(appetizer.options?.dressing || []);
  }, [appetizer]);

  const handleAddSauce = () => {
    setNewSauces([...newSauces, '']);
  };

  const handleAddDressing = () => {
    setNewDressings([...newDressings, '']);
  };

  const handleDeleteSauce = (index) => {
    const newSauces = sauces.filter((_, i) => i !== index);
    setSauces(newSauces);
  };

  const handleDeleteDressing = (index) => {
    const newDressings = dressings.filter((_, i) => i !== index);
    setDressings(newDressings);
  };

  const handleSauceChange = (index, value) => {
    const newSauces = [...sauces];
    newSauces[index] = value;
    setSauces(newSauces);
  };

  const handleDressingChange = (index, value) => {
    const newDressings = [...dressings];
    newDressings[index] = value;
    setDressings(newDressings);
  };

  return (
    <div key={appetizer._id}>
      {isEditMode ? (
        // render input fields for editing menu items
        <div className="text-black">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="font-bold text-xl"
          />
          <div className="relative">
            <span className="font-bold text-l text-white absolute top-0">Description:</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-5"
            />
          </div>
          <div>
            <div className="font-bold text-l text-white">Price: </div>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          {(sauces.length > 0 || newSauces.length > 0) && (
            <div>
              <h4 className="font-bold text-l text-white">Sauces: </h4>
              <ul>
                {sauces.map((sauce, index) => (
                  <li key={index}>
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={sauce}
                        onChange={(e) => handleSauceChange(index, e.target.value)}
                      />
                      <button className="ml-2 text-red-600" onClick={() => handleDeleteSauce(index)}>Delete</button>
                    </div>
                  </li>
                ))}
                {newSauces.map((sauce, index) => (
                  <li key={`new-${index}`}>
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={sauce}
                        onChange={(e) => {
                          const newSauces = [...newSauces];
                          newSauces[index] = e.target.value;
                          setNewSauces(newSauces);
                        }}
                      />
                      <button className="ml-2 text-red-600" onClick={() => handleDeleteSauce(index)}>Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
              <button className="btn btn-orange" onClick={handleAddSauce}>Add new sauce</button>
            </div>
          )}

          {(dressings.length > 0 || newDressings.length > 0) && (
            <div>
              <h4 className="font-bold text-l text-white">Dressings: </h4>
              <ul>
                {dressings.map((dressing, index) => (
                  <li key={index}>
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={dressing}
                        onChange={(e) => handleDressingChange(index, e.target.value)}
                      />
                      <button className="ml-2 text-red-600" onClick={() => handleDeleteDressing(index)}>Delete</button>
                    </div>
                  </li>
                ))}
                {newDressings.map((dressing, index) => (
                  <li key={`new-${index}`}>
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={dressing}
                        onChange={(e) => {
                          const newDressings = [...newDressings];
                          newDressings[index] = e.target.value;
                          setNewDressings(newDressings);
                        }}
                      />
                      <button className="ml-2 text-red-600" onClick={() => handleDeleteDressing(index)}>Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
              <button className="btn btn-orange" onClick={handleAddDressing}>Add new dressing</button>
            </div>
          )}

          <button
            className="btn btn-green mt-3"
            onClick={() => {
              const newSauce = newSauces.filter(Boolean);
              const newDressing = newDressings.filter(Boolean);
              handleSave(appetizer._id, { name, description, price, sauces, dressings, newSauce, newDressing });
              setNewSauces([]);
              setNewDressings([]);
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
        <div onClick={() => handleEdit(appetizer._id)}>
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

useEffect(() => {
setAppetizerList(appetizers);
}, [appetizers]);

const handleEdit = (id) => {
setEditMode(id);
};

// const handleSave = async (id, updatedFields) => {
// try {
//   const user = JSON.parse(localStorage.getItem('user'));
//   const token = user.token;
//   const appetizer = appetizers.find((appetizer) => appetizer._id === id);

//   const updatedOptions = {};
//   if (updatedFields.sauces || updatedFields.newSauce.length > 0) {
//     updatedOptions.sauce = [
//       ...updatedFields.sauces,
//       ...updatedFields.newSauce.filter(Boolean),
//     ];
//   }
//   if (updatedFields.dressings || updatedFields.newDressing.length > 0) {
//     updatedOptions.dressing = [
//       ...updatedFields.dressings,
//       ...updatedFields.newDressing.filter(Boolean),
//     ];
//   }

//   const updatedAppetizer = {
//     ...appetizer,
//     name: updatedFields.name,
//     description: updatedFields.description,
//     price: updatedFields.price,
//     ...(Object.keys(updatedOptions).length && { options: updatedOptions }),
//   };

//   await updateAppetizer(token, id, updatedAppetizer);
//   setEditMode(null);

//   // Update the local appetizer list with the new data
//   setAppetizerList(appetizerList.map((item) => (item._id === id ? updatedAppetizer : item)));
//   console.log('Update successful');
// } catch (error) {
//   console.error('Error updating appetizer:', error);
// }
// };


const handleSave = async (id, updatedFields) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    const appetizer = appetizers.find((appetizer) => appetizer._id === id);

    const updatedOptions = {};

    // Check if sauces exist and are not empty
    if (updatedFields.sauces && updatedFields.sauces.length > 0) {
      updatedOptions.sauce = updatedFields.sauces;
    }

    // Check if newSauce exists and has non-empty values
    if (updatedFields.newSauce && updatedFields.newSauce.length > 0) {
      updatedOptions.sauce = [
        ...(updatedOptions.sauce || []),
        ...updatedFields.newSauce.filter(Boolean),
      ];
    }

    // Check if dressings exist and are not empty
    if (updatedFields.dressings && updatedFields.dressings.length > 0) {
      updatedOptions.dressing = updatedFields.dressings;
    }

    // Check if newDressing exists and has non-empty values
    if (updatedFields.newDressing && updatedFields.newDressing.length > 0) {
      updatedOptions.dressing = [
        ...(updatedOptions.dressing || []),
        ...updatedFields.newDressing.filter(Boolean),
      ];
    }

    const updatedAppetizer = {
      ...appetizer,
      name: updatedFields.name,
      description: updatedFields.description,
      price: updatedFields.price,
      ...(Object.keys(updatedOptions).length && { options: updatedOptions }),
    };

    await updateAppetizer(token, id, updatedAppetizer);
    setEditMode(null);

    // Update the local appetizer list with the new data
    setAppetizerList(appetizerList.map((item) => (item._id === id ? updatedAppetizer : item)));
    console.log('Update successful');
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

const handleAdd = () => {
// Logic to add an item to the server using POST request
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
  <button onClick={handleAdd} className="btn btn-blue mt-3">Add New Item</button>
</div>
);
};

export default RenderAppetizers;