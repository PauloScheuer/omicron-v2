import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="font-medium text-lg flex flex-wrap md:flex-nowrap w-full py-16 bg-primaryDark text-light justify-center">
      <section className="flex flex-col items-center w-80 md:pb-0 pb-16">
        <h4 className="font-semibold text-2xl mb-6">Mapa do site</h4>
        <div className="mb-4">
          <Link to="/">Home</Link>
        </div>
        <div className="mb-4">
          <Link to="/conteudos">Conteúdos</Link>
        </div>
        <div className="mb-4">
          <Link to="/descubra">Descubra+</Link>
        </div>
        <div className="mb-4">
          <Link to="/forum">Fórum</Link>
        </div>
        <div className="mb-4">
          <Link to="/userpage">Userpage</Link>
        </div>
      </section>
      <section className="md:pb-0 pb-16 flex flex-col items-center w-80 md:border-2 md:border-t-0 md:border-b-0 border-secundary">
        <h4 className="font-semibold text-2xl mb-6">Contribua</h4>
        <a href="/" className="mb-4">
          Picpay
        </a>
      </section>
      <section className="flex flex-col items-center w-80">
        <h4 className="font-semibold text-2xl mb-6">Sobre o criador</h4>
        <a
          href="https://github.com/PauloScheuer/"
          className="mb-4"
        >
          Github
        </a>
        <a href="https://www.linkedin.com/in/paulo-roberto-scheuer-gomes-848bb11a4/" className="mb-4">
          Linkedin
        </a>
      </section>
    </footer>
  );
}
