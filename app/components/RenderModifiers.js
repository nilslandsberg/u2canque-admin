import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const RenderModifiers = ({ modifiers, updateModifiers }) => {
  const [sides, setSides] = useState([]);
  const [bread, setBread] = useState([]);
  const [newSide, setNewSide] = useState('');
  const [newBread, setNewBread] = useState('');

  useEffect(() => {
    if (modifiers.length > 0) {
      setSides(modifiers[0].sides);
      setBread(modifiers[0].bread);
    }
  }, [modifiers]);

  const handleAddSide = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.token;

    if (newSide.trim() !== '') {
      const updatedSides = [...sides, newSide.trim()];
      setSides(updatedSides);
      setNewSide('');
      updateModifiers(token, { sides: updatedSides, bread });
    }
  };

  const handleAddBread = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
  
    if (newBread.trim() !== '') {
      const updatedBread = [...bread, newBread.trim()];
      setBread(updatedBread);
      setNewBread('');
      updateModifiers(token, { sides, bread: updatedBread });
    }
  };

  const handleDeleteSide = (index) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
  
    if (sides.length > 1) {
      const updatedSides = [...sides];
      updatedSides.splice(index, 1);
      setSides(updatedSides);
      updateModifiers(token, { sides: updatedSides, bread });
    } else {
      alert('Cannot delete the last side item.');
    }
  };
  
  const handleDeleteBread = (index) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
  
    if (bread.length > 1) {
      const updatedBread = [...bread];
      updatedBread.splice(index, 1);
      setBread(updatedBread);
      updateModifiers(token, { sides, bread: updatedBread });
    } else {
      alert('Cannot delete the last bread item.');
    }
  };
  

  return (
    <div>
      <div>
        <h3 className="text-xl font-bold mb-2">Sides</h3>
        <ul>
          {sides.map((side, index) => (
            <li key={index} className="flex items-center mb-2">
              <span>{side}</span>
              <button
                onClick={() => handleDeleteSide(index)}
                className="ml-2 text-red-600"
              >
                <FontAwesomeIcon icon={faTrashCan} style={{ color: '#eb4444' }} />
              </button>
            </li>
          ))}
        </ul>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={newSide}
            onChange={(e) => setNewSide(e.target.value)}
            className="border border-gray-300 rounded mr-2 text-black"
            placeholder="Add new side"
          />
          <button onClick={handleAddSide} className="btn btn-orange">
            Add New
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-2">Bread</h3>
        <ul>
          {bread.map((breadItem, index) => (
            <li key={index} className="flex items-center mb-2">
              <span>{breadItem}</span>
              <button
                onClick={() => handleDeleteBread(index)}
                className="ml-2 text-red-600"
              >
                <FontAwesomeIcon icon={faTrashCan} style={{ color: '#eb4444' }} />
              </button>
            </li>
          ))}
        </ul>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={newBread}
            onChange={(e) => setNewBread(e.target.value)}
            className="border border-gray-300 rounded mr-2 text-black"
            placeholder="Add new bread"
          />
          <button onClick={handleAddBread} className="btn btn-orange">
            Add New
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenderModifiers;