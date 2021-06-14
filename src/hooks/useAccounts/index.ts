import React from 'react';
import { useSelector } from 'react-redux';

import { getAccounts } from '../../actions/accounts';
import { useAppDispatch } from '../../store';

import type { TRootState } from '../../store';

const acccountSelector = (state: TRootState) => state.accounts;

const useAccounts = () => {
    const state = useSelector(acccountSelector);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(getAccounts());
    }, [dispatch]);

    const accounts = React.useMemo(() => {
        return Object.values(state.accounts);
    }, [state]);

    const getAccountById = React.useCallback((id: string) => {
        return state.accounts[id];
    }, [state]);

    return {
        state: state.accounts,
        list: accounts,
        getById: getAccountById
    }
};

export default useAccounts;
