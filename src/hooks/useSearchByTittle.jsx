import { useEffect } from "react";
import { options } from "../utils/constants";

const useSearchByTittle=({movie})=>{


     const getSearchByTittle=async()=>{
        const res=await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1` , options);
        const json=await res.json();
        console.log(json);

     }
     useEffect(()=>{
        getSearchByTittle();
     },[]);
}

export default useSearchByTittle;