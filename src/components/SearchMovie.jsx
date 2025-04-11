import React from 'react'
import useSearchByTittle from '../hooks/useSearchByTittle'

const SearchMovie = ({movie}) => {
    useSearchByTittle({movie:movie});
  return (
    <div>
      
    </div>
  )
}

export default SearchMovie
