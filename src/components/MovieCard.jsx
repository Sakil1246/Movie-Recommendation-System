import React, { useState } from 'react';
import { IMG_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { genreMap } from '../utils/mockData';
import { motion, AnimatePresence } from "framer-motion";


const MovieCard = ({ path, details }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const {id}=details;
  //console.log(id);
  const genres = details?.genre_ids?.map((id) => genreMap[id]);
  const movieInfo = () => {
    navigate(`/tertiary/${id}`, { state: { details } });
  };


  return (
    <div
      className="w-fit h-fit group cursor-pointer relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={movieInfo}
    >
      <img
        alt={details?.title}
        className="w-full h-full object-contain rounded-md transition-transform duration-300 group-hover:scale-110"
        src={IMG_URL + path}
      />

<AnimatePresence>
  {isHovered && (
    <motion.div
      initial={{ opacity: 0, scale: 1.1, y: 10 }}  // Set scale to 1 to keep original size
      animate={{ opacity: 1, scale: 1.3, y: 10 }}  // Keep scale as 1, adjust y for positioning
      exit={{ opacity: 0, scale: 1, y: 8 }}  // Same as above to avoid scaling on exit
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="absolute top-0 left-0 z-50 w-fit bg-transparent text-white p-0 rounded-md shadow-lg"
    >
      <div className="relative w-64">
        <div
          className="absolute inset-0 rounded-md blur-md brightness-50 z-0"
          style={{
            backgroundImage: `url(${IMG_URL + path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <img
          src={IMG_URL + path}
          alt={details?.title}
          className="relative z-10 w-full h-auto object-contain rounded-md mb-2"
        />
        <div className="relative z-10 p-4 bg-zinc-900 rounded-b-md">
          <h2 className="text-lg font-semibold">
            {details?.title || details?.original_title}
          </h2>
          <div className="flex text-sm text-green-400 mt-1">
            {details?.vote_average ? `${Math.floor(details.vote_average * 10)}% Match` : ""}
            <span className="ml-2 text-gray-400">{details?.release_date}</span>
          </div>
          <div className="flex text-sm text-slate-300 mt-1">
            <h2> • {genres.join(" • ")}</h2>
          </div>
          <div className="flex space-x-2 mt-3">
            <button className="bg-white text-black px-4 py-1 rounded hover:bg-gray-200">▶ Play</button>
            <button className="bg-gray-700 px-3 py-1 rounded">＋</button>
          </div>
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>


    </div>
  );
};

export default MovieCard;
