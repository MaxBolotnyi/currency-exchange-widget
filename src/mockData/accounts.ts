import type { TAccount } from '../reducers/types';

const accounts: TAccount[] = [
    {
        id: 'account-1',
        name: 'Dollars Account',
        currency: 'USD',
        balance: 30000
    },
    {
        id: 'account-2',
        name: 'Euros Account',
        currency: 'EUR',
        balance: 25000
    },
    {
        id: 'account-3',
        name: 'Pounds Account',
        currency: 'GBP',
        balance: 13000
    }
];

export default accounts;
