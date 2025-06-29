import React from 'react';
import Hero from '../../container/Hero';
import TrendingNow from '../../container/TrendingNow';
import NewRelease from '../../container/NewRelease';
import { useTrendingMovies } from '../../../hooks/useTrendingMovies';
import { useNavigate } from 'react-router-dom';

const Homepage: React.FC = () => {
  const { data, isLoading } = useTrendingMovies(24);
  const featuredMovies = data?.pages[0]?.results.slice(0, 5) ?? [];
  const navigate = useNavigate();

  return (
    <>
      {isLoading && (
        <div className='text-white text-center py-10'>Loading...</div>
      )}
      {featuredMovies.length > 0 && (
        <Hero
          movies={featuredMovies}
          onSeeDetail={(movieId) => navigate(`/movie/${movieId}`)}
        />
      )}
      <TrendingNow />
      <NewRelease />
    </>
  );
};

export default Homepage;
