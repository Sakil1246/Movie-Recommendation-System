import { useEffect } from "react";
import { options } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addPopular } from "../utils/moviesSlice";

const usePopular=()=>{
    const dispatch=useDispatch();
    const getPopular=async()=>{
        const data=await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options);
        const json=await data.json();
        //console.log(json.results);
        dispatch(addPopular(json.results));

    }
    useEffect(()=>{
        getPopular();
    },[]);

}

export default usePopular;