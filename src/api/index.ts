import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { TRateRequestParams } from './types';


// Define a service using a base URL and expected endpoints
export const conversionApi = createApi({
    reducerPath: 'conversion',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.exchangerate.host/' }),
    endpoints: (builder) => ({
        getConversionRates: builder.query<any, TRateRequestParams>({
            query: ({ amount, from, to }: TRateRequestParams) => `convert?from=${from}&to=${to}&amount=${amount}`,
            transformResponse: (response: any) => ({
                rate: response?.info?.rate,
                amount: response?.result
            })
        })
    }),
});

// auto-generated based on the defined endpoints
export const { useGetConversionRatesQuery } = conversionApi;
