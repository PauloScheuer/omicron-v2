import React from 'react'
import { FiPlus } from 'react-icons/fi';

interface ButtonCreateI{
  action: ()=>void;
  text: string;
}

export default function ButtonCreate({action, text}: ButtonCreateI) {
  return (
    <div
      className="flex justify-center items-center bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white transition duration-300 rounded w-min p-3 mt-4 cursor-pointer"
      onClick={action}
    >
      <FiPlus size={20}/>
      <span className="whitespace-nowrap font-bold ml-2">{text}</span>
    </div>
  )
}
