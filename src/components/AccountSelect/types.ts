import type { ChangeEvent } from 'react';
import type { TextFieldProps } from '@material-ui/core';
import type { TAccount } from '../../reducers/types';

export type TAccountSelectOnChangeProps = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export type TAccountSelectProps = TextFieldProps & {
    accounts: TAccount[];
    label: string;
};
