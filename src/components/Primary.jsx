import React, { useEffect } from 'react'
import useNowplaying from '../hooks/useNowplaying'
import {  useDispatch, useSelector } from 'react-redux';
import TitleNowPlaying from './TitleNowPlaying';
import BgVideo from './BgVideo';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';



const Primary = () => {
  
    
  
  
    const data=useSelector((store)=>store.movies?.nowPlaying);
    
  return (
    <div>
      <Swiper 
      spcaebetween={50}
      slidesPerView={1}
      autoplay={{delay: 20000}}
      modules={[Autoplay]}
      className='max-w-full'
      loop={true}>
        {data?.map((movie)=>(
          <SwiperSlide key={movie.id}>
            <div className="max-w-full overflow-hidden pt-[30%] bg-black h-30 md:pt-0">
              <TitleNowPlaying title={movie.original_title} overview={movie.overview}/>
              <BgVideo id={movie.id}/>
            </div>

          </SwiperSlide>
        )

        )}
      
      </Swiper>
    </div>
  )
}

export default Primary
