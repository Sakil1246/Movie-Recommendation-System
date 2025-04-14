import React, { useState } from 'react';
import { POSTER_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { genreMap } from '../utils/mockData';
import { motion, AnimatePresence } from "framer-motion";

const RecomMovieCard = ({ path, details }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { id } = details;
  const genres = details?.genre_ids?.map((id) => genreMap[id]);

  const movieInfo = () => {
    navigate(`/tertiary/${id}`, { state: { details } });
  };

  return (
    <div
      className="relative w-40 sm:w-44 md:w-48 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        alt={details?.title}
        src={POSTER_URL + path}
        className="w-full h-auto object-cover rounded-md transition-transform duration-300"
        onClick={movieInfo}
      />

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1.2, y: -20 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-0 left-0 z-50 w-64"
            onClick={movieInfo}
          >
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              {/* Poster */}
              <img
                src={POSTER_URL + path}
                alt={details?.title}
                className="w-full h-auto object-contain"
              />

              {/* Text overlay */}
              <div className="absolute bottom-0 w-full p-4 bg-zinc-700 bg-opacity-85 rounded-lg">
                <h2 className="text-lg font-bold shadow-2xl text-white truncate">
                  {details?.title || details?.original_title}
                </h2>

                <div className="flex text-sm text-green-400 mt-1">
                  {details?.vote_average ? `${Math.floor(details.vote_average * 10)}% Match` : ""}
                  <span className="ml-2 text-gray-200">{details?.release_date}</span>
                </div>

                <div className="text-sm text-slate-100 mt-1 whitespace-normal break-words">
                  • {genres.join(" • ")}
                </div>

                <div className="flex space-x-2 mt-3">
                  <button className="bg-white text-black px-4 py-1 rounded hover:bg-gray-200 flex items-center">
                    ▶ Play
                  </button>
                  <button className="bg-gray-100 px-3 py-1 rounded">＋</button>
                </div>
              </div>

            </div>
          </motion.div>

        )}
      </AnimatePresence>
    </div>
  );
};

export default RecomMovieCard;
