import React from 'react'
import { useSelector } from 'react-redux';
import MovieList from './MovieList';
import ShimmerCard from './Shimmer';

const Secondary = () => {

  const nowPlaying = useSelector((store) => store.movies?.nowPlaying);
  const popular = useSelector((store) => store.movies?.popular);
  const topRated = useSelector((store) => store.movies?.topRated);
  const upcoming = useSelector((store) => store.movies?.upComing);

  return (
    <div className='bg-black'>
    {(nowPlaying || popular || topRated || upcoming)&&(  <div className=' mt-0 md:-mt-52 pl-4 md:pl-12 relative z-20'>
        <div className=' relative z-0'>
        <MovieList list={nowPlaying} tittle={"Now Playing"} />
        <MovieList list={popular} tittle={"Popular"} />
        <MovieList list={topRated} tittle={"Top Rated"} />
        <MovieList list={upcoming} tittle={"Upcoming"} />
        </div>

      </div>)}

      {(!nowPlaying || !popular || !topRated || !upcoming)&&(
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {Array(12).fill().map((_, index) => (
          <ShimmerCard key={index} />
        ))}
      </div>
      )}
    </div>
  )
}

export default Secondary
