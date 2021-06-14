import React from 'react';
import { TMockApi } from './types';

// eslint-disable-next-line
const getUseMockApi = (success = true): CallableFunction => (_props: any, _options: any): TMockApi => {
  const [data, setData] = React.useState({ rate: 1.23, amount: 234.34 });

  const refetch = () => {
    setData({
      rate: Math.random() * 2,
      amount: 100 * Math.random() * 20,
    });
  };
  return {
    isError: !success,
    isSuccess: success,
    data: success ? data : undefined,
    refetch,
  };
};

export default getUseMockApi;
