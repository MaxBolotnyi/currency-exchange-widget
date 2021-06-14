import { combineReducers } from '@reduxjs/toolkit';

import { conversionApi } from '../api';
import { accountsSlice } from './accounts';

export const rootReducer = combineReducers({
  accounts: accountsSlice.reducer,
  [conversionApi.reducerPath]: conversionApi.reducer,
});
