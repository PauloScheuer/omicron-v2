import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Calculator from './Calculator';
import Card from '../../components/Card';
import Layout from '../../components/Layout';
import { CardType, FieldType } from '../../utils/types';


const fields : FieldType[] = [
  {name:"y",initialValue:23},
  {name:"a",initialValue:4},
  {name:"x"},
  {name:"b",initialValue:3},
];

const Content = () => {
  const { title } = useParams();
  return( 
    <Layout>
      <div className="md:px-32 px-10 py-20">
        <h1 className="text-secundary font-bold text-4xl text-center">{title}</h1>
        <div className="flex lg:flex-nowrap flex-wrap justify-between items-baseline mt-20">
          <Calculator fields={fields}/>
          <Card title="Sobre" 
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id 
                est laborum."
                kind={CardType.cdContentText}
          />
        </div>
        <Link to='/forum' className="flex justify-center items-center mt-20">
          <span className="font-bold text-primaryDark text-xl ">Ir para o fórum de {title}</span>
          <FiArrowRight
            className="text-secundary"
            size={24}
          />
        </Link>
      </div>
    </Layout>)
}
export default Content;
