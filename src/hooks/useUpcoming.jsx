import { useDispatch } from "react-redux";
import { options } from "../utils/constants";
import { addUpcoming } from "../utils/moviesSlice";
import { useEffect } from "react";

const useUpcoming=()=>{
const dispatch=useDispatch();

const getUpcoming=async ()=>{
    const data=await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options);
    const json=await data.json();
    dispatch(addUpcoming(json.results));
}
useEffect(()=>{
    getUpcoming();
},[])
}
export default useUpcoming;