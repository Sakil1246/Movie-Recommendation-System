
import { options } from "../utils/constants";

export const useSearchByTittle = async ({ movie }) => {
   const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`, options);
   const json = await res.json();
   //console.log(json.results);
   return json.results;
}

