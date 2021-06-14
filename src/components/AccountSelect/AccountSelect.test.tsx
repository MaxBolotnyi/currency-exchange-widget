import React from 'react';
import { fireEvent, render, within } from '@testing-library/react';
import AccountSelect from './index';
import mockData from '../../mockData/accounts';
import { toCurrencyString } from '../../utils/currencies';

test('renders and matches snapshot', () => {
    const { container } = render(<AccountSelect
        label="TestLabel"
        accounts={mockData}
        value={mockData[0].id}
    />);
    expect(container).toMatchSnapshot();
});

test('contains formatted value', () => {
    const { getByRole } = render(<AccountSelect
        label="TestLabel"
        accounts={mockData}
        value={mockData[0].id}
    />);
    const displayedValue = getByRole('button');
    const formattedBalance = toCurrencyString({
        amount: mockData[0].balance.toString(),
        precision: 2,
        currency: mockData[0].currency
    });
    expect(displayedValue).toHaveTextContent(`${mockData[0].name} - ${formattedBalance}`);
});

test('fires onChange event with account id', async () => {
    const mockFn = jest.fn();
    const { getByRole } = render(<AccountSelect
        label="TestLabel"
        accounts={mockData}
        onChange={mockFn}
        value={mockData[0].id}
    />);
    fireEvent.mouseDown(getByRole('button'));

    const listbox = within(getByRole('listbox'));
    const accounts = listbox.getAllByRole('option');
    fireEvent.click(accounts[2]);

    expect(mockFn).toBeCalledTimes(1);
});
