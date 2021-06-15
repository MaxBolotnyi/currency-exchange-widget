import React from 'react';
import { useAppDispatch } from '../../store';
import { makeTransaction } from '../../actions/accounts';

import type { TUseConversionFormReturn, TLiveField, TUseConversionFormProps } from './types';
import { DEFAULT_CURRENCY } from '../../constants';

const useConversionForm = ({
  accounts,
  useApiHook,
  defaultLiveField = 'dest',
}: TUseConversionFormProps): TUseConversionFormReturn => {
  const dispatch = useAppDispatch();
  const [sourceAcc, setSourceAcc] = React.useState('');
  const [destAcc, setDestAcc] = React.useState('');
  const [sourceAmount, setSourceAmount] = React.useState<string>('');
  const [destAmount, setDestAmount] = React.useState<string>('');
  const [liveUpdateField, setliveUpdateField] = React.useState<TLiveField>(defaultLiveField);
  const [submit, setSubmit] = React.useState(false);

  const getAccountById = React.useCallback((id: string) => accounts[id], [accounts]);

  const {
    data,
    isError,
    isSuccess,
    refetch,
  } = useApiHook({
    amount: sourceAmount || destAmount || 1,
    from: getAccountById(sourceAcc)?.currency || DEFAULT_CURRENCY,
    to: getAccountById(destAcc)?.currency || DEFAULT_CURRENCY,
  }, {
    skip: !sourceAcc || !destAcc,
    pollingInterval: 10000,
  });

  const onSourceAmountChange = (value: string) => {
    setSourceAmount(value);
    if (!value) {
      setDestAmount('');
    }
    if (destAcc) {
      setliveUpdateField('dest');
    }
  };

  const onDestAmountChange = (value: string) => {
    setDestAmount(value);
    if (!value) {
      setSourceAmount('');
    }
    if (sourceAcc) {
      setliveUpdateField('src');
    }
  };

  const onSubmit = () => {
    refetch();
    setSubmit(true);
  };

  const onExhange = () => {
    if (submit && isSuccess) {
      dispatch(makeTransaction({
        source: {
          id: sourceAcc,
          amount: Number(sourceAmount),
        },
        destination: {
          id: destAcc,
          amount: Number(destAmount),
        },
      }));
      setSourceAmount('');
      setDestAmount('');
      setSubmit(false);
    }
  };

  const updateDependantField = () => {
    if (liveUpdateField === 'src' && destAmount) {
      const newVal = !!data?.rate && (+destAmount / data.rate);
      setSourceAmount(newVal ? `${newVal}` : sourceAmount);
    } else if (liveUpdateField === 'dest' && sourceAmount) {
      setDestAmount(data?.amount ? `${data.amount}` : destAmount);
    }
  };

  React.useEffect(updateDependantField,
    [liveUpdateField, data, sourceAmount, destAmount, destAcc, sourceAcc]);
  React.useEffect(onExhange,
    [submit, data, sourceAcc, sourceAmount, destAcc, destAmount, dispatch, isSuccess]);

  const outOfBound = sourceAcc && (+sourceAmount > getAccountById(sourceAcc)?.balance);
  const isValid = [
    sourceAcc,
    destAcc,
    Number(sourceAmount),
    Number(destAmount),
    !outOfBound,
    sourceAcc !== destAcc,
    !isError,
    !!data?.rate,
  ].every((item) => !!item);

  return {
    sourceAcc,
    sourceAmount,
    destAcc,
    destAmount,
    setSourceAcc,
    setDestAcc,
    setSrcAmount: onSourceAmountChange,
    setDestAmount: onDestAmountChange,
    isValid,
    onSubmit,
    exchangeRate: isSuccess && !!data?.rate && data?.rate,
    data,
  };
};

export default useConversionForm;
