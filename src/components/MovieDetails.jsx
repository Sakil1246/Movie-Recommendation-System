import React from 'react'
import { useLocation } from 'react-router-dom'
import useTrailerNowPlaying from '../hooks/useTrailerNowPlaying';
import { useSelector } from 'react-redux';

const MovieDetails = () => {
    const location=useLocation();
    const {details}=location.state;
    console.log(details);
    useTrailerNowPlaying({id:details.id});
    const trailer=useSelector((store)=>store.movies?.trailer?.[details.id]);
    //console.log(trailer);
    const tariler1=trailer?.[0]?.key;
    const tariler2=trailer?.[1]?.key;
    const tariler3=trailer?.[2]?.key;
    const tariler4=trailer?.[3]?.key;

  return (
    <div className=' bg-black h-auto'>
        <h1 className='text-5xl font-bold  text-white py-5'>{details.original_title}</h1>
      <iframe
        className='h-auto w-2/4 ml-80 aspect-video '
        src={`https://www.youtube.com/embed/${tariler1}?rel=0&modestbranding=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <h1 className='text-black font-bold text-4xl mt-5 py-4 bg-slate-300'>Overview</h1>
      <div className='text-white text-2xl '>{details.overview}</div>
    </div>
  )
}

export default MovieDetails
