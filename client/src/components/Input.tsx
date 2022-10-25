import React, { ChangeEvent } from 'react';

interface InputI{
  placeholder: string;
  name: string;
  value: string | number | undefined;
  setValue: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>)=>void;
  style?: string;
  type?: string;
  options?: string[];
}

const Input = ({placeholder, name, value, setValue, style, type, options}:InputI) => {
  const baseStyle = 'bg-light px-4 py-3 rounded-md focus:outline-none';
  
  return (
    type === 'select' ? 
    (
      <select className={`${style} ${baseStyle}`} value={value} onChange={setValue} name={name}>
        <option value={-1}>Selecione uma opção</option>
        {options?.map((str,i)=>{
          return  <option value={i} key={i}>{str}</option>
        })}
      </select>
    ) :
    type === 'textarea' ?
    (
      <textarea 
        className={`${style} ${baseStyle}`}
        onChange={setValue}
        name={name}
      />
    ) :
    (
      <input 
        placeholder={placeholder}
        name={name}
        value={value}
        type={type || 'text'}
        className={`${style} ${baseStyle}`}
        onChange={setValue}
      />
    )
  );
}
export default Input;
