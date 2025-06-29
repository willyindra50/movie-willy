import React from 'react';

interface CastCrewPerson {
  id: number;
  name: string;
  profile_path: string | null;
  character?: string; // For cast
  job?: string; // For crew
}

interface CastCrewCardProps {
  person: CastCrewPerson;
  type: 'cast' | 'crew'; // To differentiate between character and job
}

const CastCrewCard: React.FC<CastCrewCardProps> = ({ person, type }) => {
  const displayRole = type === 'cast' ? person.character : person.job;

  return (
    <div className='cast-crew-card flex flex-row items-center gap-4 h-[140px]'>
      <img
        src={
          person.profile_path
            ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
            : 'https://placehold.co/69x140?text=No+Image'
        }
        alt={person.name}
        className='profile-image h-[140px]'
      />
      <div className='flex flex-col items-start gap-1 flex-1'>
        <div
          className='text-md font-semibold leading-[30px]'
          style={{ color: 'var(--color-neutral-50)' }}
        >
          {person.name}
        </div>
        <div
          className='text-md font-normal leading-[30px]'
          style={{ color: 'var(--color-neutral-500)' }}
        >
          {displayRole}
        </div>
      </div>
    </div>
  );
};

export default CastCrewCard;
