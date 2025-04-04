import React from 'react'

const TitleNowPlaying = ({title,overview}) => {
  return (
    <div className='w-screen aspect-video pt-[20%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black'>
      <h1 className='text-5xl mt-40 font-bold w-20 pb-3 ml-10'>{title}</h1>
      <p className='text-2xl w-1/4 ml-10 line-clamp-3' >{overview}</p>
    </div>
  )
}

export default TitleNowPlaying
