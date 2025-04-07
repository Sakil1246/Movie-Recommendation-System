import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ list, tittle }) => {
  return (
    <div className="px-4 w-full">
      <h1 className="text-3xl py-4 font-bold text-orange-400">{tittle}</h1>

      <div className="overflow-x-auto overflow-visible scrollbar-hide relative z-10">
        <div className="flex space-x-4">
          {list?.map((movie) => (
            <div key={movie.id} className="flex-shrink-0 w-48">
              <MovieCard path={movie.poster_path} details={movie}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
