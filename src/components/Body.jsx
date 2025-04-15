import React from 'react';
import Navbar from './Navbar';

import Primary from './Primary';
import Secondary from './Secondary';
import usePopular from '../hooks/usePopular';
import useNowplaying from '../hooks/useNowplaying';
import useTopRated from '../hooks/useTopRated';
import useUpcoming from '../hooks/useUpcoming';
import Footer from './Footer';
import useGetWatchlist from '../hooks/useGetWatchlist';
import { useSelector } from 'react-redux';
import SearchMovie from './SearchMovie';
import useTrendingMovies from '../hooks/useTrendingMovies';

const Body = () => {
  const uid = useSelector((store) => store.user?.uid);
  const isSearch = useSelector((store) => store.isSearch);

  useNowplaying();
  usePopular();
  useTopRated();
  useUpcoming();
  useTrendingMovies();

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar />

      <div className="flex-1 w-full">
        {!isSearch ? (
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
          <Primary />
          <Secondary />
          <Footer />
        </div>
        ) : (
          <SearchMovie />
        )}
      </div>
    </div>
  );
};

export default Body;
