import { collection, addDoc, query, where, getDocs, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "./firebase";

export const saveFavourite = async (userId, movie) => {
  try {
    // Check if this user already has a watchlist
    const q = query(collection(db, "favourite"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Update the first watchlist found
      const docRef = querySnapshot.docs[0].ref;
      await updateDoc(docRef, {
        movies: arrayUnion(movie)
      });
      return { success: true, message: "Movie added to favourite!" };
    } else {
      // Create a new watchlist doc with random ID
      await addDoc(collection(db, "favourite"), {
        userId: userId,
        movies: [movie]
      });
      return { success: true, message: "New favourite list created and movie added!" };
    }
  } catch (error) {
    return { success: false, message: `Error: ${error.message}` };
  }
};

export const isMovieInFavourite = async (userId, movieId) => {
  try {
    // Fetch the user's watchlist
    const q = query(collection(db, "favourite"), where("userId", "==", userId));
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