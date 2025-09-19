import {configureStore, ThunkDispatch} from '@reduxjs/toolkit';
import {persistStore} from 'redux-persist';
import persistedReducer from '../persistedReducer';
const middleware = [] as any[];

export const rootStore = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).prepend([...middleware]),
});

export const persistor = persistStore(rootStore);

export type RootState = ReturnType<typeof rootStore.getState>;

export type AppDispatch = typeof rootStore.dispatch;

export type AppThunkDispatch = ThunkDispatch<RootState, any, any>;
