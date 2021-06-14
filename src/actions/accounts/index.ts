import { updateAccountBalance, setAccounts } from '../../reducers/accounts';
import mockAccountsData from '../../mockData/accounts';

import type {
  TGetState,
  TTransactionPayload,
  ThunkResult,
  TThunkDispatch,
} from './types';

export const getAccounts = (): ThunkResult<void> => async (dispatch: TThunkDispatch) => {
  // Let's assume the accounts data is fetched here and the posible
  // errors are handled and covered already. The data could also be passed
  // to a widget as a prop directly, as an alternative.
  dispatch(setAccounts(mockAccountsData));
};

export const makeTransaction = ({
  source,
  destination,
}: TTransactionPayload): ThunkResult<void> => async (
  dispatch: TThunkDispatch,
  getState: TGetState,
) => {
  const { accounts: state } = getState();
  const sourceAccount = state.accounts[source.id];
  const destAccount = state.accounts[destination.id];

  if (!sourceAccount || !destAccount) {
    return;
  }

  if (sourceAccount.balance < source.amount) {
    return;
  }

  const newSourceAmount = sourceAccount.balance - source.amount;
  const newDestAmount = destAccount.balance + destination.amount;
  dispatch(updateAccountBalance({ id: sourceAccount.id, newBalance: +newSourceAmount.toFixed(2) }));
  dispatch(updateAccountBalance({ id: destAccount.id, newBalance: +newDestAmount.toFixed(2) }));
};
