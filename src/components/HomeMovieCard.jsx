import React from 'react';
import { POSTER_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { genreMap } from '../utils/mockData';
import { motion } from "framer-motion";

const HomeMovieCard = ({ path, details }) => {
  const navigate = useNavigate();
  const { id } = details;
  const genres = details?.genre_ids?.map((id) => genreMap[id]);

  const movieInfo = () => {
    navigate(`/tertiary/${id}`, { state: { details } });
  };

  return (
    <motion.div
      className="group cursor-pointer relative w-56 sm:w-72 md:w-80"
      onClick={movieInfo}
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.5)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="relative w-full bg-[#0F0F24] rounded-md overflow-hidden">
        <img
          alt={details?.title}
          className="w-full h-[350px] sm:h-[400px] object-cover rounded-t-md"
          src={POSTER_URL + path}
        />
        <div className="p-4 bg-[#0F0F24] rounded-b-md min-h-[130px] flex flex-col justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-white truncate">
            {details?.title || details?.original_title}
          </h2>
          <div className="flex text-sm sm:text-base text-green-400 mt-1">
            {details?.vote_average ? `⭐ ${details?.vote_average}` : ""}
          </div>
          <div className="flex text-sm sm:text-base text-slate-300 mt-1 flex-wrap">
            <h2>• {genres.join(" • ")}</h2>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HomeMovieCard;
