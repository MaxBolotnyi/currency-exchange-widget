import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../constants';
import { TRateResponse, TOriginalResponse } from './types';

// Define a service using a base URL and expected endpoints
export const conversionApi = createApi({
  reducerPath: 'conversion',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getConversionRates: builder.query({
      query: ({ amount, from, to }) => `convert?from=${from}&to=${to}&amount=${amount}`,
      transformResponse: (response: TOriginalResponse): TRateResponse => ({
        rate: response?.info?.rate,
        amount: response?.result,
      }),
    }),
  }),
});

// auto-generated based on the defined endpoints
export const { useGetConversionRatesQuery } = conversionApi;
