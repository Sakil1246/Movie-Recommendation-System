// hooks/useMultiSearch.js
import { options } from "../utils/constants";

export const useMultiSearch = async ({ title = '', genreId = '', actorName = '' }) => {
  let actorId = '';

  // Get actor ID if actor name is provided
  if (actorName) {
    const actorRes = await fetch(`https://api.themoviedb.org/3/search/person?query=${actorName}`, options);
    const actorData = await actorRes.json();
    actorId = actorData?.results?.[0]?.id || '';
  }

  // Build the discover query with filters
  const discoverUrl = new URL('https://api.themoviedb.org/3/discover/movie');
  discoverUrl.searchParams.append('language', 'en-US');
  discoverUrl.searchParams.append('sort_by', 'popularity.desc');
  discoverUrl.searchParams.append('include_adult', 'false');
  discoverUrl.searchParams.append('include_video', 'false');
  discoverUrl.searchParams.append('page', '1');

  if (genreId) discoverUrl.searchParams.append('with_genres', genreId);
  if (actorId) discoverUrl.searchParams.append('with_cast', actorId);
  if (title) discoverUrl.searchParams.append('query', title); // NOTE: this only works with `/search/movie`, but we'll handle a hybrid below.

  // If only title is provided, use search endpoint instead
  if (title && !genreId && !actorId) {
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=1`, options);
    const json = await res.json();
    return json.results;
  }

  // Otherwise, use discover endpoint
  const discoverRes = await fetch(discoverUrl, options);
  const discoverData = await discoverRes.json();
  return discoverData.results;
};
