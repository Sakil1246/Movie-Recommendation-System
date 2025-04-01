import { configureStore } from "@reduxjs/toolkit";
import userReducer  from "./userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";


const configPersit={
    key:"root",
    storage
};

const persistedReducer=persistReducer(configPersit,userReducer);
const appStore=configureStore(
    {
        reducer:{
            user:persistedReducer,
        },

    }
)

export const persistor=persistStore(appStore);
export default appStore;