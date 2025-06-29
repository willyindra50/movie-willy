import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  className?: string;
  initialQuery?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  className = '',
  initialQuery = '',
}) => {
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) {
        navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    },
    [query, navigate]
  );

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <input
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Search movies...'
        className='w-full bg-white/10 text-white placeholder-white/50 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-white/50'
      />
      <svg
        className='absolute left-3 top-1/2 -translate-y-1/2 text-white/50 w-4 h-4'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <circle cx='11' cy='11' r='8' />
        <path d='M21 21l-4.35-4.35' />
      </svg>
    </form>
  );
};

export default SearchBar;
