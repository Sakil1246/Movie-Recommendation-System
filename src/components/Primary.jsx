import React from 'react'
import useNowplaying from '../hooks/useNowplaying'
import {  useSelector } from 'react-redux';
import TitleNowPlaying from './TitleNowPlaying';
import BgVideo from './BgVideo';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';


const Primary = () => {
    useNowplaying();
  const data=useSelector((store)=>store.movies?.nowPlaying);
  console.log(data)

  return (
    <div>
      <Swiper 
      spcaebetween={50}
      slidesPerview={1}
      autoplay={{delay: 4000}}
      modules={[Autoplay]}
      loop={true}>
        {data.map((movie)=>(
          <SwiperSlide key={movie.id}>
              <TitleNowPlaying title={movie.original_title} overview={movie.overview}/>
              <BgVideo id={movie.id}/>

          </SwiperSlide>
        )

        )}
      
      </Swiper>
    </div>
  )
}

export default Primary
