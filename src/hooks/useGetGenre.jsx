import { useEffect, useState } from "react";
import { options } from "../utils/constants";

const useGetGenre = () => {
  const [genres, setGenres] = useState([]);

  const getGenre = async () => {
    try {
      const data = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options);
      const json = await data.json();
      setGenres(json.genres); // ✅ Save to state
    } catch (error) {
      console.error("Failed to fetch genres:", error);
    }
  };

  useEffect(() => {
    getGenre();
  }, []);

  return genres; // ✅ Return genres
};

export default useGetGenre;
