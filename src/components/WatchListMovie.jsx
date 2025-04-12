import React, { useState } from 'react';
import { IMG_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { genreMap } from '../utils/mockData';
import { useSelector } from 'react-redux';



const WatchListMovie = ({ path, details }) => {
  const { id } = details;
  const navigate = useNavigate();
  //const genres = details?.genre_ids?.map((id) => genreMap[id]);
 

  const movieInfo = () => {
    navigate(`/movieDetails/${id}`, { state: { details } });
  };


  return (
    <div
      className="relative w-full h-full flex flex-col cursor-pointer transition-transform duration-300 group-hover:scale-110"
      onClick={movieInfo}
    >
      <img
        alt={details?.title}
        className="w-full h-3/4 object-cover rounded-t-md"
        src={IMG_URL + path}
      />

      <div className="flex-1 flex flex-col justify-between p-4 bg-slate-900 rounded-b-md">
        <h2 className="text-lg font-semibold text-white">
          {details?.title || details?.original_title}
        </h2>

        <div className="flex space-x-2 mt-3">
          <button className="bg-white text-black px-4 py-1 rounded hover:bg-gray-200">
            ▶ Play
          </button>
        </div>
      </div>
    </div>
  );
};

export default WatchListMovie;
