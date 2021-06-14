import React from 'react';

import FormHelperText from '@material-ui/core/FormHelperText';

import AccountSelect from '../../../components/AccountSelect';
import CurrencyInput from '../../../components/CurrencyInput';
import TopToast from '../../../components/TopToast';
import Card from '../../../components/Card';
import Button from '../../../components/Button';

import { useStyles } from './styles';
import { getCurrencySymbol } from '../../../utils/currencies';

import type { TConverterLayoutProps } from './types';


const ConverterLayout = React.memo(({
    showToast = false,
    onToastClose,
    accounts = [],
    src,
    dest,
    isValid = false,
    exchangeRate,
    onSumbit
}: TConverterLayoutProps) => {
    const classes = useStyles();

    const outOfBound = +src.balance < +src.amount;
    return (
        <Card>
            <TopToast
                severity="success"
                open={showToast}
                onDelayedClose={onToastClose}
            >
                Done!
        </TopToast>
            <div className={classes.container}>
                <AccountSelect
                    id="sourceAcc"
                    name="sourceAcc"
                    accounts={accounts}
                    value={src.accountId}
                    className={classes.select}
                    label="Source Account"
                    onChange={src.onAccountChange}
                />
                <AccountSelect
                    id="destAcc"
                    name="destAcc"
                    value={dest.accountId}
                    accounts={accounts}
                    className={classes.select}
                    label="Destination Account"
                    onChange={dest.onAccountChange}
                />
                <div className={classes.row}>
                    <CurrencyInput
                        id="srcAmount"
                        name="srcAmount"
                        error={outOfBound}
                        helperText={outOfBound && 'Not enough money'}
                        className={classes.marginRight}
                        currency={src.currency}
                        value={src.amount}
                        onChange={src.onValChange}
                    />
                    <CurrencyInput
                        id="destAmount"
                        name="destAmount"
                        currency={dest.currency}
                        value={dest.amount}
                        onChange={dest.onValChange}
                    />
                </div>
            </div>
            {
                !outOfBound
                && !!src.accountId
                && !!dest.accountId
                && !!src.currency
                && !!dest.currency
                && !!src.amount
                && !!dest.amount
                && src.currency !== dest.currency
                && (
                    <FormHelperText className={classes.rateInfo}>
                        {!exchangeRate ? `Loading...` : `Rate: ${getCurrencySymbol(src.currency)}1 = ${getCurrencySymbol(dest.currency)}${exchangeRate}`}
                    </FormHelperText>
                )}
            <Button
                disabled={!isValid}
                onClick={onSumbit}>
                Exchange
        </Button>
        </Card >
    )
});

export default ConverterLayout;
