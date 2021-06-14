import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const element = screen.getByTestId('app-test-id');
  expect(element).toBeInTheDocument();
});
