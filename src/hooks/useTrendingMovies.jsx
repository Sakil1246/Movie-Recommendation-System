import { useDispatch } from "react-redux";
import { options } from "../utils/constants";
import { addTrending } from "../utils/moviesSlice";
import { useEffect } from "react";

const useTrendingMovies=()=>{
    const dispatch=useDispatch();

    const getTrending=async()=>{
        const res=await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options);
        const json=await res.json();
        dispatch(addTrending(json.results));
}
    useEffect(()=>{
        getTrending();
    },[]);
}

export default useTrendingMovies;