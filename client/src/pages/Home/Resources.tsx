import React from 'react';

import learning from '../../assets/images/learning.svg';

export default function Resources() {
  return (
    <section className="text-primaryDark md:pl-40 md:pr-40">
      <h2 className="font-bold text-5xl text-center pt-10 pb-10">
        Nossos recursos
      </h2>
      <div className="md:flex items-center pb-20">
        <div className="md:w-1/2 px-4 ">
          <p className="font-normal text-2xl ">
            Contamos com uma vasta coleção de textos e calculadoras passo a
            passo, além um fórum totalmente voltado à Matemática e uma área de
            conteúdo interdiciplinar.
          </p>
        </div>
        <div className="flex justify-center w-1/2 px-4">
          <img
              src={learning}
              alt="Matemática"
              className="w-80 h-80 mt-12  md:block hidden"
            />
        </div>
      </div>
    </section>
  );
}
