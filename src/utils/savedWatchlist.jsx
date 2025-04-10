import { collection, addDoc, query, where, getDocs, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "./firebase";

export const saveWatchlist = async (userId, movie) => {
  try {
    // Check if this user already has a watchlist
    const q = query(collection(db, "watchlists"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Update the first watchlist found
      const docRef = querySnapshot.docs[0].ref;
      await updateDoc(docRef, {
        movies: arrayUnion(movie)
      });
      return { success: true, message: "Movie added to existing watchlist!" };
    } else {
      // Create a new watchlist doc with random ID
      await addDoc(collection(db, "watchlists"), {
        userId: userId,
        movies: [movie]
      });
      return { success: true, message: "New watchlist created and movie added!" };
    }
  } catch (error) {
    return { success: false, message: `Error: ${error.message}` };
  }
};
