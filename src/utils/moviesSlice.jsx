import { createSlice } from "@reduxjs/toolkit";

const moviesSlice=createSlice({
    name:"movie",
    initialState:{
        nowPlaying:[],
        trailer:null,
    },
    reducers:{
        addNowPlaying:(state,action)=>{
            state.nowPlaying=action.payload;
        },
        removeNowPlaying:(state,action)=>{
            state.nowPlaying=null;
        },
        addTrailer:(state,action)=>{
            state.trailer=action.payload;
        },
        removeTrailer:(state,action)=>{
            state.trailer=null;
        },
    }
})
export const {addNowPlaying,addTrailer,removeNowPlaying,removeTrailer}=moviesSlice.actions;

export default moviesSlice.reducer