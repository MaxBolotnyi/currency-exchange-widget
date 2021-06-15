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
      [mockData[0].id]: { ...mockData[0] },
      [mockData[1].id]: { ...mockData[1] },
      [mockData[2].id]: { ...mockData[2] },
    };
    await waitFor(() => {
      expect(result.current.state.accounts).toEqual(accounts);
    });
  });

  test('return getById function', async () => {
    const { result } = renderHook(() => useAccounts(), { wrapper });
    expect(result.current.getById(mockData[1].id)).toStrictEqual(mockData[1]);
  });
});
