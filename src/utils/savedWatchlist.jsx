import { doc, setDoc } from "firebase/firestore";
import db from "./firebase";

export const saveWatchlist = async (userId, watchlist) => {
  try {
    await setDoc(doc(db, "watchlists", userId), {
      movies: watchlist
    });
    console.log("Watchlist saved!");
  } catch (err) {
    console.error("Error saving watchlist:", err);
  }
};
