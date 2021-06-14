export type TAccount = {
    id: string;
    name: string;
    currency: string;
    balance: number;
};

export type TAccountsState = {
    accounts: {
        [key: string]: TAccount;
    };
};
