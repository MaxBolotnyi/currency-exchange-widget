import {
    accountsSlice,
    updateAccountBalance,
    setAccounts,
    removeAccount,
    clearAccounts
} from './accounts';

import mockData from '../mockData/accounts';

import type { TAccountsState } from './types';

const initialState = {
    accounts: {}
};


describe('accountsReducer', () => {
    let filledStore: TAccountsState;
    beforeEach(() => {
        filledStore = {
            accounts: {
                'account-1': { ...mockData[0] },
                'account-2': { ...mockData[1] },
                'account-3': { ...mockData[2] }
            }
        };
    });

    test('setAccounts can add accounts', () => {
        const reducer = accountsSlice.reducer;
        const state = reducer(initialState, setAccounts(mockData));

        expect(state).toStrictEqual(filledStore);
    });

    test('updateAccountBalance updates account balance', () => {
        const reducer = accountsSlice.reducer;
        const updatedBalance = 15111;
        const state = reducer(filledStore, updateAccountBalance({
            id: 'account-1',
            newBalance: updatedBalance
        }));

        expect(state).toStrictEqual({
            accounts: {
                ...filledStore.accounts,
                'account-1': {
                    ...filledStore.accounts['account-1'],
                    balance: updatedBalance
                }
            }
        });
    });


    test('removeAccount can delete account', () => {
        const reducer = accountsSlice.reducer;
        const state = reducer(filledStore, removeAccount('account-2'));

        expect(state).toStrictEqual({
            accounts: {
                'account-1': { ...mockData[0] },
                'account-3': { ...mockData[2] }
            }
        });
    });

    test('removeAccount do not delete account if wrong id', () => {
        const reducer = accountsSlice.reducer;
        const state = reducer(initialState, setAccounts(mockData));
        const withRemoved = reducer(state, removeAccount('account-5'));

        expect(withRemoved).toStrictEqual(filledStore);
    });

    test('clearAccounts wipes store', () => {
        const reducer = accountsSlice.reducer;
        const state = reducer(filledStore, clearAccounts());
        expect(state).toStrictEqual(initialState);
    });
});
