import React from 'react'
import {  FiHeart } from 'react-icons/fi';

interface AnswerI{
  text : string;
  when : string;
  user : string;
  likes : number;
}

export default function Answer({text,when,user,likes}:AnswerI) {
  return (
    <div className="bg-white rounded-lg flex-none md:px-10 px-6 py-6 mb-6">
      <div className="mb-4">
        <span className="text-sm font-medium text-primary">{when} por {user}</span>
      </div>
      <p className="text-sm">{text}</p>
      <div className="flex justify-between mt-4">
        <div className="flex">
          <FiHeart className="text-dark cursor-pointer" size={24}/>
          <span className="font-medium ml-2">{likes}</span>
        </div>
      </div>
    </div>
  )
}
