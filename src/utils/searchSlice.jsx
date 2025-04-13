import { createSlice } from "@reduxjs/toolkit";

const searchSlice=createSlice({
    name:"isSearch",
    initialState:false,
    reducers:{
        toggleSearch:(state,action)=>{
            return !state;
        },
        removeSearch:(state,acton)=>{
            return false;
        }
    }
})

export const{toggleSearch,removeSearch }=searchSlice.actions;
export default searchSlice.reducer;