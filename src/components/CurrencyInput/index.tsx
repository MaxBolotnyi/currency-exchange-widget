import React, { ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

import {
  toCurrencyString,
  getCurrencySymbol,
  stripNonDigits,
  getProperlyRounded,
} from '../../utils/currencies';
import { DEFAULT_CURRENCY } from '../../constants';

import type { TCurrencyInputProps } from './types';

const DEFAULT_VALUE = '';

const CurrencyInput = React.memo(({
  label,
  value,
  currency = DEFAULT_CURRENCY,
  onChange,
  className,
  precision = 2,
  ...props
}: TCurrencyInputProps) => {
  const [inputVal, setInputVal] = React.useState(DEFAULT_VALUE);
  const [isFocused, setIsFocused] = React.useState(false);

  const onFocus = React.useCallback(() => setIsFocused(true), []);

  React.useEffect(() => {
    if (isFocused) {
      return;
    }
    const newVal = String(value) || DEFAULT_VALUE;
    const rounded = getProperlyRounded(newVal, precision);
    const reservedValue = toCurrencyString({
      amount: rounded,
      precision,
    });
    setInputVal(reservedValue);
  }, [value, precision, isFocused]);

  const internalOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: eventValue } = event.target;
    const digits = stripNonDigits(eventValue);

    const converted = toCurrencyString({
      amount: eventValue,
      precision,
    });
    setInputVal(converted);
    if (onChange) {
      onChange(getProperlyRounded(digits, precision));
    }
  };

  const onBlur = React.useCallback(() => {
    setIsFocused(false);
    if (!inputVal) {
      return;
    }
    const withPrecision = getProperlyRounded(inputVal);
    const converted = toCurrencyString({
      amount: withPrecision,
      precision,
    });
    setInputVal(converted);
  }, [inputVal, precision]);

  return (
    <FormControl className={className} variant="outlined">
      <TextField
        {...props}
        label={label}
        value={inputVal}
        placeholder="0.00"
        onChange={internalOnChange}
        onBlur={onBlur}
        onFocus={onFocus}
        inputProps={{
          style: { textAlign: 'right' },
        }}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          startAdornment: <InputAdornment data-testid="currency-sign" position="start">{getCurrencySymbol(currency)}</InputAdornment>,
        }}
        variant="outlined"
      />
    </FormControl>
  );
});

export default CurrencyInput;
