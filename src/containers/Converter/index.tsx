import React from 'react';

import ConverterLayout from './Layout';
import useConversionForm from '../../hooks/useConversionForm';
import useAccounts from '../../hooks/useAccounts';

import { useGetConversionRatesQuery } from '../../api';

import type { TAccountSelectOnChangeProps } from '../../components/AccountSelect/types';
import type { TCurrencyInputOnChangeProp } from '../../components/CurrencyInput/types';


const Converter = React.memo(() => {
    const [showSuccessToast, setShowSuccessToast] = React.useState(false);
    const {
        state,
        list,
        getById
    } = useAccounts();

    const {
        sourceAcc,
        sourceAmount,
        destAcc,
        destAmount,
        setSourceAcc,
        setDestAcc,
        setSrcAmount,
        setDestAmount,
        isValid,
        exchangeRate,
        onSubmit
    } = useConversionForm({ accounts: state, useApiHook: useGetConversionRatesQuery });

    const onSourceAccChange = (event: TAccountSelectOnChangeProps) => {
        setSourceAcc(event.target.value);
    };

    const onDestAccChange = (event: TAccountSelectOnChangeProps) => {
        setDestAcc(event.target.value);
    };

    const onSourceAmountChange = (event: TCurrencyInputOnChangeProp) => {
        setSrcAmount(event.value ? String(event.value) : '');
    };

    const onDestAmountChange = (event: TCurrencyInputOnChangeProp) => {
        setDestAmount(event.value ? String(event.value) : '');
    };

    const onExchange = () => {
        onSubmit();
        setShowSuccessToast(true);
    };

    const hideToast = React.useCallback(() => {
        setShowSuccessToast(false)
    }, []);

    return (
        <ConverterLayout
            accounts={list}
            isValid={isValid}
            showToast={showSuccessToast}
            onToastClose={hideToast}
            onSumbit={onExchange}
            exchangeRate={exchangeRate}
            src={{
                accountId: sourceAcc,
                currency: getById(sourceAcc)?.currency,
                amount: sourceAmount,
                balance: getById(sourceAcc)?.balance,
                onAccountChange: onSourceAccChange,
                onValChange: onSourceAmountChange
            }}
            dest={{
                accountId: destAcc,
                currency: getById(destAcc)?.currency,
                amount: destAmount,
                onAccountChange: onDestAccChange,
                onValChange: onDestAmountChange
            }}
        />
    );
});

export default Converter;
