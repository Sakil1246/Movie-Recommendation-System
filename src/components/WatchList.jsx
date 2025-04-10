import React from 'react';
import WatchListMovie from './WatchListMovie';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { W_LOGO } from '../utils/constants';

const WatchList = () => {
  const getWatchlist = useSelector((store) => store.movies?.watchlist);
 // console.log(getWatchlist);
   const user = useSelector((store) => store.user);
   const uid=user?.uid;
 const navigate=useNavigate();
 const sharetoWhatsapp=()=>{
  const text = `🎬 Check out my watchlist on Cinemo! 🔗 https://cinemo.com/movie/watchlist/${uid}`;
  const url = `https://wa.me/?text=${encodeURIComponent(text)}`;

  window.open(url, "_blank");
}
  return (
    <div className="bg-black min-h-screen w-full relative text-white">
      <Navbar />
      {(getWatchlist.length ===0)  && (
        <div className="flex  items-center justify-center min-h-[80vh] mt-16">
          <h1 className="text-3xl text-center font-bold  text-orange-400">
            Ooops 🧐!! Looks like your Watchlist is empty
          </h1>
        </div>
      )}

      {(getWatchlist.length !==0) && (
        <div className="px-4 mt-16 ">
          <h1 className="text-3xl ml-3 py-4  text-center font-bold text-orange-400">My Watch List</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 ">
            {getWatchlist.map((movie) => (
              <div key={movie.id} className="w-full">
                <WatchListMovie path={movie.poster_path} details={movie} />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className='flex items-center justify-center mt-14'>
      <button className='bg-blue-600  px-6 py-2 rounded-md hover:bg-blue-400 hover:rounded-xl' onClick={()=>{navigate("/body")}}>{!(getWatchlist.length===0)?"Add More":"Add to my watchlist"}</button>
      <button className='bg-black px-6 py-2' onClick={sharetoWhatsapp}>
        <img src={W_LOGO} alt='share' className='w-14 h-12'/>
      </button>
    </div>
    </div>
  );


};

export default WatchList;
