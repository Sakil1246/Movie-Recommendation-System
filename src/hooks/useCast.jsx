import { useEffect, useState } from "react";
import { options } from "../utils/constants";

const useCast = ({ movieId }) => {
    const [cast,setCast]=useState([]);
    const getCast = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits`, options);
        const json = await data.json();
        //console.log(json);
        const cast = json.cast.sort((a, b) => a.order - b.order)
            .slice(0, 5)
            .map(actor => actor.original_name
            );
        //console.log(cast);
        setCast(cast);
        
        
    }

    useEffect(() => {
        getCast();
    }, []);
    return cast; 
}
export default useCast;