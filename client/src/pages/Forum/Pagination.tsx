import React from 'react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

interface PaginationI{
  page:number;
  setPage: (n:number)=>void;
  min:number;
  max:number;
}

export default function Pagination({page,min,max,setPage}:PaginationI) {

  const handleSetPage = (inc:number)=>{
    if((page+inc > max) || (page+inc < min)){
      return;
    }

    setPage(page+inc);
  }

  return (
    <div className="mt-8 lg:mt-0 flex items-center justify-between">
      <FiArrowLeft className="cursor-pointer text-3xl lg:text-xl" onClick={()=>handleSetPage(-1)}/>
      <div className="ml-2 mr-2 font-medium text-xl lg:text-lg">
        <span className="hidden lg:inline">Página </span> 
        <span>{page}</span> 
        <span className="hidden lg:inline"> de </span> 
        <span className="inline lg:hidden">/</span> 
        <span>{max}</span>
      </div>
      <FiArrowRight className="cursor-pointer text-3xl lg:text-xl" onClick={()=>handleSetPage(1)}/>
    </div>
  )
}
