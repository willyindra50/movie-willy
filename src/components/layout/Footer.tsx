import React from 'react';
import movieLogo from '../../assets/movie.svg';

const Footer: React.FC = () => {
  return (
    <footer className='w-full bg-black/90 py-6 mt-12'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between px-6'>
        {/* Logo */}
        <div className='flex items-center gap-2 mb-2 md:mb-0'>
          <span className='text-white text-xl font-bold flex items-center gap-3'>
            <img
              src={movieLogo}
              alt='Movie Explorer Logo'
              className='h-7 w-7 md:h-10 md:w-10'
            />
            Movie
          </span>
        </div>
        {/* Copyright */}
        <div className='text-white/60 text-sm'>
          Copyright ©2025 Movie Explorer
        </div>
      </div>
    </footer>
  );
};

export default Footer;
