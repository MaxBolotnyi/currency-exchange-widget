import React from 'react';

const getUseMockApi = (success = true) => {
    return ({
        amount,
        from,
        to
    }: any, {
        skip = false,
        polling
    }: any) => {
        const [data, setData] = React.useState({ rate: 1.23, amount: 234.34 });

        const refetch = () => {
            setData({
                rate: Math.random() * 2,
                amount: 100 * Math.random() * 20
            });
        }
        return {
            isError: !success,
            isSuccess: success,
            data: success ? data : undefined,
            refetch
        };
    };
};

export default getUseMockApi;
