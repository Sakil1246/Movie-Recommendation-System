import React, { useRef } from 'react'
import useSearchByTittle from '../hooks/useSearchByTittle'

const SearchMovie = ({ movie }) => {
    useSearchByTittle({ movie: movie });
    const searchhere = useRef();
    return (
        <div className='flex justify-center'>
            <div className='flex items-center mt-20'>
                <input
                    type='text'
                    placeholder='What do you want to watch today?'
                    ref={searchhere}
                    className=' py-2 pl-3 w-[260px] rounded-md placeholder:text-black text-black text-start'
                />
                <button className='text-white bg-red-600 ml-2 px-4 py-2 hover:bg-red-400 rounded-md'>
                    Search
                </button>
            </div>
        </div>

    )
}

export default SearchMovie
