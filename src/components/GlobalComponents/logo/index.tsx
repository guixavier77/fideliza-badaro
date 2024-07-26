import React from 'react';

const Logo = ({ type, styles }: any) => {

  const textColorClass = type === 'white' ? 'text-white' : 'text-black';
  const className = `text-4xl font-bold text-center ${textColorClass} ${styles}`;
  return (
    <div>
      <h1 className={className}>
        Fideliza<span className="text-red">Badaro</span>
      </h1>
    </div>
  );
};

export default Logo;
