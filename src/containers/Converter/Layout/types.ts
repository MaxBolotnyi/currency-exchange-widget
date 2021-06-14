import type { TAccountSelectOnChangeProps } from '../../../components/AccountSelect/types';
import type { TAccount } from '../../../reducers/types';

export type TConverterLayoutProps = {
    showToast?: boolean;
    onToastClose?: () => void;
    accounts: TAccount[];
    src: {
        amount: string;
        accountId: string;
        balance: number;
        currency: string;
        onAccountChange: (event: TAccountSelectOnChangeProps) => void;
        onValChange: (value: string) => void;
    }
    dest: {
        amount: string;
        accountId: string;
        currency: string;
        onAccountChange: (event: TAccountSelectOnChangeProps) => void;
        onValChange: (value: string) => void;
    },
    isValid?: boolean;
    onSumbit: () => void;
    exchangeRate?: number | false;
};
