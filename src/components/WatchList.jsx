import React from 'react'
import { useLocation } from 'react-router-dom'
import MovieCard from './MovieCard';

const WatchList = () => {

    const location=useLocation();
    const {details2}=location.state;
    console.log(details2);
  return (
    <div className='bg-black min-h-screen px-4 py-8'>
      <h1 className='text-3xl text-orange-500 font-semibold'>Your WatchList</h1>
      <MovieCard path={details2.poster_path} details={details2}/>
    </div>
  )
}

export default WatchList
