import type { TAccount, TAccountsState } from '../../reducers/types';

export type TUseAccountsReturn = {
    state: TAccountsState,
    list: TAccount[],
    getById: (id: string) => TAccount,
};
