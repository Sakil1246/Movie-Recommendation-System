import React from 'react'
import { useSelector } from 'react-redux'
import MovieCard from './MovieCard';
const NowPlaying = () => {

  const nowPlaying = useSelector((store) => store.movies?.nowPlaying);
  //console.log(nowPlaying);
  const path = nowPlaying[0].poster_path;
  return (
    <div className='bg-black'>
      <h1 className='text-3xl py-3 font-bold text-orange-400'>Now Playing</h1>
      <div className='flex overflow-x-scroll'>
        <div className='flex '>
          {nowPlaying?.map((movie) => {
            return <MovieCard key={movie.id} path={movie.poster_path} />
          })}
        </div>
      </div>
    </div>
  )
}

export default NowPlaying
