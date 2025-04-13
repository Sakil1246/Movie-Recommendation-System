import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name: "movie",
    initialState: {
        nowPlaying: [],
        popular: [],
        topRated: [],
        upComing: [],
        trailer: {},
        watchlist: [],
        favourite:[],
        watchlistId: null,
        favouriteId:null
    },
    reducers: {
        addNowPlaying: (state, action) => {
            state.nowPlaying = action.payload;
        },
        removeNowPlaying: (state, action) => {
            state.nowPlaying = null;
        },
        addPopular: (state, action) => {
            state.popular = action.payload;
        },
        removePopular: (state, action) => {
            state.popular = null;
        },
        addTopRated: (state, action) => {
            state.topRated = action.payload;
        },
        removeTopRated: (state, action) => {
            state.topRated = null;
        },
        addUpcoming: (state, action) => {
            state.upComing = action.payload;
        },
        removeUpcoming: (state, action) => {
            state.upComing = null;
        },
        addTrailer: (state, action) => {
            const { movieId, trailers } = action.payload;
            if (!state.trailer) {
                state.trailer = {};
            }
            state.trailer[movieId] = trailers;
        },
        removeTrailer: (state, action) => {
            state.trailer = null;
        },
        addWatchlist: (state, action) => {
            state.watchlist = action.payload;
        },
        setWatchlistId: (state, action) => {
            state.watchlistId = action.payload;
        },
        removeWatchlist: (state, action) => {
            state.watchlist = null;
        },
        removeWatchlistId: (state, action) => {
            state.watchlistId = null;
        },
        addFavourite: (state, action) => {
            state.favourite = action.payload;
        },
        setFavouriteId: (state, action) => {
            state.favouriteId = action.payload;
        },
        removeFavourite: (state, action) => {
            state.favourite = null;
        },
        removeFavouriteId: (state, action) => {
            state.favouriteId = null;
        }


    }
})
export const { addNowPlaying, addTrailer, removeNowPlaying, removeTrailer, addPopular, removePopular, addTopRated, removeTopRated, addUpcoming, removeUpcoming, addWatchlist, removeWatchlist, setWatchlistId, removeWatchlistId,addFavourite,removeFavourite,setFavouriteId,removeFavouriteId } = moviesSlice.actions;

export default moviesSlice.reducer