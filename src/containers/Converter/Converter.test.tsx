import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { rootReducer } from '../../reducers';
import { conversionApi } from '../../api';

import Converter from './index';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(conversionApi.middleware),
});

const { container } = render(
  <Provider store={store}>
    <Converter />
  </Provider>,
);

test('matches the snapshot', () => {
  expect(container).toMatchSnapshot();
});
