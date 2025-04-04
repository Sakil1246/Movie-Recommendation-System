import React, { useEffect } from 'react'
import { options } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addTrailer } from '../utils/moviesSlice';

const BgVideo = ({id}) => {
    const dispatch=useDispatch();
    const videoUrl=async ()=>{
        const res=await fetch("https://api.themoviedb.org/3/movie/" +id+"/videos?language=en-US", options);
        const json=await res.json();
        //console.log(json);
        const trailer=json.results.filter((items)=>items.type=="Trailer");
        //console.log(trailer);
        dispatch(addTrailer(trailer[0]));

    }
    useEffect(()=>{
        videoUrl();
    },[]);
  return (
    <div>
      
    </div>
  )
}

export default BgVideo
