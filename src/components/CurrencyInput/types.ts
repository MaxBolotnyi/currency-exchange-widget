import type { TextFieldProps } from '@material-ui/core';
import type { ChangeEvent } from 'react';

export type TCurrencyInputOnChangeProp = {
    value: string;
    originalEvent: ChangeEvent<HTMLInputElement>;
}

export type TCurrencyInputProps = Omit<TextFieldProps, 'onChange'> & {
    value?: string | number;
    currency: string;
    onChange?: (value: TCurrencyInputOnChangeProp) => void;
    precision?: number,
};
