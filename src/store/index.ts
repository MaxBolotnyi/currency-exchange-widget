import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { rootReducer } from '../reducers';
import { conversionApi } from '../api';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(conversionApi.middleware),
});

export type TStore = typeof store;
export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
export const useAppDispatch = (): TAppDispatch => useDispatch<TAppDispatch>();
export default store;
