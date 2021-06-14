import React from 'react';
import { useSelector } from 'react-redux';

import { getAccounts } from '../../actions/accounts';
import { useAppDispatch } from '../../store';

import type { TRootState } from '../../store';
import type { TUseAccountsReturn } from './types';

const acccountSelector = (state: TRootState) => state.accounts;

const useAccounts = (): TUseAccountsReturn => {
  const state = useSelector(acccountSelector);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getAccounts());
  }, [dispatch]);

  const accounts = React.useMemo(() => Object.values(state.accounts), [state]);

  const getAccountById = React.useCallback((id: string) => state.accounts[id], [state]);

  return {
    state,
    list: accounts,
    getById: getAccountById,
  };
};

export default useAccounts;
