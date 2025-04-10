import React from 'react'
import useRecommendation from '../hooks/useRecommendation'
import MovieCard from './MovieCard';

const Recommendation = ({id}) => {
    
    
   const recom= useRecommendation({id:id});
   console.log(recom);
   return (
    <div className="px-4 z-10 w-full relative overflow-visible">
      {/* <h1 className="text-3xl py-4 font-bold text-orange-400 ">{tittle}</h1> */}

      <div className="overflow-x-auto   scrollbar-hide relative z-10">
      <h1 className="text-3xl py-4 font-bold text-orange-400 ">You may also like</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 ">
          {recom?.map((movie) => (
            <div key={movie.id} className="flex-shrink-0 w-48">
              <MovieCard path={movie.poster_path} details={movie}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Recommendation
