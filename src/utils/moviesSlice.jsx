import { createSlice } from "@reduxjs/toolkit";

const moviesSlice=createSlice({
    name:"movie",
    initialState:{
        nowPlaying:[],
        popular:[],
        topRated:[],
        trailer:{},
    },
    reducers:{
        addNowPlaying:(state,action)=>{
            state.nowPlaying=action.payload;
        },
        removeNowPlaying:(state,action)=>{
            state.nowPlaying=null;
        },
        addPopular:(state,action)=>{
            state.popular=action.payload;
        },
        removePopular:(state,action)=>{
            state.popular=null;
        },
        addTopRated:(state,action)=>{
            state.topRated=action.payload;
        },
        removeTopRated:(state,action)=>{
            state.topRated=null;
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
export const {addNowPlaying,addTrailer,removeNowPlaying,removeTrailer,addPopular,removePopular,addTopRated,removeTopRated}=moviesSlice.actions;

export default moviesSlice.reducer