import React from 'react';
import { render } from '@testing-library/react';
import Button from './index';


test('renders button', () => {
    const { container } = render(<Button />);
    expect(container).toMatchSnapshot();
});

test('renders button with children', () => {
    const { container } = render(<Button>Custom Text</Button>);
    expect(container).toHaveTextContent('Custom Text');
});
