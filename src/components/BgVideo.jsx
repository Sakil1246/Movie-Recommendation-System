import React, { useEffect } from 'react';
import useTrailerNowPlaying from '../hooks/useTrailerNowPlaying';
import { useSelector } from 'react-redux';

const BgVideo = ({ id }) => {
  //console.log(id);
  useTrailerNowPlaying({ id });

  const video = useSelector((store) => store.movies?.trailer?.[id]);
  const video_key = video?.[0]?.key;


  if (!video_key) return null;
  return (
    <div className='w-screen'>
      <iframe
        className='w-screen aspect-video '
        src={`https://www.youtube.com/embed/${video_key}?autoplay=1&mute=1`}
        title="YouTube video player"
        frameBorder='0'
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default BgVideo;
