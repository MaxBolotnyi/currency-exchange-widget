import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/dom';

import type { FunctionComponent, ReactNode } from 'react';
import useAccounts from './index';

import { rootReducer } from '../../reducers';
import { conversionApi } from '../../api';

import mockData from '../../mockData/accounts';

import type { TStore } from '../../store';

let store: TStore;
let wrapper: FunctionComponent<{ children: ReactNode }>;

beforeEach(() => {
  store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(conversionApi.middleware),
  });
  wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>
      {children}
    </Provider>
  );
});

test('returns the array of accounts', async () => {
  const { result } = renderHook(() => useAccounts(), { wrapper });

  await waitFor(() => {
    expect(result.current.list).toStrictEqual(mockData);
  });
});

describe('with mocked store', () => {
  test('returns the state object of accounts', async () => {
    const { result } = renderHook(() => useAccounts(), { wrapper });
    const accounts = {
      'account-1': { ...mockData[0] },
      'account-2': { ...mockData[1] },
      'account-3': { ...mockData[2] },
    };
    await waitFor(() => {
      expect(result.current.state.accounts).toEqual(accounts);
    });
  });

  test('return getById function', async () => {
    const { result } = renderHook(() => useAccounts(), { wrapper });
    expect(result.current.getById('account-2')).toStrictEqual(mockData[1]);
  });
});
