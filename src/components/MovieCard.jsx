import React, { useState } from 'react';
import { IMG_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import useCast from '../hooks/useCast';

const MovieCard = ({ path, details }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const movieInfo = () => {
    navigate("/movieDetails", { state: { details } });
  };
 

  return (
    <div
      className="relative w-48 h-72 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={movieInfo}
    >
      <img
        alt="Movie card"
        className="w-full h-full object-cover rounded-md transition-transform duration-300 group-hover:scale-110"
        src={IMG_URL + path}
      />

      {isHovered && (
        <div className="absolute top-0 my-auto left-0 z-50 w-96 bg-zinc-900 text-white p-4 rounded-md shadow-lg transition-all duration-300 scale-110">
          <img
            src={IMG_URL + path}
            alt="Expanded movie"
            className="w-full h-48 object-cover rounded-md mb-2"
          />
          <h2 className="text-lg font-semibold">{details?.title || details?.name}</h2>
          <div className="flex text-sm text-green-400 mt-1">
            {details?.vote_average ? `${Math.floor(details.vote_average * 10)}% Match` : ""}
            <span className="ml-2 text-gray-400">{details?.release_date || details?.first_air_date}</span>
          </div>
          <div className="text-sm text-gray-300 mt-2">
            {details?.overview?.slice(0, 100)}...
          </div>
          <div className="flex space-x-2 mt-3">
            <button className="bg-white text-black px-4 py-1 rounded hover:bg-gray-200">▶ Play</button>
            <button className="bg-gray-700 px-3 py-1 rounded">＋</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
