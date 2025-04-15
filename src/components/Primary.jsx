import React from 'react';
import useNowplaying from '../hooks/useNowplaying';
import { useSelector } from 'react-redux';
import TitleNowPlaying from './TitleNowPlaying';
import BgVideo from './BgVideo';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

const Primary = () => {
  const data = useSelector((store) => store.movies?.nowPlaying);

  return (
    <div className="w-full h-full overflow-hidden">
      <Swiper
        spcaebetween={50}
        slidesPerView={1}
        autoplay={{ delay: 20000 }}
        modules={[Autoplay]}
        className="w-full"
        loop={true}
      >
        {data?.map((movie, index) => {
          if (index === 5 || index === 14) return null;
          return (
            <SwiperSlide key={movie.id}>
              <div className="w-full h-screen bg-black relative md:h-screen sm:h-auto sm:pt-[56.25%]">
                <div className="absolute top-0 left-0 w-full h-full">
                  <TitleNowPlaying title={movie.original_title} overview={movie.overview} details={movie} />
                  <BgVideo id={movie.id} detail={movie} />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Primary;
