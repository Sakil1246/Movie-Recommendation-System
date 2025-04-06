import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import useTrailerNowPlaying from '../hooks/useTrailerNowPlaying'
import { useSelector } from 'react-redux'
import { IMG_URL } from '../utils/constants'

const MovieDetails = () => {
  const [showTrailer, setShowTrailer] = useState(false)
  const location = useLocation()
  const { details } = location.state

  useTrailerNowPlaying({ id: details.id })

  const trailer = useSelector((store) => store.movies?.trailer?.[details.id])
  const trailerKey1 = trailer?.[0]?.key

  const handleWatchTrailer = () => {
    setShowTrailer(true)
  }

  return (
    <div className='bg-black min-h-screen px-4 py-8'>
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
        <img
          alt='Movie card'
          className='w-1/3 h-auto mx-auto aspect-auto object-cover rounded-md'
          src={IMG_URL + details.poster_path}
        />
      )}
      <h1 className='text-5xl font-bold text-white mb-5 py-5'>
        {details.original_title}
      </h1>
      {!showTrailer && trailerKey1 && (
        <button
          onClick={handleWatchTrailer}
          className='bg-white text-black font-bold text-2xl py-4 w-full rounded-3xl hover:bg-slate-200 transition-all duration-300'
        >
          ▶️ Watch Trailer
        </button>
      )}
      {/* <h1 className='text-black font-bold text-4xl mt-10 py-4 bg-slate-300 text-center'>
        Overview
      </h1> */}
      <div className='text-slate-300 text-2xl w-full mx-0 mt-6'>
        {details.overview}
      </div>
    </div>
  )
}

export default MovieDetails
