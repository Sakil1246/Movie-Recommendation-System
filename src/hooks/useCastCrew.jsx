import { useEffect, useState } from "react";
import { options } from "../utils/constants";

const useCastCrew = ({ movieId }) => {
    const [cast,setCast]=useState([]);
    const [crew,setCrew]=useState([]);
    const getCastCrew = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits`, options);
        const json = await data.json();
        const cast = json.cast.sort((a, b) => a.order - b.order)
            .slice(0, 5)
            .map(actor => actor.original_name
            );
        //console.log(cast);
        setCast(cast);
        const crew = json.crew.sort((a, b) => a.order - b.order)
            .slice(0, 5)
            .map(crew => crew.original_name
            );
        setCrew(crew);
       
        
        
    }

    useEffect(() => {
        getCastCrew();
    }, [movieId]);
    return { cast, crew };
}
export default useCastCrew;