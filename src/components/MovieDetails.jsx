import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import useTrailerNowPlaying from '../hooks/useTrailerNowPlaying'
import { useDispatch, useSelector } from 'react-redux'
import { IMG_URL } from '../utils/constants'
import { genreMap } from '../utils/mockData'
import useCastCrew from '../hooks/useCastCrew'
import { motion } from 'framer-motion'
import { saveWatchlist } from '../utils/savedWatchlist'
import { FaSave } from 'react-icons/fa';


const MovieDetails = ({ details }) => {
  const [showTrailer, setShowTrailer] = useState(false)

  const { cast, crew } = useCastCrew({ movieId: details.id });
  const [isRate, setIsRate] = useState(false);
  const [list, setList] = useState(false);
 
  const { uid } = useSelector((store) => store.user);
  useTrailerNowPlaying({ id: details.id })

  const trailer = useSelector((store) => store.movies?.trailer?.[details.id])
  const trailerKey1 = trailer?.[0]?.key

  const handleWatchTrailer = () => {
    setShowTrailer(true)
  }

  const genres = details?.genre_ids?.map((id) => genreMap[id]);
  const details2 = details;

  const savedList = async () => {
    const result = await saveWatchlist(uid, details2);
    if (result.success) {
      setList(true);
      alert(result.message);
    }
    else {
      alert(result.message);
    }
  }
  const sharetoWhatsapp = () => {
    const text = `🎬 Check out "${details2.title}" on Cinemo! 🔗 https://yourwebsite.com/movie/${details2.id}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank");
  }
  const [isFavourited, setIsFavourited] = useState(false);

  const handleFavourite = () => {
    setIsFavourited(!isFavourited);
  };
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
        <div className='flex text-2xl px-5 mb-2 text-slate-300 mt-0'>
          <h2> • {genres.join(" •  ")}</h2>
        </div>

        <div className='flex gap-10 ml-3 items-center'>

          <div className='flex flex-col items-center'>
            <motion.button
              whileTap={{ scale: 1.3 }}
              transition={{ type: "spring", stiffness: 300 }}
              className='text-5xl text-white mb-1'
              onClick={savedList}
            >
              {!list ? "＋" : "✔"}
            </motion.button>
            <span className='text-white text-xl'>{!list ? "List" : "Added to List"}</span>
          </div>


          <div className='flex flex-col items-center'>
            <motion.div
              whileTap={{ scale: 1.3 }}
              animate={{ scale: 1.0 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="text-4xl text-white cursor-pointer select-none"
              onClick={() => setIsRate(!isRate)}
            >
              {isRate ? "★" : "☆"}
            </motion.div>
            <span className='text-white text-xl mt-1'>Rate</span>
          </div>


          <div className='flex flex-col items-center'>
            <motion.button
              whileTap={{ scale: 1.3 }}
              transition={{ type: "spring", stiffness: 300 }}
              className='text-4xl text-white'
              onClick={sharetoWhatsapp}
            >
              ➤
            </motion.button>
            <span className='text-white text-xl mt-1' >Share</span>
          </div>
          <div className='flex flex-col items-center'>
            <motion.button
              whileTap={{ scale: 1.3 }}
              transition={{ type: "spring", stiffness: 300 }}
              className='text-4xl text-white'
              onClick={handleFavourite}
            >
             {isFavourited ? '♥' : '❤️'}

            </motion.button>
            <span className='text-white text-xl mt-1'>Save</span>
          </div>
        </div>

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
        <div className='flex  mx-0  mt-6 space-x-10'>
          <div className=' text-slate-300 text-lg w-1/2 break-words hyphens-auto break-keep '>
            {details.overview}
          </div>
          <div className='flex flex-col'>
            <div className='text-slate-500 pl-0 '>
              Cast:
              <span className='text-slate-300 hover:underline hover:cursor-pointer'>{cast?.join(',')}</span>
            </div>
            <div className='text-slate-500 mt-2 pl-0 '>
              Crew:
              <span className='text-slate-300  hover:underline hover:cursor-pointer'>{crew?.join(',')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails
