import React from 'react';
import Layout from './Layout';
import construction from '../assets/images/construction.svg';

const WorkingIn = () => {
  return (
    <Layout>
      <div className="h-screen flex flex-col items-center relative">
        <h1 className="text-secundary text-6xl font-bold mt-12">Página em construção</h1>
        <img src={construction} alt="" className="w-4/5 h-4/5 md:block hidden absolute top-24"/>
      </div>
    </Layout>
  );
}
export default WorkingIn;
