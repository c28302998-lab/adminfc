import React from 'react';
import logoImg from '../assets/logo_transparent.png';

const Logo = ({ className = "h-12" }) => {
  return (
    <div className={`flex items-center select-none cursor-pointer ${className}`}>
      <img src={logoImg} alt="Football Challenge Logo" className="h-full w-auto object-contain" />
    </div>
  );
};

export default Logo;
