import React from 'react'
import { FiPlus } from 'react-icons/fi';

interface ButtonCreateI{
  action: ()=>void;
  text: string;
  enabled: boolean;
}

export default function ButtonCreate({action, text, enabled}: ButtonCreateI) {
  return (
    <div
      className={`flex justify-center items-center bg-white border-2 ${enabled ? 'hover:bg-primary hover:text-white cursor-pointer text-primary border-primary' : 'text-grey border-grey'} transition duration-300 rounded w-min p-3 mt-4`}
      onClick={enabled ? action : ()=>{}}
    >
      <FiPlus size={20}/>
      <span className="whitespace-nowrap font-bold ml-2">{text}</span>
    </div>
  )
}
