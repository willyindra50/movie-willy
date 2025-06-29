import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// import { FaSearch } from 'react-icons/fa'; // Removed react-icons import
import movieLogo from '../../assets/movie.svg';

interface HeaderProps {
  isTransparent?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isTransparent }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 h-[64px] flex items-center ${
        isTransparent
          ? 'bg-transparent'
          : isScrolled
          ? 'bg-zinc-950/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className='max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 w-full'>
        {/* Mobile Left: Logo, Mobile Center: Search Icon, Mobile Right: Hamburger */}
        <div className='flex items-center w-full md:w-auto md:justify-start'>
          <div className='flex items-center gap-1'>
            <img
              src={movieLogo}
              alt='Movie Explorer Logo'
              className='h-7 w-7 md:h-10 md:w-10'
            />
            <span className='text-white text-[19.9111px] leading-[25px] font-semibold pl-2 pr-10'>
              Movie
            </span>
          </div>

          {/* Search Icon for Mobile */}
          <div className='flex-grow flex justify-end pr-6 md:hidden'>
            <button
              className='text-white'
              aria-label='Search'
              onClick={() => setIsSearchOpen(true)}
            >
              <svg
                width='24'
                height='24'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <circle cx='11' cy='11' r='8'></circle>
                <line x1='21' y1='21' x2='16.65' y2='16.65'></line>
              </svg>
            </button>
          </div>

          {/* Hamburger Icon (Mobile Only) */}
          <button
            className='md:hidden text-white'
            onClick={() => setIsMenuOpen(true)}
            aria-label='Open menu'
          >
            <svg
              width='24'
              height='24'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <line x1='3' y1='12' x2='21' y2='12'></line>
              <line x1='3' y1='6' x2='21' y2='6'></line>
              <line x1='3' y1='18' x2='21' y2='18'></line>
            </svg>
          </button>
        </div>

        {/* Desktop Navigation and Search (flex-grow to push to right) */}
        <nav className='hidden md:flex items-center justify-between flex-grow'>
          <div className='flex items-center gap-12'>
            <NavLink
              to='/'
              className='text-white hover:text-red-500 transition'
            >
              Home
            </NavLink>
            <NavLink
              to='/favorites'
              className='text-white hover:text-red-500 transition'
            >
              Favorites
            </NavLink>
          </div>
          <form onSubmit={handleSearch} className='relative'>
            <input
              type='text'
              placeholder='Search Movie'
              className='bg-zinc-900/60 border border-zinc-800 text-white placeholder:text-zinc-400 rounded-xl py-2 pl-4 pr-10 outline-none focus:ring-2 focus:ring-red-600 backdrop-blur-md w-[260px]'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type='submit'
              aria-label='Search'
              className='absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition'
            >
              <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <circle cx='11' cy='11' r='8'></circle>
                <line x1='21' y1='21' x2='16.65' y2='16.65'></line>
              </svg>
            </button>
          </form>
        </nav>
      </div>
      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className='fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-6 transition'>
          <button
            className='absolute top-6 right-6 text-white'
            onClick={() => setIsSearchOpen(false)}
            aria-label='Close search'
          >
            <svg
              width='28'
              height='28'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <line x1='18' y1='6' x2='6' y2='18'></line>
              <line x1='6' y1='6' x2='18' y2='18'></line>
            </svg>
          </button>
          <form onSubmit={handleSearch} className='w-full max-w-md'>
            <div className='relative'>
              <input
                type='text'
                placeholder='Search Movie'
                className='bg-zinc-900/60 border border-zinc-800 text-white placeholder:text-zinc-400 rounded-xl py-3 pl-5 pr-12 outline-none focus:ring-2 focus:ring-red-600 backdrop-blur-md w-full text-lg'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button
                type='submit'
                aria-label='Search'
                className='absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition'
              >
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <circle cx='11' cy='11' r='8'></circle>
                  <line x1='21' y1='21' x2='16.65' y2='16.65'></line>
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className='fixed inset-0 bg-black/90 z-50 flex flex-col items-start p-6 transition'>
          <button
            className='mb-8 text-white'
            onClick={() => setIsMenuOpen(false)}
            aria-label='Close menu'
          >
            <svg
              width='28'
              height='28'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <line x1='18' y1='6' x2='6' y2='18'></line>
              <line x1='6' y1='6' x2='18' y2='18'></line>
            </svg>
          </button>
          <nav className='flex flex-col gap-6 text-white text-xl font-semibold'>
            <NavLink to='/' onClick={() => setIsMenuOpen(false)}>
              Home
            </NavLink>
            <NavLink to='/favorites' onClick={() => setIsMenuOpen(false)}>
              Favorites
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
