import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ list, tittle }) => {
  return (
    <div className="px-4 w-full relative z-10">
    <h1 className="text-3xl py-4 font-bold text-orange-400 sticky top-0 bg-black z-20">{tittle}</h1>
    
    <div className="flex space-x-4 overflow-x-auto scrollbar-hide overflow-visible relative z-10">
      {list?.map((movie) => (
        <div key={movie.id} className="flex-shrink-0 w-48 relative z-30">
          <MovieCard path={movie.poster_path} details={movie} />
        </div>
      ))}
    </div>
  </div>
  

  );
};

export default MovieList;
