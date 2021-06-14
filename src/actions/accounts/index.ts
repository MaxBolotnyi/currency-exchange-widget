import { updateAccountBalance, setAccounts } from '../../reducers/accounts';

import mockAccountsData from '../../mockData/accounts';

import type { Dispatch } from '@reduxjs/toolkit';
import type { TGetState, TTransactionPayload } from './types';


export const getAccounts = () => {
    return async (dispatch: Dispatch) => {
        // Let's assume the accounts data is fetched here and the posible errors are handled and covered already.
        // The data could also be passed to a widget as a prop directly, as an alternative.
        dispatch(setAccounts(mockAccountsData));
    };
};

// Would normally use here some API to transfer money, but as I mock the data, I 'make' this transaction internally.
export const makeTransaction = ({ source, destination }: TTransactionPayload) => {
    return async (dispatch: Dispatch, getState: TGetState) => {
        const { accounts: state } = getState();
        const sourceAccount = state.accounts[source.id];
        const destAccount = state.accounts[destination.id];

        if (!sourceAccount || !destAccount) {
            // Could show any toaster here integrated to the 'main app' where the widget is supposed to be located.
            console.error('Accounts: wrong id passed either to destionation or source! (accounts.ts:34)');
            return;
        }

        if (sourceAccount.balance < source.amount) {
            // I took the UI validation approach here, this is the second blocker.
            console.error('Accounts: the amount of the transaction is bigger than the source account balance (accounts.ts:39)');
            return;
        }

        const newSourceAmount = sourceAccount.balance - source.amount;
        const newDestAmount = destAccount.balance + destination.amount;
        dispatch(updateAccountBalance({ id: sourceAccount.id, newBalance: +newSourceAmount.toFixed(2) }));
        dispatch(updateAccountBalance({ id: destAccount.id, newBalance: +newDestAmount.toFixed(2) }));
    };
};
