import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Default localStorage for web
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import CounterSlice from "../slice/CounterSlice";
import UserSlice from "../slice/userSlice";

const persistConfig = {
    key: "root", 
    storage, 
    whitelist: ["user"],
};

// Combine reducers
const rootReducer = combineReducers({
    counter: CounterSlice,
    user: persistReducer(persistConfig, UserSlice), 
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// Create persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
