import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { W_LOGO } from '../utils/constants';
import SearchMovie from './SearchMovie';
import useGetFavourite from '../hooks/useGetFavourite';
import RecomMovieCard from './RecomMovieCard';

const FavouriteMovies = () => {
  const user = useSelector((store) => store.user);
  const uid = user?.uid;
  useGetFavourite({ userId: uid });

  const getFavourite = useSelector((store) => store.movies?.favourite);
  const fid = useSelector((store) => store.movies.favouriteId);
  const navigate = useNavigate();
  const isSearch = useSelector((store) => store.isSearch);

  const sharetoWhatsapp = () => {
    const text = `Check out my favourite movies on Cinemo! https://cinemo-3bf9d.web.app/favourite/${fid}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="bg-black min-h-screen w-full relative text-white">
      <Navbar />

      {!isSearch && (
        <>
          {(getFavourite?.length === 0 || getFavourite === null) && (
            <div className="flex items-center justify-center min-h-[70vh] mt-16 px-4 text-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Oooh!! Don't you have any favourite movie??
              </h1>
            </div>
          )}

          {(getFavourite?.length !== 0 && getFavourite !== null) && (
            <div className="px-4 mt-16">
              <h1 className="text-2xl sm:text-3xl text-center font-bold text-white mb-6">
                My Favourite
              </h1>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                {getFavourite.map((movie) => (
                  <div key={movie.id} className="w-full h-full">
                    <RecomMovieCard path={movie.poster_path} details={movie} />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-14 px-4">
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-400 hover:rounded-xl transition-all"
              onClick={() => navigate("/body")}
            >
              {getFavourite?.length !== 0 && getFavourite !== null
                ? "Add More"
                : "Add to my favourite"}
            </button>

            {getFavourite?.length !== 0 && getFavourite !== null && (
              <button
                className="bg-black px-4 py-2 flex items-center justify-center"
                onClick={sharetoWhatsapp}
              >
                <img src={W_LOGO} alt="share" className="w-10 h-10" />
              </button>
            )}
          </div>
        </>
      )}

      {isSearch && <SearchMovie />}
    </div>
  );
};

export default FavouriteMovies;
