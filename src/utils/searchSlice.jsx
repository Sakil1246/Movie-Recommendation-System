import { createSlice } from "@reduxjs/toolkit";

const searchSlice=createSlice({
    name:"search",
    initialState:{
        searchMovie:false,
    },
    reducers:{
        toggleSearch:(state,action)=>{
            state.searchMovie=!(state.searchMovie);
        }
    }
})

export const{toggleSearch }=searchSlice.actions;
export default searchSlice.reducer;