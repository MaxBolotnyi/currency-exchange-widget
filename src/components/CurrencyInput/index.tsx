import React, { ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

import {
  toCurrencyString,
  getCurrencySymbol,
  appendPrecision,
  stripNonDigits,
} from '../../utils/currencies';

import type { TCurrencyInputProps } from './types';

const DEFAULT_VALUE = '';

const CurrencyInput = React.memo(({
  label,
  value,
  currency = 'USD',
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
    const newVal = String(value) ? String(value) : DEFAULT_VALUE;
    let reservedValue = toCurrencyString({
      amount: newVal,
      precision,
    });
    if (!isFocused) {
      reservedValue = appendPrecision(reservedValue, precision);
    }
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
      onChange({
        value: Number(digits).toFixed(precision),
        originalEvent: event,
      });
    }
  };

  const onBlur = React.useCallback(() => {
    if (!inputVal) {
      return;
    }
    const withPrecision = appendPrecision(inputVal);
    setInputVal(withPrecision);
    setIsFocused(false);
  }, [inputVal]);

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
