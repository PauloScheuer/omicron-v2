import React from 'react';

import students from '../../assets/images/students.svg';

export default function Welcome() {
  return (
    <section className="h-screen text-light bg-primary md:pl-40 md:pr-40">
      <h2 className="font-bold text-5xl text-center pt-10 mb-16">
        Bem vindo ao Omicron
      </h2>
      <div className="md:flex items-center">
        <div className="flex justify-center w-1/2 px-4">
          <img
            src={students}
            alt="Matemática"
            className="w-80 h-80 mt-12  md:block hidden"
          />
        </div>
        <div className="md:w-1/2 px-4 ">
          <p className="font-normal text-2xl ">
            Somos um site independente que busca auxiliar estudantes do Ensino
            Médio a aprender Matemática.
          </p>
        </div>
      </div>
    </section>
  );
}
