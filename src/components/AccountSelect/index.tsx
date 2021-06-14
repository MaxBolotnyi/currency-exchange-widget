import React from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import { toCurrencyString } from '../../utils/currencies';

import type { TAccountSelectProps } from './types';

const AccountSelect = React.memo(({
  accounts = [],
  label,
  ...props
}: TAccountSelectProps) => (
  <TextField
    {...props}
    label={label}
    variant="outlined"
    select
  >
    {
                accounts.map((account) => {
                  const accountBalance = toCurrencyString({
                    amount: account.balance.toString(),
                    precision: 2,
                    currency: account.currency,
                  });
                  const accountLabel = `${account.name} - ${accountBalance}`;
                  return (
                    <MenuItem key={account.id} value={account.id}>{accountLabel}</MenuItem>
                  );
                })
            }
  </TextField>
));

export default AccountSelect;
