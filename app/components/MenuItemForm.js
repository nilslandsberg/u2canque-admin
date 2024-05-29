import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const MenuItemForm = ({
  editingMode,
  addingNewMode,
  editValues,
  handleInputChange,
  handleSave,
  handleCancel,
  handleDelete,
  options,
  menuItemType,
  sectionName,
}) => {

  return (
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
              <span className='italic'>(select one or more day(s) to make item available for order)</span>
            </div>
            <div className="flex flex-wrap my-3">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Every Day'].map((day) => (
                <div key={day} className="flex items-center mr-4">
                  <input
                    type="checkbox"
                    id={day}
                    checked={(editValues.day || []).includes(day)}
                    onChange={(e) => {
                      const updatedDays = e.target.checked
                        ? [...(editValues.day || []), day]
                        : (editValues.day || []).filter((d) => d !== day);
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
                  id="noSides"
                  checked={editValues.noSides}
                  onChange={() => {
                    handleInputChange('oneSide', false);
                    handleInputChange('twoSides', false);
                  }}
                  className="mr-2"
                />
                <label htmlFor="noSides" className="text-white">
                  No Sides
                </label>
              </div>
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

      {/* Bulk Editing */}
      {menuItemType === 'bulk' && (
        <div>...</div>
      )}

      {/* Sides Editing */}
      {menuItemType === 'sides' && (
        <div>...</div>
      )}

      {/* Holiday Editing */}
      {menuItemType === 'holiday' && (
        <div>...</div>
      )}

      {/* Buttons for Adding, Canceling, Saving, Deleting */}
      {addingNewMode && (
        <>
          <button className="btn btn-green mt-3" onClick={handleSave}>
            Add
          </button>
          <button className="btn btn-yellow mt-3" onClick={handleCancel}>
            Cancel
          </button>
        </>
      )}
      {!addingNewMode && (
        <>
          <button className="btn btn-green mt-3" onClick={() => handleSave(editingMode)}>
            Save
          </button>
          <button className="btn btn-red mt-3" onClick={() => handleDelete(editingMode)}>
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default MenuItemForm;