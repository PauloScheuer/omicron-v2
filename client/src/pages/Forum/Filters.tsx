import React from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Button from '../../components/Button';
import { KindOrderType, ParamOrderType } from '../../utils/types';
import Pagination from './Pagination';

interface FiltersI{
  paramOrder: ParamOrderType;
  kindOrder: KindOrderType;
  setParamOrder: (param : ParamOrderType)=>void;
  setKindOrder: (param : KindOrderType)=>void;
  pagination:JSX.Element;
  action:(n:number)=>void;
}

export default function Filters({paramOrder,kindOrder,setParamOrder,setKindOrder,pagination,action} : FiltersI) {
  return (
    <div className="mt-6 flex flex-col lg:flex-row justify-between">
    <div className="flex lg:flex-row flex-col flex-wrap lg:items-center">
      <h2 className="text-primaryDark text-xl font-medium lg:mb-0 mb-4">Ordenar por:</h2>
      <div className="flex lg:ml-4">
        <div 
        className={`flex-none w-min py-1 px-3 mr-4 rounded-lg font-medium text-center cursor-pointer bg-white text-dark border-2
        ${paramOrder !== ParamOrderType.date ? "border-solid border-white" : "border-dashed border-primaryDark"}`}
        onClick={()=>setParamOrder(ParamOrderType.date)}
        >
          <span>Data</span>
        </div>
        <div 
        className={`flex-none w-min py-1 px-3 rounded-lg font-medium text-center cursor-pointer bg-white text-dark border-2
        ${paramOrder !== ParamOrderType.likes ? "border-solid border-white" : "border-dashed border-primaryDark"}`}
        onClick={()=>setParamOrder(ParamOrderType.likes)}
        >
          <span>Curtidas</span>
        </div>
      </div>
      <hr className="h-8 bg-primary lg:w-px w-0 ml-2 mr-2" />
      <div className="flex">
        <div 
        className={`flex-none w-min py-1 px-3 mr-4 rounded-lg font-medium text-center cursor-pointer bg-white text-dark border-2
        ${kindOrder !== KindOrderType.asc ? "border-solid border-white" : "border-dashed border-primaryDark"}`}
        onClick={()=>setKindOrder(KindOrderType.asc)}
        >
          <FiChevronUp />
        </div>
        <div 
        className={`flex-none w-min py-1 px-3 rounded-lg font-medium text-center cursor-pointer bg-white text-dark border-2
        ${kindOrder !== KindOrderType.desc ? "border-solid border-white" : "border-dashed border-primaryDark"}`}
        onClick={()=>setKindOrder(KindOrderType.desc)}
        >
          <FiChevronDown />
        </div>
      </div>
      <hr className="h-8 bg-primary lg:w-px w-0 ml-2 mr-2" />
      <Button action={action} value="Procurar" style="lg:ml-2"/>
    </div>
    {pagination}
  </div>
  )
}
