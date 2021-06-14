import type { TRootState } from '../../store';

export type TGetState = () => TRootState;
export type TTransactionPayload = {
    source: {
        id: string;
        amount: number;
    },
    destination: {
        id: string;
        amount: number;
    }
};
