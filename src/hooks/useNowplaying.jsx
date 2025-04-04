import { useEffect } from "react";
import { options } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addNowPlaying } from "../utils/moviesSlice";

const useNowplaying=()=>{
    const dispatch=useDispatch();
const nowPlaying=async ()=>{
    const data=await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
    const json=await data.json();
    console.log(json);
    dispatch(addNowPlaying(json?.results));

  }
  useEffect(()=>{
    nowPlaying();
  },[]);



}
export default useNowplaying;