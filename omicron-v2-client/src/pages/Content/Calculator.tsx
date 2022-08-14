import React, { ChangeEvent, useState } from 'react';
import { FiHelpCircle } from 'react-icons/fi';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { FieldType, CalculatorField, CalculatorFieldEntry, StepType } from '../../utils/types';
import {create, all} from 'mathjs';
import Tex2SVG from "react-hook-mathjax";

interface CalculatorI{
  fields: FieldType[];
  neededFields: number;
}

const Calculator = ({fields, neededFields}:CalculatorI) => {
  const [formData, setFormData] = useState<FieldType[]>(fields);
  const [result, setResult] = useState<string[]>([]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target;
    const index = formData.findIndex(item=>item.nameField === name);
    const newFormData = [...formData];
    if (newFormData[index] !== undefined){
      newFormData[index].value = value !== '' ? Number(value) : undefined;
      setFormData(newFormData);
    }
  }

  const getSteps=(field:string)=>{
    return fields.find(item=>{
      return item.nameField === field;
    })?.steps || [];
  }

  const doCalc = ()=>{
    let res : string[] = [];
    const math = create(all);
    let scope : CalculatorField = {};
    formData.forEach(field=>{
      scope[field.nameField] = field.value;
    });

    const countValid = formData.reduce((acc,cur)=>{
      return cur.value !== undefined ? acc + 1 : acc;
    },0);


    if(countValid !== neededFields){
      console.log('error');
    }else{
      const missingField = formData.find(item=> item.value === undefined)?.nameField || '';
      const steps:StepType[] = getSteps(missingField);
      let tempStr : string;
      let valueAsNum : number;
      steps.forEach(step=>{
        tempStr = step.textStep;
        if(step.replaceStep){
          for (const [key, value] of Object.entries(scope).sort((a : CalculatorFieldEntry,b : CalculatorFieldEntry)=>{
            return b[0].length - a[0].length;
          })) {
            valueAsNum = value || Number.MAX_SAFE_INTEGER;
            if(valueAsNum !== Number.MAX_SAFE_INTEGER){
              tempStr = tempStr.replace(key,''+valueAsNum+'');
            }
          }
        }
        if (step.evaluateStep){
          tempStr = 'R=' + math.evaluate(tempStr,scope);
        }
        if (!step.notshowStep){
          console.log('before:'+tempStr);
          const expression = math.parse(tempStr)
          tempStr = expression.toTex();
          console.log('after:'+tempStr);
          res.push(tempStr);
        }
      })
    }
    setResult(res);
  }
  
  return (
    <div className="flex flex-col items-center bg-white py-16 w-full mb-8 lg:w-5/12 lg:mr-8 lg:mb-0 rounded-lg">
      <div className="relative w-full">
        <h2 className="text-primaryDark font-bold h-16 text-3xl mb-6 text-center">Calculadora</h2>
        <FiHelpCircle
          className="text-secundary absolute sm:right-10 right-2 top-2"
          size={24}
          />
      </div>
      <form className="flex flex-col items-center">
      {fields.map(field=>{
        return !field.invisibleField && (
          <div className="w-60 flex items-baseline justify-between" key={field.nameField}>
            <span>{field.nameField}:</span>
            <Input placeholder={field.nameField} name={field.nameField} value={field.value || ''} setValue={handleInputChange} style={`w-48 mb-3`}/>
          </div>
        )
        
      })}
      <Button value="Calcular" action={()=>doCalc()} style={`mt-8`}/>
      <div>
        {result.map((step, index)=>{
          return <Tex2SVG latex={step}/>
        })}
      </div>
    </form>
    </div>
  );
}
export default Calculator;
