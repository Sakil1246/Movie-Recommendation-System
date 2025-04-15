
import React from 'react';
import { motion } from 'framer-motion';

import TrendingMovieCard from './TrendingMovieCard';

const TrendingMovieList = ({ list, tittle }) => {
    const list2 = list.slice(0, 9);
    return (
        <div className="px-4 w-full relative z-10">
            <h1 className="text-3xl py-4 font-bold text-white sticky top-0 w-fit h-fit rounded-xl bg-black ml-6 z-20">
                {tittle}
            </h1>
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide overflow-visible pb-10 relative z-10">

                {list2?.map((movie, index) => (
                    <motion.div
                        key={movie.id}
                        className="flex flex-col items-center justify-start bg-black p-3  shadow-md"
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.5)",
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <div className="w-56  overflow-hidden">
                            <TrendingMovieCard path={movie.poster_path} details={movie} index={index} />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default TrendingMovieList;