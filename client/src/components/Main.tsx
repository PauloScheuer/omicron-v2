import React from 'react';

interface MainType {
  children?: React.ReactNode;
}

export default function Main({ children }: MainType) {
  return <main className="bg-light m-auto mt-28">{children}</main>;
}
