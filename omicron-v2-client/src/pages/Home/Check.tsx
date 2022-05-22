import React from 'react';
import { Link } from 'react-router-dom';

export default function Check() {
  return (
    <section className="bg-secundary h-32 flex justify-center items-center text-primaryDark">
      <div className="font-bold text-4xl text-center pt-14 mb-16 underline">
        <Link to="/conteudos">Confira já!</Link>
      </div>
    </section>
  );
}
