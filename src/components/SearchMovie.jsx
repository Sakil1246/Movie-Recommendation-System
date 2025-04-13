import React, { useRef, useState } from 'react'
import { useSearchByTittle } from '../hooks/useSearchByTittle'
import MovieCard from './MovieCard'
import ShimmerCard from './Shimmer'

const SearchMovie = () => {
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)
    const searchhere = useRef(null)

    const handleSearch = async () => {
        setLoading(true)
        const res = await useSearchByTittle({ movie: searchhere.current.value })
        setResult(res)
        setLoading(false)
    }
    console.log(result);
    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='flex items-center mt-20'>
                <input
                    type='text'
                    placeholder='What do you want to watch today?'
                    ref={searchhere}
                    className='py-2 pl-3 w-[260px] rounded-md placeholder:text-black text-black'
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch()
                        }
                    }}
                />
                <button
                    className='text-white bg-red-600 ml-2 px-4 py-2 hover:bg-red-400 rounded-md'
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>

            <div className='mt-7'>
                {(loading  || result===null)?  (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                        {Array(12).fill().map((_, index) => (
                            <ShimmerCard key={index} />
                        ))}
                    </div>
                ) : (result?.length !== 0) && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                        {result?.map((movie) => (
                            <div key={movie.id} className="flex-shrink-0 w-48">
                                <MovieCard path={movie.poster_path} details={movie} />
                            </div>
                        ))}
                    </div>
                )
                }
                {result?.length==0 &&(
                    <div className='mt-24  '>
                    <h1 className='text-3xl text-white mt-15'>No result found</h1>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchMovie
