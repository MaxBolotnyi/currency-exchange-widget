import type { ThunkDispatch, Action, ThunkAction } from '@reduxjs/toolkit';
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

export type ThunkResult<R> = ThunkAction<R, TRootState, null, Action>;
export type TThunkDispatch = ThunkDispatch<TRootState, void, Action>;
