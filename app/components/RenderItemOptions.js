import React from 'react'
import { capitalizeFirstLetter } from '../utils/stringManipulation'

const RenderItemOptions = ({ options }) => {
  
  return (
    <>
      {Object.keys(options).map((key, i) => (
        <div key={i} className="ml-4">
          <span className="font-semibold">{capitalizeFirstLetter(key)}: </span>
          <span>{options[key]}</span>
        </div>
      ))}
    </>
  )
}

export default RenderItemOptions