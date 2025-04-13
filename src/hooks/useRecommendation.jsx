import { useEffect, useState } from "react";
import { options } from "../utils/constants";

const useRecommendation=({id})=>{
    const [recommendation,setRecommendation]=useState(null);
const getRecommendation=async()=>{
    const recom=await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`, options);
    const json=await recom.json();
    //console.log(json.results);
    setRecommendation(json.results.slice(0,18));
}
useEffect(()=>{
    getRecommendation();
},[id]);
return recommendation;
}

export default useRecommendation;