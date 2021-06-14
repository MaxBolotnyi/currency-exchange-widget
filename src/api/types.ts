export type TRateRequestParams = {
    amount: string | number;
    from: string;
    to: string;
};

export type TRateResponse = {
    rate: number | undefined;
    amount: number | undefined;
} | undefined;

export type TOriginalResponse = {
    info: {
        rate: number;
    };
    result: number;
} | undefined;

export type TMockApi = {
    isError: boolean;
    isSuccess: boolean;
    data: TRateResponse;
    refetch: () => void;
};
