import React from 'react';

interface DescAndFilterI{
  title: string;
  subtitle: string;
  caption: string;
  listOfOptions: string[];
  selected: number;
  setSelected: (i: number)=>void;
}

export default function DescAndFilter({title, subtitle, caption, listOfOptions, selected, setSelected}:DescAndFilterI) {

  return (
    <>
      <div className="flex flex-col justify-between md:w-128 mb-16">
        <h1 className="text-secundary font-bold text-4xl">{title}</h1>
        <h2 className="text-primaryDark font-bold text-3xl mt-8">{subtitle}</h2>
      </div>
      <div className="flex flex-col justify-between mb-16">
        <p className="text-dark text-xl font-semibold">{caption}</p>
        <div className="flex mt-6 flex-wrap md:justify-start justify-center">
          {listOfOptions.map((option,i)=>{
            return (
              <div 
                onClick={()=>setSelected(i)}
                className={`flex-none w-32 py-3 mr-4 mb-4 rounded-lg font-medium text-center cursor-pointer
                ${selected !== i ? "bg-white text-dark" : "bg-secundary text-primaryDark"}`}
              >
                <span>{option}</span>
              </div>
            )
          })}
        </div>
      </div>
    </>
  );
}
