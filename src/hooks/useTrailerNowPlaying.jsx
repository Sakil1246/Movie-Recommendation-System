import { useEffect } from "react";
import { options } from "../utils/constants";
import { addTrailer } from "../utils/moviesSlice";
import { useDispatch } from "react-redux";

const useTrailerNowPlaying = ({ id }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTrailer = async () => {
      if (!id) return;
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options);
        const json = await res.json();
        //console.log(json);

        const trailers = json.results?.filter(item => item.type === "Trailer");
        //console.log(trailers);
        dispatch(addTrailer({movieId: id, trailers})); 
      } catch (err) {
        console.error("Failed to fetch trailer:", err);
      }
    };

    fetchTrailer();
  }, [id]);
};

export default useTrailerNowPlaying;
