import React from 'react'
import { FiArrowRight, FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

interface QuestionI{
  title : string;
  text : string;
  when : Date;
  user : string;
  likes : number;
  alone?: boolean;
}

export default function Question({title,text,when,user,likes,alone=false}:QuestionI) {
  return (
    <div className="bg-white rounded-lg flex-none md:px-16 px-8 py-10 mb-8">
      <div className="mb-6">
        <h3 className="text-primaryDark font-bold text-3xl">{title}</h3>
        <span className="pl-4 text-sm font-medium text-primary">{new Date(when).toLocaleString()} por {user}</span>
      </div>
      <p className="">{text}</p>
      <div className="flex justify-between mt-8">
        <div className="flex">
          <FiHeart className="text-dark cursor-pointer" size={24}/>
          <span className="font-medium ml-2">{likes}</span>
        </div>
        {!alone && (
          <Link to="/forum/respostas/1" className="flex">
            <span className="font-medium">Ver respostas</span>
            <FiArrowRight className="text-secundary ml-2" size={24}/>
          </Link>
        )}
      </div>
    </div>
  )
}
