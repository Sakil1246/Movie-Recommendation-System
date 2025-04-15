import React from 'react';
import HomeMovieCard from './HomeMovieCard';
import { motion } from 'framer-motion';

const MovieList = ({ list, tittle }) => {
  return (
    <div className="px-4 w-full relative z-10">
      <h1 className="text-2xl sm:text-3xl py-4 font-bold text-white sticky top-0 w-fit h-fit rounded-xl bg-black ml-4 sm:ml-6 z-20">
        {tittle}
      </h1>

      <div className="flex flex-nowrap sm:flex-wrap sm:justify-start gap-4 overflow-x-auto scrollbar-hide pb-10">
        {list?.map((movie) => (
          <motion.div
            key={movie.id}
            className="flex-shrink-0 sm:flex-shrink sm:w-[calc(33.333%-1rem)] md:w-64 flex flex-col items-center justify-start bg-[#0F0F24] w-48 p-3 rounded-2xl shadow-md"
            whileHover={{
              scale: 1.05,
              boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.5)',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="w-full rounded-xl overflow-hidden">
              <HomeMovieCard path={movie.poster_path} details={movie} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
