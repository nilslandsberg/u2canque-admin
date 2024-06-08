import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { capitalizeFirstLetter } from '../utils/stringManipulation';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const renderPriceInput = (menuItemType, editValues, handleInputChange) => {
  if (menuItemType === 'bulk') {
    const bulkPriceKeys = ['onePound', 'threePounds', 'fivePounds', 'halfPan', 'fullPan'];
    
    return (
      <div className="my-6 w-1/2">
        <div className="text-white font-bold text-xl mb-2">Price and Sizes:</div>
        {bulkPriceKeys.map((key) => {
          const value = editValues.price?.[key] || '';
          const formattedKey = key.replace(/([A-Z])/g, ' $1').trim(); // Add space before uppercase letters

          return (
            <div key={key} className="flex items-center mb-2">
              {/* <span className="text-white mr-2 font-bold w-32">{key}:</span> */}
              <span className="text-white mr-2 font-bold w-32">{formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1)}:</span>
              <input
                type="text"
                value={value.replace('$', '').trim()}
                onChange={(e) => {
                  const newValue = e.target.value;
                  handleInputChange('price', {
                    ...editValues.price,
                    [key]: newValue,
                  });

                  if (key === 'onePound') {
                    handleInputChange('pricePerPound', e.target.value);
                  }
                }}
                pattern="^\d+(\.\d{1,2})?$"
                className="text-black border border-gray-300 rounded px-2 py-1 mr-2 flex-grow"
              />
            </div>
          );
        })}
      </div>
    );
  
  } else if (menuItemType === 'sides') {
      const bulkPriceKeys = ['pint', 'quart', 'halfPan', 'fullPan'];
  
      return (
        <div className="my-6 w-1/2">
          <div className="text-white font-bold text-xl mb-2">Price and Sizes:</div>
          {bulkPriceKeys.map((key) => {
            const value = editValues.price?.[key] || '';
            const formattedKey = key.replace(/([A-Z])/g, ' $1').trim(); // Add space before uppercase letters
  
            return (
              <div key={key} className="flex items-center mb-2">
              <span className="text-white mr-2 font-bold w-32">{formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1)}:</span>
                <input
                  type="text"
                  value={value.replace('$', '').trim()}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    handleInputChange('price', {
                      ...editValues.price,
                      [key]: newValue,
                    });

                  }}
                  pattern="^\d+(\.\d{1,2})?$"
                  className="text-black border border-gray-300 rounded px-2 py-1 mr-2 flex-grow"
                />
              </div>
            );
          })}
        </div>
      );
  
  } else if (menuItemType === 'holiday') {
    const holidayPriceKeys = ['fourPounds', 'fivePounds', 'sixPounds', 'sevenPounds', 'eightPounds', 'ninePounds', 'tenPounds', 'halfPan', 'fullPan'];

    return (
      <div className="my-6 w-1/2">
        <div className="text-white font-bold text-xl mb-2">Price and Sizes:</div>
          <i className='text-red-500  my-5'>main items: EITHER enter single price OR enter prices by pounds</i>
          <br />
          <i className='text-red-500  my-5'>side items: ONLY fill out price by pan (and click yes on "Is a Side?")</i>
        <div className="flex my-5 items-center">
          <span className="text-white mr-2 font-bold w-32 ">Single Price:</span>
          <input
            className="text-black border border-gray-300 rounded px-2 py-1 mr-2 flex-grow"
            type="text"
            value={editValues.price || ''}
            onChange={(e) => handleInputChange('price', e.target.value)}
            pattern="^\d+(\.\d{1,2})?$"
            required
          />
        </div>
        <hr />
        {holidayPriceKeys.map((key) => {
          const value = editValues.price?.[key] || '';
          const formattedKey = key.replace(/([A-Z])/g, ' $1').trim(); // Add space before uppercase letters

          return (
            <div key={key} className="flex items-center mb-3 mt-3">
              <span className="text-white mr-2 font-bold w-32">{formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1)}:</span>
              <input
                type="text"
                value={value.replace('$', '').trim()}
                onChange={(e) => {
                  const newValue = e.target.value;
                  handleInputChange('price', {
                    ...(typeof editValues.price === 'string' ? {} : editValues.price),
                    [key]: newValue,
                  });

                  if (key === 'fourPounds') {
                    handleInputChange('pricePerPound', (e.target.value / 4));
                  }
                }}
                pattern="^\d+(\.\d{1,2})?$"
                className="text-black border border-gray-300 rounded px-2 py-1 mr-2 flex-grow"
              />
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
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
    );
  }
};
  

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
      {/* Name Editing */}
      <div>
        <div className="font-bold text-xl text-white">Name:</div>
        <input
          type="text"
          value={editValues.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className="font-bold text-xl w-full"
        />
      </div>

      {/* Description Editing */}
      <div className="relative my-5">
        <span className="font-bold text-xl text-white absolute top-0">Description:</span>
        <textarea
          value={editValues.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          className="mt-6 w-full h-20"
        />
      </div>
      
      {/* Price Editing */}
      {renderPriceInput(menuItemType, editValues, handleInputChange)}

      {/* Image Editing... currently only as URL, no file storage for custom upload as of now */}
      <div>
        <div className="font-bold text-xl text-white">Image URL:</div>
        <input
          type="text"
          value={editValues.image}
          onChange={(e) => handleInputChange('image', e.target.value)}
          className="text-l w-1/2"
          placeholder='http:// or https://'
        />
      </div>

      {/* Options Editing */}
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
                  <FontAwesomeIcon icon={faTrashCan} className="text-red-500 hover:text-red-700" />
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
              Add New {capitalizeFirstLetter(option)}
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
              <span className='italic'>[select one or more day(s) to make item available for order]</span>
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
            <div className="flex  ">
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

      {/* Holiday Editing */}
      {menuItemType === 'holiday' && (
        <div className="text-white my-6">
          <div className="font-bold text-xl">Holiday(s) Available:</div>
          <div className="flex items-center mr-4">
            <div className="flex flex-wrap my-3">
              {['Easter', 'Memorial Day', 'Independence Day', 'Thanksgiving', 'Christmas'].map((holiday) => (
                <div key={holiday} className="flex items-center mr-4">
                  <input
                    type="checkbox"
                    id={holiday}
                    checked={(editValues.type || []).includes(holiday)}
                    onChange={(e) => {
                      const updatedTypes = e.target.checked
                        ? [...(editValues.type || []), holiday]
                        : (editValues.type || []).filter((t) => t !== holiday);
                      handleInputChange('type', updatedTypes);
                    }}
                  />
                  <label htmlFor={holiday} className="ml-2 text-white">
                    {holiday}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* New section for "Is a Side" */}
          <div className="my-6 w-1/2">
            <div className="font-bold text-xl text-white mb-2">Is a Side?</div>
            <div className="flex">
              <div className="flex items-center mr-4">
                <input
                  type="radio"
                  id="notSide"
                  checked={!editValues.side}
                  onChange={() => handleInputChange('side', false)}
                  className="mr-2"
                />
                <label htmlFor="notSide" className="text-white">
                  No
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="yesSide"
                  checked={editValues.side}
                  onChange={() => handleInputChange('side', true)}
                  className="mr-2"
                />
                <label htmlFor="yesSide" className="text-white">
                  Yes
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Buttons for Adding, Canceling, Saving, Deleting */}
      {addingNewMode && (
        <>
          <button className="btn btn-green mt-3" onClick={handleSave}>
            Save
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