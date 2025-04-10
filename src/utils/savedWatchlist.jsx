import { doc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export const saveWatchlist = async (userId, movie) => {
  const userRef = doc(db, "watchlists", userId);

  try {
    // Use updateDoc and arrayUnion to append movie
    await updateDoc(userRef, {
      movies: arrayUnion(movie),
    });

    return { success: true, message: "Movie added to watchlist!" };
  } catch (err) {
    // If the doc doesn't exist yet, create it with setDoc
    if (err.code === "not-found") {
      try {
        await setDoc(userRef, { movies: [movie] });
        return { success: true, message: "Movie added to new watchlist!" };
      } catch (setErr) {
        return { success: false, message: `Error creating watchlist: ${setErr.message}` };
      }
    }
    return { success: false, message: `Error saving movie: ${err.message}` };
  }
};
