// import { configureStore } from '@reduxjs/toolkit'
// import CounterSlice from '../slice/CounterSlice'
// import UserSlice from '../slice/userSlice'

// export const store = configureStore({
//   reducer: {
//     counter: CounterSlice,
//     user: UserSlice
//   },
// })

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch

import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Default localStorage for web
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import CounterSlice from "../slice/CounterSlice";
import UserSlice from "../slice/userSlice";

// Configuration for redux-persist
const persistConfig = {
    key: "root", // Key for the storage
    storage, // Storage type (localStorage)
    whitelist: ["user"], // Persist only the 'user' slice
};

// Combine reducers
const rootReducer = combineReducers({
    counter: CounterSlice,
    user: persistReducer(persistConfig, UserSlice), // Persist only user slice
});

// Configure store with persisted reducer
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable warnings for non-serializable data
        }),
});

// Create persistor
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
