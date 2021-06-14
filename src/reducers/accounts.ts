import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { TAccount, TAccountsState } from './types';

const initialState: TAccountsState = {
    accounts: {}
};

export const accountsSlice = createSlice({
    name: 'acoounts',
    initialState,
    reducers: {
        updateAccountBalance: (state, action: PayloadAction<{ id: TAccount['id'], newBalance: TAccount['balance'] }>) => {
            state.accounts[action.payload.id].balance = action.payload.newBalance;
        },
        setAccounts: (state, action: PayloadAction<Array<TAccount>>) => {
            for (const acc of action.payload) {
                state.accounts[acc.id] = acc;
            }
        },
        removeAccount: (state, action: PayloadAction<TAccount['id']>) => {
            delete state.accounts[action.payload]
        },
        clearAccounts: state => {
            state.accounts = {};
        }
    }
});

export const {
    updateAccountBalance,
    setAccounts,
    removeAccount,
    clearAccounts
} = accountsSlice.actions;
