import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { renderHook, act } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/dom';

import type { FunctionComponent, ReactNode } from 'react';
import useConversionForm from './index';

import { rootReducer } from '../../reducers';
import { conversionApi, useGetConversionRatesQuery } from '../../api';
import { setAccounts } from '../../reducers/accounts';

import mockData from '../../mockData/accounts';
import getUseMockApi from '../../api/mock';

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
  store.dispatch(setAccounts(mockData));
  jest.useFakeTimers();
});

afterAll(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test('all fields could be setup', async () => {
  const { result } = renderHook(() => useConversionForm({
    accounts: store.getState().accounts.accounts,
    useApiHook: (getUseMockApi(true) as typeof useGetConversionRatesQuery),
  }), { wrapper });

  act(() => {
    result.current.setSourceAcc('account-1');
    result.current.setDestAcc('account-2');
    result.current.setSrcAmount('15000');
  });

  expect(result.current.sourceAcc).toBe('account-1');
  expect(result.current.destAcc).toBe('account-2');
  expect(result.current.sourceAmount).toBe('15000');

  act(() => {
    result.current.setDestAmount('10000');
  });
  expect(result.current.destAmount).toBe('10000');
});

test('form returns exchangeRate and updates dest field with live rate', async () => {
  const { result } = renderHook(() => useConversionForm({
    accounts: store.getState().accounts.accounts,
    useApiHook: (getUseMockApi(true) as typeof useGetConversionRatesQuery),
  }), { wrapper });

  act(() => {
    result.current.setSourceAcc('account-1');
    result.current.setDestAcc('account-2');
    result.current.setSrcAmount('10000');
  });
  await waitFor(() => {
    expect(result.current.exchangeRate).not.toBeFalsy();
  });

  const amount = result.current.data ? String(result.current.data.amount) : '';
  expect(amount).toBe(result.current.destAmount);
});

test('form returns exchangeRate and updates source field with live rate', async () => {
  const { result } = renderHook(() => useConversionForm({
    accounts: store.getState().accounts.accounts,
    useApiHook: (getUseMockApi(true) as typeof useGetConversionRatesQuery),
  }), { wrapper });

  act(() => {
    result.current.setSourceAcc('account-1');
    result.current.setDestAcc('account-2');
    result.current.setDestAmount('5000');
  });
  await waitFor(() => {
    expect(result.current.exchangeRate).not.toBeFalsy();
  });

  const rate = result.current.exchangeRate ? result.current.exchangeRate : 1;
  const newVal = (+result.current.destAmount / rate).toString();

  await waitFor(() => {
    expect(result.current.sourceAmount).toBe(newVal);
  });
});

test('form is Valid only if all fields are not empty and accounts are different', async () => {
  const { result } = renderHook(() => useConversionForm({
    accounts: store.getState().accounts.accounts,
    useApiHook: (getUseMockApi(true) as typeof useGetConversionRatesQuery),
  }), { wrapper });

  expect(result.current.isValid).toBe(false);

  act(() => {
    result.current.setSourceAcc('account-1');
    result.current.setDestAcc('account-2');
    result.current.setSrcAmount('5000');
  });

  await waitFor(() => {
    expect(result.current.isValid).toBe(true);
  });
});

test('Submit works as expected', async () => {
  const { result } = renderHook(() => useConversionForm({
    accounts: store.getState().accounts.accounts,
    useApiHook: (getUseMockApi(true) as typeof useGetConversionRatesQuery),
  }), { wrapper });

  expect(result.current.isValid).toBe(false);

  act(() => {
    result.current.setSourceAcc('account-1');
    result.current.setDestAcc('account-2');
    result.current.setSrcAmount('5000');
  });

  await waitFor(() => {
    expect(result.current.isValid).toBe(true);
  });
  const { accounts: accountsStateIn } = store.getState();
  const initialBalance = accountsStateIn.accounts['account-1'].balance;

  act(() => {
    result.current.onSubmit();
  });

  await waitFor(() => {
    const { accounts: accountsState } = store.getState();
    expect(accountsState.accounts['account-1'].balance).toBe(initialBalance - 5000);
  });
});

test('if the error from the server occurs the form should not be Valid and the rate should not update', async () => {
  const { result } = renderHook(() => useConversionForm({
    accounts: store.getState().accounts.accounts,
    useApiHook: (getUseMockApi(false) as typeof useGetConversionRatesQuery),
  }), { wrapper });

  expect(result.current.isValid).toBe(false);

  act(() => {
    result.current.setSourceAcc('account-1');
    result.current.setDestAcc('account-2');
    result.current.setSrcAmount('5000');
  });

  await waitFor(() => {
    expect(result.current.isValid).toBe(false);
    expect(result.current.exchangeRate).toBeFalsy();
    expect(result.current.destAmount).toBeFalsy();
  });
});
