import React from "react";

interface TitleProps {
  children: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({children}) => {
  return (
    <h2 className="text-3xl text-primary font-semibold text-center">
      {children}
    </h2>
  );
};

export default Title;
