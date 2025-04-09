import React from 'react';
import WatchListMovie from './WatchListMovie';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';

const WatchList = () => {
  const getWatchlist = useSelector((store) => store.movies?.watchlist);

  return (
    <div className="bg-black min-h-screen w-full text-white">
      <Navbar />
      
      {getWatchlist && (
        <div className="px-4 mt-16 ">
          <h1 className="text-3xl ml-3 py-4 font-bold text-orange-400">Watch List</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 ">
            {getWatchlist.map((movie) => (
              <div key={movie.id} className="w-full">
                <WatchListMovie path={movie.poster_path} details={movie} />
              </div>
            ))}
          </div>
        </div>
      )}
  
      {!getWatchlist && (
        <div className="px-4">
          <h1 className="text-3xl ml-3 py-4 font-bold text-orange-400">
            Ooops 🧐!! Looks like your Watchlist is empty
          </h1>
        </div>
      )}
    </div>
  );
  
  
};

export default WatchList;
