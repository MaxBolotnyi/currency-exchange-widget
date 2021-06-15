import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../../reducers';

import {
  makeTransaction,
  getAccounts,
} from './index';

import mockData from '../../mockData/accounts';

import type { TAccountsState } from '../../reducers/types';
import type { TStore } from '../../store';

let filledStore: TAccountsState;
beforeEach(() => {
  filledStore = {
    accounts: {
      [mockData[0].id]: { ...mockData[0] },
      [mockData[1].id]: { ...mockData[1] },
      [mockData[2].id]: { ...mockData[2] },
    },
  };
});

test('getAccounts `fetch` and update accounts', async () => {
  const mockStore = configureStore({
    reducer: rootReducer,
  });

  mockStore.dispatch(getAccounts());
  const updatedState = mockStore.getState();
  expect(updatedState.accounts).toStrictEqual(filledStore);
});

describe('makeTransaction', () => {
  let mockStore: TStore;
  beforeEach(async () => {
    mockStore = configureStore({
      reducer: rootReducer,
    });
    mockStore.dispatch(getAccounts());
  });

  test('makeTransaction transfers money correctly', async () => {
    const { accounts: state } = mockStore.getState();
    const sourceAccId = mockData[0].id;
    const destAccId = mockData[1].id;
    const initialSourceBalance = state.accounts[sourceAccId].balance;
    const initialDestBalance = state.accounts[destAccId].balance;

    const transaction = {
      source: {
        id: sourceAccId,
        amount: 100,
      },
      destination: {
        id: destAccId,
        amount: 130,
      },
    };

    mockStore.dispatch(makeTransaction(transaction));

    const { accounts: updatedState } = mockStore.getState();
    expect(updatedState.accounts[sourceAccId].balance).toBe(initialSourceBalance - 100);
    expect(updatedState.accounts[destAccId].balance).toBe(initialDestBalance + 130);
  });

  test('makes no transfer if one of the id is wrong', async () => {
    mockStore.dispatch(getAccounts());
    const sourceAccId = 'WRONG_ID';
    const destAccId = mockData[1].id;

    const transaction = {
      source: {
        id: sourceAccId,
        amount: 100,
      },
      destination: {
        id: destAccId,
        amount: 130,
      },
    };

    mockStore.dispatch(makeTransaction(transaction));

    const { accounts: updatedState } = mockStore.getState();
    expect(updatedState).toStrictEqual(filledStore);
  });

  test('makes no transfer if source account has less money than the given amount', async () => {
    mockStore.dispatch(getAccounts());
    const { accounts: state } = mockStore.getState();
    const sourceAccId = mockData[0].id;
    const destAccId = mockData[1].id;
    const initialSourceBalance = state.accounts[sourceAccId].balance;

    const transaction = {
      source: {
        id: sourceAccId,
        amount: initialSourceBalance + 1,
      },
      destination: {
        id: destAccId,
        amount: 130,
      },
    };

    mockStore.dispatch(makeTransaction(transaction));

    const { accounts: updatedState } = mockStore.getState();
    expect(updatedState).toStrictEqual(filledStore);
  });
});
