import React from 'react'
import { useSelector } from 'react-redux';
import MovieList from './MovieList';

const Secondary = () => {

  const nowPlaying = useSelector((store) => store.movies?.nowPlaying);
  const popular=useSelector((store)=>store.movies?.popular);
  const topRated=useSelector((store)=>store.movies?.topRated);

  return (
    <div>
      <MovieList list={nowPlaying} tittle={"Now Playing"} />
      <MovieList list={popular} tittle={"Popular"} />
      <MovieList list={topRated} tittle={"Top Rated"} />

    </div>
  )
}

export default Secondary
