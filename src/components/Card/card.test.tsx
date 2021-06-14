import React from 'react';
import { render } from '@testing-library/react';
import Card from './index';


test('renders card', () => {
  const { container } = render(<Card />);
  expect(container).toMatchSnapshot();
});
