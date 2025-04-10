import { collection, query, where, getDocs } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { addWatchlist, setWatchlistId } from "../utils/moviesSlice";
import { db } from "../utils/firebase";
import { useEffect } from "react";

const useGetWatchlist = ({ userId }) => {
  const dispatch = useDispatch();

  const getWatchlist = async () => {
    try {
      const q = query(collection(db, "watchlists"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0];
        const data = docSnap.data();
        const watchlistId = docSnap.id;

        // Push to Redux
        dispatch(addWatchlist(data.movies));
        dispatch(setWatchlistId(watchlistId)); // 🔥 Set ID in Redux

        return {
          success: true,
          watchlistId,
          movies: data.movies || [],
        };
      } else {
        // dispatch(setWatchlistId(null));
        // dispatch(addWatchlist([]));
        return {
          success: true,
          watchlistId: null,
          movies: [],
        };
      }
    } catch (err) {
      return {
        success: false,
        message: `Error retrieving watchlist: ${err.message}`,
      };
    }
  };

  useEffect(() => {
    getWatchlist();
  }, []);
};

export default useGetWatchlist;
