import { collection, addDoc, query, where, getDocs, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "./firebase";

export const toggleWatchlist = async (userId, movie, isInList) => {
  try {
    const q = query(collection(db, "watchlists"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      await updateDoc(docRef, {
        movies: isInList ? arrayRemove(movie) : arrayUnion(movie),
      });
      return {
        success: true,
        message: isInList ? "Movie removed from watchlist!" : "Movie added to watchlist!",
      };
    } else if (!isInList) {
      await addDoc(collection(db, "watchlists"), {
        userId: userId,
        movies: [movie],
      });
      return { success: true, message: "Watchlist created and movie added!" };
    }
  } catch (error) {
    return { success: false, message: `Error: ${error.message}` };
  }
};

export const isMovieInWatchlist = async (userId, movieId) => {
  try {
    // Fetch the user's watchlist
    const q = query(collection(db, "watchlists"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // No watchlist found for this user
      return false;
    }

    // Get the movies array from the first found watchlist
    const watchlistData = querySnapshot.docs[0].data();
    const movies = watchlistData.movies || [];

    // Check if the movie is present by matching movie id
    const movieExists = movies.some((movie) => movie.id === movieId);

    return movieExists;
  } catch (error) {
    console.error("Error checking watchlist: ", error);
    return false;
  }
};