import React from 'react'
import { useSelector } from 'react-redux';
import MovieList from './MovieList';

const Secondary = () => {

  const nowPlaying = useSelector((store) => store.movies?.nowPlaying);
  const popular = useSelector((store) => store.movies?.popular);
  const topRated = useSelector((store) => store.movies?.topRated);
  const upcoming = useSelector((store) => store.movies?.upComing);

  return (
    <div className='bg-black'>
      <div className=' mt-0 md:-mt-52 pl-4 md:pl-12 relative z-20'>
        <MovieList list={nowPlaying} tittle={"Now Playing"} />
        <MovieList list={popular} tittle={"Popular"} />
        <MovieList list={topRated} tittle={"Top Rated"} />
        <MovieList list={upcoming} tittle={"Upcoming"} />

      </div>
    </div>
  )
}

export default Secondary
