import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import useTrailerNowPlaying from '../hooks/useTrailerNowPlaying'
import { useSelector } from 'react-redux'
import { IMG_URL } from '../utils/constants'
import useCast from '../hooks/useCast'

const MovieDetails = () => {
  const [showTrailer, setShowTrailer] = useState(false)
  const location = useLocation()
  const { details } = location.state
  const cast = useCast({ movieId: details.id });
  console.log(cast);
  useTrailerNowPlaying({ id: details.id })

  const trailer = useSelector((store) => store.movies?.trailer?.[details.id])
  const trailerKey1 = trailer?.[0]?.key

  const handleWatchTrailer = () => {
    setShowTrailer(true)
  }

  return (
    <div className='bg-black min-h-screen px-4 py-8'>
        <div className='w-full'>
        {showTrailer && trailerKey1 ? (
          <iframe
            className='w-2/3 aspect-video mx-auto rounded-xl'
            src={`https://www.youtube.com/embed/${trailerKey1}?rel=0&modestbranding=1&autoplay=1`}
            title="YouTube video player"

            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="relative w-full flex justify-center items-center overflow-hidden py-1 ">
            
            <div
              className="absolute inset-0 bg-cover h-[600px] bg-center blur-md brightness-50 scale-100"
              style={{
                backgroundImage: `url(${IMG_URL + details.poster_path})`,
              }}
            />
            <img
              alt="Movie card"
              className="relative  w-1/4 h-auto mx-auto aspect-auto object-cover rounded-md shadow-xl"
              src={IMG_URL + details.poster_path}
            />
          </div>

        )}
      </div>
     <div className='w-full'>
      <div className='text-5xl  bg-gradient-to-t from-black font-bold text-white mb-0 py-5  px-5 z-20 relative'>
        {details.original_title}
      </div>
      <div className="flex text-2xl px-5 mb-2 text-green-400 mt-0">
            {details?.vote_average ? `${Math.floor(details.vote_average * 10)}% Match` : ""}
            <span className="ml-2 text-gray-400">{details?.release_date}</span>
          </div>
      <button className=' text-5xl ml-5 mb-5 text-white bg-slate-500'>＋</button>
      {!showTrailer && trailerKey1 && (
        <button
          onClick={handleWatchTrailer}
          className='bg-orange-400 relative text-black  font-bold text-2xl py-4 w-full rounded-full hover:bg-orange-300 transition-all duration-300'
        >
          ▶️ Watch Trailer
        </button>
      )}
      {/* <h1 className='text-black font-bold text-4xl mt-10 py-4 bg-slate-300 text-center'>
        Overview
      </h1> */}
      <div className='flex  mx-0 mt-6 space-x-10'>
        <div className='text-slate-300 text-2xl w-1/2 '>
          {details.overview}
        </div>
        <div className='text-red-500'>
          {cast?.join(',')}
        </div>
      </div>
    </div>
    </div>
  )
}

export default MovieDetails
