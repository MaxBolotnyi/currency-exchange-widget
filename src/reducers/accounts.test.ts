import {
  accountsSlice,
  updateAccountBalance,
  setAccounts,
  removeAccount,
  clearAccounts,
} from './accounts';

import mockData from '../mockData/accounts';

import type { TAccountsState } from './types';

const initialState = {
  accounts: {},
};

describe('accountsReducer', () => {
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

  test('setAccounts can add accounts', () => {
    const { reducer } = accountsSlice;
    const state = reducer(initialState, setAccounts(mockData));

    expect(state).toStrictEqual(filledStore);
  });

  test('updateAccountBalance updates account balance', () => {
    const { reducer } = accountsSlice;
    const updatedBalance = 15111;
    const state = reducer(filledStore, updateAccountBalance({
      id: mockData[0].id,
      newBalance: updatedBalance,
    }));

    expect(state).toStrictEqual({
      accounts: {
        ...filledStore.accounts,
        [mockData[0].id]: {
          ...filledStore.accounts[mockData[0].id],
          balance: updatedBalance,
        },
      },
    });
  });

  test('removeAccount can delete account', () => {
    const { reducer } = accountsSlice;
    const state = reducer(filledStore, removeAccount(mockData[1].id));

    expect(state).toStrictEqual({
      accounts: {
        [mockData[0].id]: { ...mockData[0] },
        [mockData[2].id]: { ...mockData[2] },
      },
    });
  });

  test('removeAccount do not delete account if wrong id', () => {
    const { reducer } = accountsSlice;
    const state = reducer(initialState, setAccounts(mockData));
    const withRemoved = reducer(state, removeAccount('account-5'));

    expect(withRemoved).toStrictEqual(filledStore);
  });

  test('clearAccounts wipes store', () => {
    const { reducer } = accountsSlice;
    const state = reducer(filledStore, clearAccounts());
    expect(state).toStrictEqual(initialState);
  });
});
