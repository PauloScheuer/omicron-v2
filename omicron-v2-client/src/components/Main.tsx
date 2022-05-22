import React from 'react';

interface MainType {
  children?: React.ReactNode;
}

export default function Main({ children }: MainType) {
  return <main className="bg-light 2xl:container m-auto mt-28">{children}</main>;
}
