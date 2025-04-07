import { useEffect, useState } from "react";
import { options } from "../utils/constants";

const useGetGenre = ({ genreId }) => {
  const [genreNames, setGenreNames] = useState([]);

  const getGenres = async () => {
    const data = await fetch(`https://api.themoviedb.org/3/genre/movie/list?language=en`, options);
    const json = await data.json();

    const allGenres = json.genres; // full list of {id, name}
    
    // map ids to names
    const matchedGenres = allGenres
      .filter((g) => genreId.includes(g.id))
      .map((g) => g.name);

    setGenreNames(matchedGenres);
  };

  useEffect(() => {
    if (genreId && genreId.length > 0) {
      getGenres();
    }
  }, [genreId]);

  return genreNames; // returns array of genre names like ["Action", "Drama"]
};

export default useGetGenre;
