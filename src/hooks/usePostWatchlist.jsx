import { optionsPost } from "../utils/constants"

const usePostWatchlist = () => {

const postWatchlist=async ()=>{
    const data=await fetch('https://api.themoviedb.org/3/account/21919974/watchlist', optionsPost)
}

}