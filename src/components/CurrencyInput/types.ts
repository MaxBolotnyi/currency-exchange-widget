import type { TextFieldProps } from '@material-ui/core';

export type TCurrencyInputProps = Omit<TextFieldProps, 'onChange'> & {
    value?: string | number;
    currency: string;
    onChange?: (value: string) => void;
    precision?: number,
};
