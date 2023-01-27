import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { listApi } from './slices/listApi';

import { persistReducer } from 'redux-persist';

import AsyncStorage from '@react-native-async-storage/async-storage';
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};


const reducers = combineReducers({
    [listApi.reducerPath]: listApi.reducer,
});


const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat([listApi.middleware]),
});