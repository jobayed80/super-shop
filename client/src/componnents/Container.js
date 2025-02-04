import React from 'react';

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="container mx-auto px-4">{children}</div>;
};

export default Container;