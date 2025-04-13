import { collection, query, where, getDocs } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { addFavourite, setFavouriteId } from "../utils/moviesSlice";
import { db } from "../utils/firebase";
import { useEffect } from "react";

const useGetFavourite = ({ userId }) => {
  const dispatch = useDispatch();

  const getFavourite = async () => {
    try {
      const q = query(collection(db, "favourite"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0];
        const data = docSnap.data();
        const favouriteId = docSnap.id;

        
        dispatch(addFavourite(data.movies));
        dispatch(setFavouriteId(favouriteId)); 

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
        message: `Error retrieving Favourite list: ${err.message}`,
      };
    }
  };

  useEffect(() => {
    getFavourite();
  }, []);
};

export default useGetFavourite;
