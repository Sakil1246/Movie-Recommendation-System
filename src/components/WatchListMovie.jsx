import React, { useState } from 'react';
import { IMG_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { genreMap } from '../utils/mockData';
import { motion, AnimatePresence } from "framer-motion";


const WatchListMovie = ({ path, details }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const genres = details?.genre_ids?.map((id) => genreMap[id]);
  const movieInfo = () => {
    navigate("/movieDetails", { state: { details } });
  };
  

  return (
    <div
      className="relative ml-3  w-fit h-fit group cursor-pointer transition-transform duration-300 group-hover:scale-110"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={movieInfo}
    >
      <img
        alt="Movie card"
        className="w-full h-full object-cover rounded-md "
        src={IMG_URL + path}
      />

      <div className="relative z-10 p-4 bg-slate-900 rounded-b-md">
        <h2 className="text-lg font-semibold text-white">
          {details?.title || details?.original_title}
        </h2>
        {/* <div className="flex text-sm text-green-400 mt-1">
          {details?.vote_average ? `${Math.floor(details.vote_average * 10)}% Match` : ""}
          <span className="ml-2 text-gray-400">{details?.release_date}</span>
        </div>
        <div className="flex text-sm text-slate-300 mt-1">
          <h2> • {genres.join(" • ")}</h2>
        </div> */}
        <div className="flex space-x-2 mt-3">
          <button className="bg-white text-black px-4 py-1 rounded hover:bg-gray-200">▶ Play</button>
        </div>
      </div>



    </div>
  );
};

export default WatchListMovie;
