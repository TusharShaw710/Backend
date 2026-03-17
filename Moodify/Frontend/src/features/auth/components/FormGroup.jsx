import React from 'react'

export const FormGroup = ({name,placeholder,setState}) => {
  return (
    <div className="form-group">
        <label htmlFor={name}>{name}</label>
        <input onChange={(e)=>{setState(e.target.value)}} type="text" id={name} name={name} required placeholder={placeholder} />
    </div>
  )
}
