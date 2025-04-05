import { createSlice } from "@reduxjs/toolkit";

const moviesSlice=createSlice({
    name:"movie",
    initialState:{
        nowPlaying:[],
        trailer:{},
    },
    reducers:{
        addNowPlaying:(state,action)=>{
            state.nowPlaying=action.payload;
        },
        removeNowPlaying:(state,action)=>{
            state.nowPlaying=null;
        },
        addTrailer:(state,action)=>{
            const {movieId,trailers}=action.payload;
            if (!state.trailer) {
                state.trailer = {};
              }
            state.trailer[movieId]=trailers;
        },
        removeTrailer: (state, action) => {
            state.trailer=null;
          }
          
    }
})
export const {addNowPlaying,addTrailer,removeNowPlaying,removeTrailer}=moviesSlice.actions;

export default moviesSlice.reducer