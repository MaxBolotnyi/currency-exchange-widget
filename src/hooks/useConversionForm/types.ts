import type { TRateResponse } from '../../api/types';

export type TUseConversionFormReturn = {
    sourceAcc: string;
    sourceAmount: string;
    destAcc: string;
    destAmount: string;
    setSourceAcc: (val: string) => void;
    setDestAcc: (val: string) => void;
    setSrcAmount: (val: string) => void;
    setDestAmount: (val: string) => void;
    isValid: boolean;
    onSubmit: () => void;
    exchangeRate: number | false | undefined;
    data: TRateResponse;
};

export type TLiveField = 'src' | 'dest';
