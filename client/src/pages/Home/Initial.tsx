import React from 'react';
import { FiChevronDown } from 'react-icons/fi';
import math from '../../assets/images/math.svg';

export default function Initial() {
  return (
    <section className="h-screen md:pl-40 md:pr-40 flex flex-col items-center -mt-28">
      <div className="flex justify-between items-center h-full w-full">
        <h1 className="text-secundary text-5xl md:text-6xl font-semibold mx-10 md:mx-0">
          Calculadoras,
          <br /> textos,
          <br /> comunidade.
        </h1>
        <img
          src={math}
          alt="Matemática"
          className="w-96 h-96 mt-24 md:block hidden"
        />
      </div>
      <FiChevronDown
        size={100}
        className="text-secundary absolute bottom-0 cursor-pointer"
        onClick={() => {
          window.scroll({
            top: window.innerHeight,
            left: 0,
            behavior: 'smooth',
          });
        }}
      />
    </section>
  );
}
