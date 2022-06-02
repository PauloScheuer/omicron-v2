import React, { ChangeEvent } from 'react';

interface InputI{
  placeholder: string;
  name: string;
  value: string | number | undefined;
  setValue: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>)=>void;
  style?: string;
  type?: string;
  options?: string[];
}

const Input = ({placeholder, name, value, setValue, style, type, options}:InputI) => {
  return (
    type !== 'select' ? (
      <input 
        placeholder={placeholder}
        name={name}
        value={value}
        type={type || 'text'}
        className={`${style} bg-light px-4 py-3 rounded-md focus:outline-none`}
        onChange={setValue}
      />
    ) : (
      <select className={`${style} bg-light px-4 py-3 rounded-md focus:outline-none`} onChange={setValue} name={name}>
        <option value={-1} selected={value === -1}>Selecione uma opção</option>
        {options?.map((str,i)=>{
          return  <option value={i} selected={value === i}>{str}</option>
        })}
      </select>
    )
  );
}
export default Input;
