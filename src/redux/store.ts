import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import globalSearchReducer from './globalSearchSlice';

const reducers = combineReducers({
    globalSearch: globalSearchReducer,
});

const persistConfig = {
    key: 'root',
    version: 1,
    storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch