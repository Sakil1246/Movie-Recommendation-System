import { useEffect, useState } from "react";
import { options } from "../utils/constants";

const useRecommendation = ({ id }) => {
  const [recommendation, setRecommendation] = useState(null);

  const getRecommendation = async () => {
    try {
      const [
        baseRecomRes,
        creditsRes,
        movieDetailsRes
      ] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`, options),
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, options),
        fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options),
      ]);

      const baseRecom = await baseRecomRes.json();
      const credits = await creditsRes.json();
      const movieDetails = await movieDetailsRes.json();

      // Top 2 billed actors
      const topActors = credits.cast.slice(0, 2);

      const actorMoviePromises = topActors.map(actor =>
        fetch(`https://api.themoviedb.org/3/person/${actor.id}/movie_credits?language=en-US`, options)
          .then(res => res.json())
          .then(data => data.cast || [])
      );

      const actorMoviesList = await Promise.all(actorMoviePromises);
      const actorMovies = actorMoviesList.flat();

      // Filter actor movies to be similar in genre or above a rating threshold
      const similarByActorAndRating = actorMovies.filter(movie =>
        movie.vote_average >= 6.5 && movie.id !== id // avoid current movie
      );

      // Combine all results and deduplicate
      const allResults = [
        ...(baseRecom.results || []),
        ...similarByActorAndRating
      ];

      const uniqueMovies = Array.from(
        new Map(allResults.map(movie => [movie.id, movie])).values()
      );

      // Sort by rating descending
      const sorted = uniqueMovies.sort((a, b) => b.vote_average - a.vote_average);

      setRecommendation(sorted.slice(0, 36));
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setRecommendation([]);
    }
  };

  useEffect(() => {
    getRecommendation();
  }, [id]);
  console.log(recommendation);
  return recommendation;
};

export default useRecommendation;
