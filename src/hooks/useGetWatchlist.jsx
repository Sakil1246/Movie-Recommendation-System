import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { addWatchlist } from "../utils/moviesSlice";
import { db } from "../utils/firebase";
import { useEffect } from "react";

const useGetWatchlist=({userId})=>{
    const dispatch=useDispatch();
 const getWatchlist = async () => {
  try {
    const userRef = doc(db, "watchlists", userId);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
    dispatch(addWatchlist(data.movies));
      return { success: true, movies: data.movies || [] };
    } else {
      return { success: true, movies: [] }; 
    }
  } catch (err) {
    return { success: false, message: `Error retrieving watchlist: ${err.message}` };
  }
};


useEffect(()=>{
    getWatchlist();
})
}

export default useGetWatchlist;