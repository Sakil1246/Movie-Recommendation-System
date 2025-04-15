import React from 'react';
import useRecommendation from '../hooks/useRecommendation';
import ShimmerCard from './Shimmer';
import RecomMovieCard from './RecomMovieCard';

const Recommendation = ({ id }) => {
  const recom = useRecommendation({ id });

  return (
    <div className="px-4 z-10 w-full relative overflow-visible">
      {recom?.length !== 0 && (
        <div className="overflow-x-auto scrollbar-hide relative z-10">
          <h1 className="text-3xl py-4 font-bold text-white">You may also like</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {recom?.map((movie) => (
              <div key={movie.id} className="flex-shrink-0 w-full sm:w-auto">
                <RecomMovieCard path={movie.poster_path} details={movie} />
              </div>
            ))}
          </div>
        </div>
      )}

      {recom?.length === 0 && (
        <div className="mt-4">
          <h1 className="text-white text-3xl font-semibold">No similar movies found</h1>
        </div>
      )}

      {recom === null && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {Array(12)
            .fill()
            .map((_, index) => (
              <ShimmerCard key={index} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Recommendation;
