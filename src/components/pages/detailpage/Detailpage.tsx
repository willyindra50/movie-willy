import { useParams } from 'react-router-dom';
import { useMovieDetails } from '../../../hooks/useMovieDetails';
import { useFavorites } from '../../../hooks/useFavorites';
import Button from '../../ui/Button/Button';
import toast from 'react-hot-toast';
import CastCrewCard from '../../common/CastCrewCard';
import {
  findOfficialTrailer,
  getMainCrew,
  formatRating,
  getAgeRating,
  getImageUrl,
} from './helper';

const Detailpage: React.FC = () => {
  const { id } = useParams();
  const { data: movie, isLoading } = useMovieDetails(Number(id));
  const { isFavorite, toggleFavorite } = useFavorites();

  if (isLoading)
    return <div className='text-white text-center py-10'>Loading...</div>;
  if (!movie)
    return <div className='text-white text-center py-10'>Movie not found.</div>;

  console.log('Movie object in Detailpage:', movie);

  const officialTrailer = findOfficialTrailer(movie);
  const mainCrew = getMainCrew(movie);

  return (
    <div className='min-h-screen bg-zinc-950 flex flex-col'>
      <main>
        {/* Hero/Backdrop */}
        <section className='w-full h-[454px] md:h-[810px] flex items-end overflow-hidden '>
          <img
            src={getImageUrl(movie.backdrop_path, 'backdrop')}
            alt={movie.title}
            className='absolute inset-0 w-full h-[454px] md:h-[810px] object-cover object-top z-0'
            loading='eager'
          />
          <div className='absolute inset-0 h-[454px] md:h-[810px] bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10' />
        </section>

        {/* Movie Details Content */}
        <div className='container relative w-full flex flex-col md:flex-row items-start gap-4 md:gap-8 pb-8 pt-1 -mt-[160px] md:-mt-[420px]'>
          <img
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
            className='w-[116px] h-[171px] rounded-xl shadow-lg object-cover md:w-[290px] md:h-[432px] md:min-w-[290px] md:min-h-[432px] md:relative z-20'
          />
          <div className='flex-1 flex flex-col gap-4 w-full md:mt-0 md:gap-6 z-10'>
            <h1 className='text-title md:text-[40px] md:leading-[44px]'>
              {movie.title}
            </h1>
            <div className='flex items-center gap-2 text-body justify-start md:justify-start'>
              {/* Calendar Icon */}
              <svg
                className='text-white w-5 h-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <rect x='3' y='4' width='18' height='18' rx='2' ry='2'></rect>
                <line x1='16' y1='2' x2='16' y2='6'></line>
                <line x1='8' y1='2' x2='8' y2='6'></line>
                <line x1='3' y1='10' x2='21' y2='10'></line>
              </svg>
              <span>
                {new Date(movie.release_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className='flex flex-row items-center gap-4 w-full md:flex-row md:items-start'>
              {officialTrailer && (
                <Button
                  variant='primary'
                  onClick={() => {
                    window.open(
                      `https://www.youtube.com/watch?v=${officialTrailer.key}`,
                      '_blank'
                    );
                  }}
                  className='flex items-center gap-2 h-[44px] justify-center md:w-[220px] md:h-[52px]'
                >
                  <span>Watch Trailer</span>
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <mask
                      id='mask0_24418_962'
                      style={{ maskType: 'luminance' }}
                      maskUnits='userSpaceOnUse'
                      x='1'
                      y='1'
                      width='22'
                      height='22'
                    >
                      <path
                        d='M12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22Z'
                        fill='white'
                        stroke='white'
                        strokeWidth='2'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M10 12V8.53601L13 10.268L16 12L13 13.732L10 15.464V12Z'
                        fill='black'
                        stroke='black'
                        strokeWidth='2'
                        strokeLinejoin='round'
                      />
                    </mask>
                    <g mask='url(#mask0_24418_962)'>
                      <path d='M0 0H24V24H0V0Z' fill='#FDFDFD' />
                    </g>
                  </svg>
                </Button>
              )}
              <button
                className={`favorite-btn flex items-center justify-center w-[44px] h-[44px] md:w-[52px] md:h-[52px] md:min-w-[52px] md:min-h-[52px] ${
                  isFavorite(movie) ? 'active' : ''
                }`}
                onClick={() => {
                  const removed = toggleFavorite(movie);
                  if (removed) {
                    toast.error('Removed from Favorites');
                  } else {
                    toast.success('Success Add to Favorites');
                  }
                }}
                aria-label={
                  isFavorite(movie)
                    ? 'Remove from Favorites'
                    : 'Add to Favorites'
                }
              >
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill={isFavorite(movie) ? '#dc2626' : 'none'}
                  stroke='currentColor'
                  strokeWidth='1'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='feather feather-heart'
                >
                  <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
                </svg>
              </button>
            </div>
            <div className='flex flex-row md:flex-row gap-3 md:gap-5 mt-2 md:mt-0 md:gap-6 w-full'>
              <div className='stats-card flex-1 w-full h-[120px] md:h-[120px] md:w-[170px] md:min-w-[170px] flex flex-col justify-start items-start'>
                {/* Star Icon */}
                <svg
                  className='text-yellow-500 mb-2 w-6 h-6'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  stroke='currentColor'
                  strokeWidth='0'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'></polygon>
                </svg>
                <div className='text-body'>Rating</div>
                <div className='text-subtitle'>
                  {formatRating(movie.vote_average)}/10
                </div>
              </div>
              <div className='stats-card flex-1 w-full h-[120px] md:h-[120px] md:w-[170px] md:min-w-[170px] flex flex-col justify-start items-start'>
                {/* Video Icon */}
                <svg
                  className='text-white mb-2 w-6 h-6'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  stroke='currentColor'
                  strokeWidth='0'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <polygon points='23 7 16 12 23 17 23 7'></polygon>
                  <rect x='1' y='5' width='15' height='14' rx='2' ry='2'></rect>
                </svg>
                <div className='text-body'>Genre</div>
                <div className='text-subtitle'>{movie.genres?.[0]?.name}</div>
              </div>
              <div className='stats-card flex-1 w-full h-[120px] md:h-[120px] md:w-[170px] md:min-w-[170px] flex flex-col justify-start items-start'>
                {/* Emoji Icon */}
                <svg
                  className='text-white mb-2 w-6 h-6'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  stroke='currentColor'
                  strokeWidth='0'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <circle cx='12' cy='12' r='10'></circle>
                  <path d='M8 14s1.5 2 4 2 4-2 4-2'></path>
                  <line x1='9' y1='9' x2='9.01' y2='9'></line>
                  <line x1='15' y1='9' x2='15.01' y2='9'></line>
                </svg>
                <div className='text-body'>Age Limit</div>
                <div className='text-subtitle'>{getAgeRating(movie.adult)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Overview */}
        <section className='container section-spacing'>
          <h2 className='text-title mb-2'>Overview</h2>
          <p className='text-body'>{movie.overview}</p>
        </section>
        {/* Cast & Crew */}
        <section className='container section-spacing'>
          <h2 className='text-title mb-4'>Main Cast</h2>
          <div className='grid-cast-crew mb-8'>
            {movie.credits?.cast?.slice(0, 6).map((person) => (
              <CastCrewCard
                key={`cast-${person.id}`}
                person={person}
                type='cast'
              />
            ))}
          </div>
          {/* Crew Section */}
          {mainCrew.length > 0 && (
            <div>
              <h3 className='text-title mb-4'>Main Crew</h3>
              <div className='grid-cast-crew'>
                {mainCrew.map((person) => (
                  <CastCrewCard
                    key={`crew-${person.id}`}
                    person={person}
                    type='crew'
                  />
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Detailpage;
