import React from 'react';
import {
  createEvent, fireEvent, render, screen,
} from '@testing-library/react';
import CurrencyInput from './index';

describe('with necessary props', () => {
  let rendered: ReturnType<typeof render>;
  let inputElement: ReturnType<typeof rendered.getByRole>;
  beforeEach(() => {
    rendered = render(<CurrencyInput
      currency="USD"
    />);
    inputElement = rendered.getByRole('textbox');
  });

  test('renders and matches snapshot', () => {
    expect(rendered.container).toMatchSnapshot();
  });

  test('has currency sign and placeholder', () => {
    const currencySignElelement = rendered.getByTestId('currency-sign');
    const withPlaceholder = screen.getByPlaceholderText('0.00');
    expect(withPlaceholder).toBeInTheDocument();
    expect(currencySignElelement).toHaveTextContent('$');
  });

  test('formats value on the fly, adds precision on blur', () => {
    fireEvent.change(inputElement, { target: { value: '10000000' } });
    expect(inputElement).toHaveValue('10,000,000');

    fireEvent.blur(inputElement);
    expect(inputElement).toHaveValue('10,000,000.00');
  });
});

test('can set value through props', () => {
  const { getByRole } = render(<CurrencyInput
    currency="USD"
    value={10000}
    precision={2}
  />);
  const inputElement = getByRole('textbox');
  expect(inputElement).toHaveValue('10,000.00');
});

test('fires onChange to parent', () => {
  const mockFn = jest.fn();
  const { getByRole } = render(<CurrencyInput
    currency="USD"
    onChange={mockFn}
  />);

  const inputElement = getByRole('textbox');
  const event = createEvent('change', inputElement, { target: { value: '100000000' } });
  fireEvent.change(inputElement, event);

  expect(mockFn).toBeCalledTimes(1);
});
