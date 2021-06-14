import React from 'react';
import { render, waitFor } from '@testing-library/react';
import TopToast from './index';

const Wrapper = ({ onDelay }: { onDelay: () => void }) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const onClose = () => setIsOpen(false);
  return (
    <TopToast onClick={onClose} onDelayedClose={onDelay} open={isOpen}>Done</TopToast>
  );
};

test('matches snapshot open', () => {
  const { container } = render(<TopToast open>Done</TopToast>);
  expect(container).toMatchSnapshot();
});

test('matches snapshot closed', async () => {
  const { container } = render(<TopToast> Done</TopToast>);
  expect(container).toMatchSnapshot();
});

test('toast renders with text', () => {
  const { container } = render(<TopToast open>Done</TopToast>);
  expect(container).toHaveTextContent('Done');
});

test('calls the onDelayedClose after the delay', async () => {
  jest.useFakeTimers();
  const mockFn = jest.fn();
  render(<Wrapper onDelay={mockFn} />);
  await waitFor(() => {
    expect(mockFn).toBeCalled();
  });
  jest.useRealTimers();
});
