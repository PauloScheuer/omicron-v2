import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

interface LayoutType {
  children?: React.ReactNode;
}

function Layout({ children }: LayoutType) {
  return (
    <div className="bg-light">
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
}

export default Layout;
