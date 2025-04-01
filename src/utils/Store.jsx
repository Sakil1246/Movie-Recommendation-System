import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer  from "./userSlice";
import movieReducer from "./moviesSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";


const configPersit={
    key:"root",
    storage
};
const reducers=combineReducers({
    user:userReducer,
    movies:movieReducer

})
const persistedReducer=persistReducer(configPersit,reducers);
const appStore=configureStore(
    {
        reducer:persistedReducer,

    }
)

export const persistor=persistStore(appStore);
export default appStore;