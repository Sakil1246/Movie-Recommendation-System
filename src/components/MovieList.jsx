import React from 'react'

import MovieCard from './MovieCard'

const MovieList = ({list,tittle}) => {
  

  return (
    <div className="bg-black px-4">
      <h1 className="text-3xl py-4 font-bold text-orange-400">{tittle}</h1>

      <div className=" overflow-x-scroll scrollbar-hide ">
  <div className="flex space-x-4">
    {list?.map((movie) => (
      <div key={movie.id} className="flex-shrink-0 w-40">
        <MovieCard path={movie.poster_path} />
      </div>
    ))}
  </div>
</div>

    </div>
  )
}

export default MovieList
