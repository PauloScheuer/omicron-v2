import React from 'react';

interface ButtonI{
  value: string;
  action: ()=>void;
  style?: string;
  enabled?: boolean;
  color?: number;
}

const Button = ({value, action, style = '', enabled = true, color = 1} : ButtonI) => {
  let realColor : string;
  if (enabled){
    if (color === 1){
      realColor = 'bg-primary';
    }else{
      realColor = 'bg-secundary';
    }
  }else{
    if (color === 1){
      realColor = 'bg-primaryLight';
    }else{
      realColor = 'bg-secundaryLight';
    }
  }

  return (
    <input 
      type="button" 
      value={value} 
      disabled={!enabled}
      onClick={action}
      className={
        `${style} 
         ${enabled && 'cursor-pointer'} 
         ${realColor} 
         px-4 py-2 rounded text-white font-semibold text-sm`}
    />)
}
export default Button;
