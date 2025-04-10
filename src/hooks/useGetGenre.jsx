import { useEffect, useState } from "react";
import { options } from "../utils/constants";

const useGetGenre = () => {
  const [genres, setGenres] = useState([]);

  const getGenre = async () => {
    try {
      const data = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options);
      const json = await data.json();
      setGenres(json.genres); 
    } catch (error) {
      console.error("Failed to fetch genres:", error);
    }
  };

  useEffect(() => {
    getGenre();
  }, []);

  return genres; 
};

export default useGetGenre;
