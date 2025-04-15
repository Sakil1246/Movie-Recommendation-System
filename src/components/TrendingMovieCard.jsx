import React from 'react';
import { POSTER_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

const TrendingMovieCard = ({ path, details, index }) => {
  const { id } = details;
  const navigate = useNavigate();

  const movieInfo = () => {
    navigate(`/tertiary/${id}`, { state: { details } });
  };

  return (
    <div
      className="flex items-center cursor-pointer w-full max-w-screen-xl mx-auto px-4"
      onClick={movieInfo}
    >
      <div
        className="text-[16vw] sm:text-[12vw] md:text-[10vw] font-bold leading-none select-none"
        style={{
          WebkitTextStroke: '2px black',
          color: 'red',
          minWidth: '80px',
        }}
      >
        {index + 1}
      </div>

      <div className="flex flex-col items-center w-[40vw] sm:w-[30vw] md:w-[20vw] lg:w-[15vw] xl:w-[12vw]">
        <img
          src={`${POSTER_URL}${path}`}
          alt={details.title || details.name}
          className="w-full h-auto shadow-md rounded-xl"
        />
      </div>
    </div>
  );
};

export default TrendingMovieCard;
