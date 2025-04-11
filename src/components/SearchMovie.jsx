import React, { useRef } from 'react'
import useSearchByTittle from '../hooks/useSearchByTittle'

const SearchMovie = ({ movie }) => {
    useSearchByTittle({ movie: movie });
    const searchhere = useRef();
    return (
        <div className='flex justify-center'>
            <div>
                <input
                    type='text'
                    placeholder='What do you want to watch today?'
                    ref={searchhere}
                    className='px-14 py-2 rounded-md border-spacing-4 placeholder:text-black mt-20'
                />
                <button className='text-white bg-red-600 ml-1 px-2 py-2 rounded-md'>Search</button>
            </div>
        </div>
    )
}

export default SearchMovie
