import React from 'react';
import WatchListMovie from './WatchListMovie';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const WatchList = () => {
  const getWatchlist = useSelector((store) => store.movies?.watchlist);
 const navigate=useNavigate();

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

      <div className='flex items-center justify-center'>
      <button className='bg-blue-600  px-6 py-2 rounded-md hover:bg-blue-400 hover:rounded-xl' onClick={()=>{navigate("/body")}}>{!(getWatchlist.length===0)?"Add More":"Add to my watchlist"}</button>
    </div>
    </div>
  );


};

export default WatchList;
