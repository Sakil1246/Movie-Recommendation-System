import React, { useRef, useState } from 'react'
import MovieCard from './RecomMovieCard'
import ShimmerCard from './Shimmer'
import { useMultiSearch } from '../hooks/useMultiSearch '
import { genreMap } from '../utils/mockData'

const SearchMovie = () => {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const titleRef = useRef(null)
  const actorRef = useRef(null)
  const [genreId, setGenreId] = useState('')

  const handleSearch = async () => {
    setLoading(true)
    const res = await useMultiSearch({
      title: titleRef.current.value,
      genreId,
      actorName: actorRef.current.value
    })
    setResult(res)
    setLoading(false)
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex flex-wrap justify-center gap-3 mt-20'>
        <input
          ref={titleRef}
          type='text'
          placeholder='Search by title'
          className='py-2 px-3 w-[220px] rounded-md placeholder:text-black text-black'
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <input
          ref={actorRef}
          type='text'
          placeholder='Search by actor'
          className='py-2 px-3 w-[220px] rounded-md placeholder:text-black text-black'
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <select
          onChange={(e) => setGenreId(e.target.value)}
          className='py-2 px-3 w-[180px] rounded-md text-black'
        >
          <option value=''>Select genre</option>
          {Object.entries(genreMap).map(([id, name]) => (
            <option key={id} value={id}>{name}</option>
          ))}
        </select>
        <button
          className='text-white bg-red-600 px-4 py-2 hover:bg-red-400 rounded-md'
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className='mt-7'>
        {(loading || result === null) ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {Array(12).fill().map((_, index) => (
              <ShimmerCard key={index} />
            ))}
          </div>
        ) : result?.length !== 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {result.map((movie) => (
              <div key={movie.id} className="flex-shrink-0 w-48">
                <MovieCard path={movie.poster_path} details={movie} />
              </div>
            ))}
          </div>
        ) : (
          <div className='mt-24'>
            <h1 className='text-3xl text-white'>No result found</h1>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchMovie
