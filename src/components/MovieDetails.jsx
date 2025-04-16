import React, { useEffect, useState } from 'react'
import useTrailerNowPlaying from '../hooks/useTrailerNowPlaying'
import { useSelector } from 'react-redux'
import { POSTER_URL } from '../utils/constants'
import { genreMap } from '../utils/mockData'
import useCastCrew from '../hooks/useCastCrew'
import { motion } from 'framer-motion'
import { isMovieInWatchlist, toggleWatchlist } from '../utils/savedWatchlist'
import { isMovieInFavourite, toggleFavourite } from '../utils/savedFavourite'
import ToastMessage from '../utils/Toast'


const MovieDetails = ({ details }) => {
  const [showTrailer, setShowTrailer] = useState(false)

  const { cast, crew } = useCastCrew({ movieId: details.id });
  const [isRate, setIsRate] = useState(false);
  const [list, setList] = useState(false);
  const [isFavourited, setIsFavourited] = useState(false);
  const { uid } = useSelector((store) => store.user);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3000);
  };


  useTrailerNowPlaying({ id: details.id })

  const trailer = useSelector((store) => store.movies?.trailer?.[details.id])
  const trailerKey1 = trailer?.[0]?.key

  const handleWatchTrailer = () => {
    setShowTrailer(true)
  }

  const genres = details?.genre_ids?.map((id) => genreMap[id]);
  const details2 = details;

  const savedList = async () => {
    const result = await toggleWatchlist(uid, details2, list);
    if (result.success) {
      setList((prev) => !prev);
      showToast(result.message, 'success');
    } else {
      showToast(result.message, 'error');
    }
  };

  const handleFavourite = async () => {
    const result = await toggleFavourite(uid, details2, isFavourited);
    if (result.success) {
      setIsFavourited((prev) => !prev);
      showToast(result.message, 'success');
    } else {
      showToast(result.message, 'error');
    }
  };

  const sharetoWhatsapp = () => {
    const text = `🎬 Check out "${details2.title}" on Cinemo! 🔗 https://cinemo-3bf9d.web.app/movie/${details2.id}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank");
  }




  const checkMovieInWatchlist = async () => {
    const result = await isMovieInWatchlist(uid, details2.id);
    result ? setList(true) : setList(false);

  }

  const checkMovieInFavourite = async () => {
    const result = await isMovieInFavourite(uid, details2.id);
    result ? setIsFavourited(true) : setIsFavourited(false);

  }

  useEffect(() => {
    checkMovieInWatchlist();
    checkMovieInFavourite();
  }, [details2.id])

  return (
    <div className='bg-black min-h-screen px-4 py-8'>
  <div className='w-full'>
    {showTrailer && trailerKey1 ? (
      <iframe
        className='w-full md:w-2/3 aspect-video mx-auto rounded-xl'
        src={`https://www.youtube.com/embed/${trailerKey1}?rel=0&modestbranding=1&autoplay=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    ) : (
      <div className="relative w-full flex justify-center items-center overflow-hidden py-1">
        <div
          className="absolute inset-0 bg-cover h-[400px] md:h-[600px] bg-center blur-md brightness-50 scale-100"
          style={{ backgroundImage: `url(${POSTER_URL + details.poster_path})` }}
        />
        <img
          alt="Movie card"
          className="relative w-2/3 sm:w-1/2 md:w-1/4 h-auto aspect-auto object-cover rounded-md shadow-xl"
          src={POSTER_URL + details.poster_path}
        />
      </div>
    )}
  </div>

  <div className='w-full'>
    <div className='text-3xl sm:text-4xl md:text-5xl bg-gradient-to-t from-black font-bold text-white mb-0 py-5 px-5 z-20 relative'>
      {details.original_title}
    </div>

    <div className="flex flex-wrap text-lg sm:text-2xl px-5 mb-2 text-green-400 mt-0 gap-2">
      {details?.vote_average ? `${Math.floor(details.vote_average * 10)}% Match` : ""}
      <span className="text-gray-400">{details?.release_date}</span>
    </div>

    <div className='text-lg sm:text-2xl px-5 mb-2 text-slate-300 mt-0'>
      <h2>• {genres.join(" • ")}</h2>
    </div>

    <div className='flex flex-wrap sm:flex-nowrap gap-6 sm:gap-10 justify-center sm:justify-start px-5 items-center'>
    
      <div className='flex flex-col items-center'>
        <motion.button
          whileTap={{ scale: 1.3 }}
          transition={{ type: "spring", stiffness: 300 }}
          className='text-5xl text-white mb-1'
          onClick={savedList}
        >
          {!list ? (
            "＋"
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#ffffff" viewBox="0 0 24 24">
              <path d="M20.285 6.709a1 1 0 0 0-1.414-1.418L9 15.162l-3.871-3.87a1 1 0 0 0-1.414 1.414l4.578 4.577a1 1 0 0 0 1.414 0l10.578-10.574z" />
            </svg>
          )}
        </motion.button>
        <span className='text-white text-xl'>{!list ? "List" : "Listed"}</span>
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
        <span className='text-white text-xl mt-1'>Share</span>
      </div>

      
      <div className='flex flex-col items-center'>
        <motion.button
          whileTap={{ scale: 1.3 }}
          transition={{ type: "spring", stiffness: 300 }}
          className='text-4xl text-white'
          onClick={handleFavourite}
        >
          {!isFavourited ? (
            "♥"
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#ffffff" viewBox="0 0 24 24">
              <path d="M20.285 6.709a1 1 0 0 0-1.414-1.418L9 15.162l-3.871-3.87a1 1 0 0 0-1.414 1.414l4.578 4.577a1 1 0 0 0 1.414 0l10.578-10.574z" />
            </svg>
          )}
        </motion.button>
        <span className='text-white text-xl mt-1'>{!isFavourited ? "Save" : "Saved"}</span>
      </div>
    </div>

    {!showTrailer && trailerKey1 && (
      <button
        onClick={handleWatchTrailer}
        className='bg-orange-400 relative text-black font-bold text-lg sm:text-2xl py-4 w-full rounded-full hover:bg-orange-300 transition-all duration-300 mt-6'
      >
        ▶️ Watch Trailer
      </button>
    )}

    <div className='flex flex-col md:flex-row mt-6 px-5 gap-6'>
      <div className='text-slate-300 text-lg md:w-1/2 break-words'>
        {details.overview}
      </div>
      <div className='flex flex-col text-sm md:text-base'>
        <div className='text-slate-500'>
          Cast:
          <span className='text-slate-300 hover:underline cursor-pointer'> {cast?.join(', ')}</span>
        </div>
        <div className='text-slate-500 mt-2'>
          Crew:
          <span className='text-slate-300 hover:underline cursor-pointer'> {crew?.join(', ')}</span>
        </div>
      </div>
    </div>
  </div>

  <div className='relative z-50'>
    <ToastMessage
      message={toast.message}
      type={toast.type}
      visible={toast.visible}
    />
  </div>
</div>

  )
}

export default MovieDetails
