import React from 'react';
import { FiHelpCircle } from 'react-icons/fi';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { FieldType } from '../../utils/types';
import {create, all} from 'mathjs';

interface CalculatorI{
  fields: FieldType[]
}

type CalculatorField = {
  [key: string]: (number | undefined);
}

type CalculatorFieldEntry = [string, number | undefined]

const Calculator = ({fields}:CalculatorI) => {
  const math = create(all);
  let scope : CalculatorField = {};
  fields.forEach(field=>{
    scope[field.name] = field.initialValue;
  });
  // const formulas : { [key: string]: {value:string,evaluate:boolean}[] } = {
  //   'y':[
  //         {value:'y=a*x+b',evaluate:false},
  //         {value:'ax=a*x',evaluate:true},
  //         {value:'y=ax+b',evaluate:true},
  //       ],
  //   'b':[
  //         {value:'y=a*x+b',evaluate:false},
  //         {value:'b=y-a*x',evaluate:false},
  //         {value:'ax=a*x',evaluate:true},
  //         {value:'b=y-ax',evaluate:true},
  //       ],
  //   'a':[
  //         {value:'y=a*x+b',evaluate:false},
  //         {value:'a*x=y-b',evaluate:false},
  //         {value:'yb=y-b',evaluate:true},
  //         {value:'a=yb/x',evaluate:true},
  //       ],
  //   'x':[
  //         {value:'y=a*x+b',evaluate:false},
  //         {value:'a*x=y-b',evaluate:false},
  //         {value:'yb=y-b',evaluate:true},
  //         {value:'x=yb/a',evaluate:true},
  //       ]
  // };
  const formulas : { [key: string]: {value:string,evaluate?:boolean,notshow?:boolean,replace?:boolean}[] } = {
    'y':[
          {value:'y=a*x+b'},
          {value:'y=a*x+b',replace:true},
          {value:'ax=a*x',evaluate:true, notshow:true},
          {value:'a*x=ax',replace:true},
          {value:'y=ax+b',replace:true},
          {value:'y=ax+b',evaluate:true},
        ],
    'b':[
          {value:'y=a*x+b'},
          {value:'b=y-a*x'},
          {value:'b=y-a*x',replace:true},
          {value:'ax=a*x',evaluate:true, notshow:true},
          {value:'a*x=ax',replace:true},
          {value:'b=y-ax',replace:true},
          {value:'b=y-ax',evaluate:true},
        ],
    'a':[
          {value:'y=a*x+b'},
          {value:'a*x=y-b'},
          {value:'a=(y-b)/x'},
          {value:'a=(y-b)/x',replace:true},
          {value:'yb=y-b',evaluate:true, notshow: true},
          {value:'y-b=yb',replace:true},
          {value:'a=yb/x',replace:true},
          {value:'a=yb/x',evaluate:true},
        ],
    'x':[
          {value:'y=a*x+b'},
          {value:'a*x=y-b'},
          {value:'x=(y-b)/a'},
          {value:'x=(y-b)/a',replace:true},
          {value:'yb=y-b',evaluate:true, notshow: true},
          {value:'y-b=yb',replace:true},
          {value:'x=yb/a',replace:true},
          {value:'x=yb/a',evaluate:true},
        ]
  };
  const countValid = fields.reduce((acc,cur)=>{
    return cur.initialValue !== undefined ? acc + 1 : acc;
  },0);
  if(countValid !== fields.length -1){
    console.log('error');
  }else{
    const missingField = fields.find(item=> item.initialValue === undefined)?.name || '';
    const steps = formulas[missingField];
    let tempStr : string;
    let valueAsNum : number;
    steps.forEach(step=>{
      tempStr = step.value;
      if(step.replace){
        for (const [key, value] of Object.entries(scope).sort((a : CalculatorFieldEntry,b : CalculatorFieldEntry)=>{
          return b[0].length - a[0].length;
        })) {
          valueAsNum = value || Number.MAX_SAFE_INTEGER;
          if(valueAsNum !== Number.MAX_SAFE_INTEGER){
            tempStr = tempStr.replace(key,''+valueAsNum+'');
          }
        }
      }
      if (step.evaluate){
        tempStr = 'R=' + math.evaluate(tempStr,scope);
      }
      if (!step.notshow){
        console.log(tempStr);
      }
    })
  }
  
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
        return (
          <div className="w-60 flex items-baseline justify-between">
            <span>{field.name}:</span>
            <Input placeholder={field.name} name={field.name} value={field.initialValue} setValue={()=>{}} style={`w-48 mb-3`}/>
          </div>
        )

      })}
      <Button value="Calcular" action={()=>{}} style={`mt-8`}/>
    </form>
  );
}
export default Calculator;
