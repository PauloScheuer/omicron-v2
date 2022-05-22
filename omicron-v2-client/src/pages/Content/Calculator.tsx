import React from 'react';
import { FiHelpCircle } from 'react-icons/fi';
import Button from '../../components/Button';
import Input from '../../components/Input';

interface CalculatorI{
  fields: string[]
}

const Calculator = ({fields}:CalculatorI) => {
  return (
    <form className="flex flex-col items-center bg-white py-16 w-full mb-8 lg:w-5/12 lg:mr-8 lg:mb-0 rounded-lg">
      <div className="relative w-full">
        <h2 className="text-primaryDark font-bold h-16 text-3xl mb-6 text-center">Calculadora</h2>
        <FiHelpCircle
          className="text-secundary absolute sm:right-10 right-2 top-2"
          size={24}
          />
      </div>
      {fields.map(field=>{
        return <Input placeholder={field} name="" value={0} setValue={()=>{}} style={`w-48 mb-3`}/>

      })}
      <Button value="Calcular" action={()=>{}} style={`mt-8`}/>
    </form>
  );
}
export default Calculator;
