import React from 'react';
import HomeMovieCard from './HomeMovieCard';
import { motion } from 'framer-motion';

const MovieList = ({ list, tittle }) => {
  return (
    <div className="px-4 w-full relative z-10">
      <h1 className="text-3xl py-4 font-bold text-orange-400 sticky top-0 w-fit h-fit rounded-xl bg-black ml-6 z-20">
        {tittle}
      </h1>

      <div className="flex space-x-4 overflow-x-auto scrollbar-hide overflow-visible relative z-10">
        {list?.map((movie) => (
          <motion.div
            key={movie.id}
            className="flex flex-col items-center justify-start bg-[#0F0F24] w-64 p-3 rounded-2xl shadow-md"
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.5)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="w-56 rounded-xl overflow-hidden">
              <HomeMovieCard path={movie.poster_path} details={movie} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
