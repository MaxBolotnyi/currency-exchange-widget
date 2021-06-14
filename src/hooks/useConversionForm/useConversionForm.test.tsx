import React, { FunctionComponent, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { renderHook, act } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/dom';

import useConversionForm from './index';

import { rootReducer } from '../../reducers';
import { conversionApi } from '../../api';

import mockData from '../../mockData/accounts';
import getUseMockApi from '../../api/mock';

import type { TStore } from '../../store';
import { setAccounts } from '../../reducers/accounts';

let store: TStore;
let wrapper: FunctionComponent;


beforeEach(() => {
    store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(conversionApi.middleware)
    });
    wrapper = ({ children }: { children?: ReactNode }) => {
        return (<Provider store={store}>
            {children}
        </Provider>);
    }
    store.dispatch(setAccounts(mockData));
    jest.useFakeTimers();
});

afterAll(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
})


test('all fields could be setup', async () => {
    const { result } = renderHook(() => useConversionForm({
        accounts: store.getState().accounts.accounts,
        //@ts-ignore
        useApiHook: getUseMockApi(true)
    }), { wrapper });

    act(() => {
        result.current.setSourceAcc('account-1');
        result.current.setDestAcc('account-2');
        result.current.setSrcAmount('15000');
    })

    expect(result.current.sourceAcc).toBe('account-1');
    expect(result.current.destAcc).toBe('account-2');
    expect(result.current.sourceAmount).toBe('15000');

    act(() => {
        result.current.setDestAmount('10000');
    })
    expect(result.current.destAmount).toBe('10000');
});

test('form returns exchangeRate and updates dest field with live rate', async () => {
    const { result } = renderHook(() => useConversionForm({
        accounts: store.getState().accounts.accounts,
        //@ts-ignore
        useApiHook: getUseMockApi(true)
    }), { wrapper });

    act(() => {
        result.current.setSourceAcc('account-1');
        result.current.setDestAcc('account-2');
        result.current.setSrcAmount('10000');
    })
    await waitFor(() => {
        expect(result.current.exchangeRate).not.toBeFalsy();
    })

    expect(result.current.data.amount.toString()).toBe(result.current.destAmount);
});

test('form returns exchangeRate and updates source field with live rate', async () => {
    const { result } = renderHook(() => useConversionForm({
        accounts: store.getState().accounts.accounts,
        //@ts-ignore
        useApiHook: getUseMockApi(true)
    }), { wrapper });

    act(() => {
        result.current.setSourceAcc('account-1');
        result.current.setDestAcc('account-2');
        result.current.setDestAmount('5000');
    })
    await waitFor(() => {
        expect(result.current.exchangeRate).not.toBeFalsy();
    })

    const newVal = (+result.current.destAmount / result.current.exchangeRate).toString();

    await waitFor(() => {
        expect(result.current.sourceAmount).toBe(newVal);
    });
});

test('form is Valid only if all fields are not empty and accounts are different', async () => {
    const { result } = renderHook(() => useConversionForm({
        accounts: store.getState().accounts.accounts,
        //@ts-ignore
        useApiHook: getUseMockApi(true)
    }), { wrapper });

    expect(result.current.isValid).toBe(false);

    act(() => {
        result.current.setSourceAcc('account-1');
        result.current.setDestAcc('account-2');
        result.current.setSrcAmount('5000');
    });

    await waitFor(() => {
        expect(result.current.isValid).toBe(true);
    })
});


test('Submit works as expected', async () => {
    const { result } = renderHook(() => useConversionForm({
        accounts: store.getState().accounts.accounts,
        //@ts-ignore
        useApiHook: getUseMockApi(true)
    }), { wrapper });

    expect(result.current.isValid).toBe(false);

    act(() => {
        result.current.setSourceAcc('account-1');
        result.current.setDestAcc('account-2');
        result.current.setSrcAmount('5000');
    });

    await waitFor(() => {
        expect(result.current.isValid).toBe(true);
    })
    const { accounts: accountsStateIn } = store.getState();
    const initialBalance = accountsStateIn.accounts['account-1'].balance;

    act(() => {
        result.current.onSubmit();
    });

    await waitFor(() => {
        const { accounts: accountsState } = store.getState();
        expect(accountsState.accounts['account-1'].balance).toBe(initialBalance - 5000);
    })
});

test('if the error from the server occurs the form should not be Valid and the rate should not update', async () => {
    const { result } = renderHook(() => useConversionForm({
        accounts: store.getState().accounts.accounts,
        //@ts-ignore
        useApiHook: getUseMockApi(false)
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
    })
});
